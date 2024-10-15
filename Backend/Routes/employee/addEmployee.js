import db from "../../config/DatabaseConfig.js";
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer"; // Nodemailer for emails
const Employee = express.Router();
import { uploadImage } from "../../AWS/upload_image.js";

// Configure multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Employee.post("/employeeform", upload.single("image"), async (req, res) => {
  const filename = "employee_bucket/" + req.file.originalname;
  const sql =
    "INSERT INTO employer (`name`,`position`,`phoneNo`,`NIC`,`birthDate`,`joinedDate`,`address`,`image_link`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.position,
    req.body.phoneNo,
    req.body.NIC,
    req.body.birthDate,
    req.body.joinedDate,
    req.body.address,
    filename,
  ];

  // Insert employee data into the database
  db.query(sql, [values], async (err, data) => {
    if (err) {
      console.error("Error inserting into database:", err);
      return res.status(500).json({ message: "Error in uploading to database", err });
    }

    // Upload image to AWS or another service
    try {
      const upload_image = await uploadImage(
        req.file.mimetype,
        filename,
        req.file.buffer
      );

      if (upload_image.message === "Successfully uploaded") {
        console.log("Image successfully uploaded");
        return res.json({ message: "Success" });
      } else {
        // If image upload fails, delete the inserted database record
        const dlt = "DELETE FROM `employer` WHERE `empID` = ?";
        db.query(dlt, [data.insertId], (error, result) => {
          if (error) {
            console.error("Error deleting record:", error);
            return res.status(500).json({ message: "Error deleting record" });
          }
          return res.status(500).json({ message: "Item not added" });
        });
      }
    } catch (uploadErr) {
      console.error("Error uploading image:", uploadErr);
      return res.status(500).json({ message: "Image upload failed", uploadErr });
    }
  });
});

// Nodemailer transporter setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nisaladeshan80@gmail.com", // Make sure the email is correct
    pass: "paaudkpshiqukqsn", // Make sure this is the correct password or app password
  },
});

Employee.post("/make-admin", (req, res) => {
  const { email, empID } = req.body;

  // Start a transaction for admin promotion
  db.beginTransaction(err => {
    if (err) {
      console.error("Transaction Start Error: ", err);
      return res.status(500).json({ message: "Error starting transaction", error: err });
    }

    // Insert into admin table
    const sqlInsertAdmin = `INSERT INTO admin (empID, email) VALUES (?, ?);`;
    db.query(sqlInsertAdmin, [empID, email], (err, result) => {
      if (err) {
        console.error("Error inserting into admin table: ", err);
        return db.rollback(() => {
          return res.status(500).json({ message: "Failed to insert into admin table", error: err });
        });
      }

      // Update employee table to mark the employee as admin
      const sqlUpdateEmployee = `UPDATE employer SET isAdmin = 1 WHERE empID = ?;`;
      db.query(sqlUpdateEmployee, [empID], (err, result) => {
        if (err) {
          console.error("Error updating employer table: ", err);
          return db.rollback(() => {
            return res.status(500).json({ message: "Failed to update employer to admin", error: err });
          });
        }

        // Commit the transaction
        db.commit(err => {
          if (err) {
            console.error("Commit Error: ", err);
            return db.rollback(() => {
              return res.status(500).json({ message: "Failed to commit transaction", error: err });
            });
          }

          const mailOptions = {
            from: process.env.FROM_EMAIL, 
            to: email, 
            subject: 'Admin Privileges Granted',
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width:80%;
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .footer {
            padding: 20px;
            text-align: center;
            color: #888;
            font-size: 12px;
        }
        a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Roseluxury Hotel</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have been successfully granted admin privileges. You can now access all admin functionalities.</p>
            <p>To update your password, please <a href="http://your-link-here.com">click here</a>.</p>
            <p>Once you're on the page, click the "Update Password" button to proceed.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>Roseluxury Hotel</p>
        </div>
    </div>
</body>
</html>
`,
          };

          // Send email to the newly promoted admin
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Email Error: ", error);
              // Log the exact error for better debugging

              return res.status(500).json({
                message: "Admin added but email failed to send",
                error: error.message, // Send the error message in the response for further debugging
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              message: "Employee successfully made an admin and email sent",
              info: info.response, // Include info for debugging
            });
          });
        });
      });
    });
  });
});

Employee.put('/remove-admin', (req, res) => {
  const { empID } = req.body; // Extract empID from the request body

  if (!empID) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  db.beginTransaction(err => {
    if (err) {
      console.error("Transaction Start Error: ", err);
      return res.status(500).json({ message: "Error starting transaction", error: err });
    }

    // Delete from admin table
    const sqlDeleteAdmin = `DELETE FROM admin WHERE empID = ?`;
    db.query(sqlDeleteAdmin, [empID], (err, result) => {
      if (err) {
        console.error("Error deleting from admin table: ", err);
        return db.rollback(() => {
          return res.status(500).json({ message: "Failed to delete from admin table", error: err });
        });
      }

      // Update employee table to remove admin status
      const sqlUpdateEmployee = `UPDATE employer SET isAdmin = 0 WHERE empID = ?`;
      db.query(sqlUpdateEmployee, [empID], (err, result) => {
        if (err) {
          console.error("Error updating employer table: ", err);
          return db.rollback(() => {
            return res.status(500).json({ message: "Failed to update employer admin status", error: err });
          });
        }

        // Commit the transaction
        db.commit(err => {
          if (err) {
            console.error("Commit Error: ", err);
            return db.rollback(() => {
              return res.status(500).json({ message: "Failed to commit transaction", error: err });
            });
          }

          // Successful transaction commit
          return res.status(200).json({ message: "Admin privileges removed successfully" });
        });
      });
    });
  });
});


export default Employee;

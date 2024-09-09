import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import multer from "multer";
const Employee = express.Router();
import { uploadImage } from "../../AWS/upload_image.js";

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

  db.query(sql, [values], async (err, data) => {
    if (err) {
      console.error("Error inserting into database:", err);
      return res.status(500).json({ message: "Error in uploading to database", err });
    }

    
      const upload_image = await uploadImage(
        req.file.mimetype,
        filename,
        req.file.buffer
      );

      if (upload_image.message === "Successfully uploaded") {
        console.log("Successfully uploaded")
        return res.json({ message: "Success" });
      } 
      else {
        const dlt = "DELETE FROM `employer` WHERE `empID` = ?";
        db.query(dlt, [data.insertId], (error, result) => {
          if (error) {
            console.error("Error deleting record:", error);
            return res.status(500).json({ message: "Error deleting record" });
          }
          return res.status(500).json({ message: "Item not added" });
        });
      }
    
    
  });
});

export default Employee;

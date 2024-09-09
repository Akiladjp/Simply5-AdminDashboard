import express from "express";
import nodemailer from "nodemailer";
import db from "../../config/DatabaseConfig.js";

const router = express.Router();

router.post("/forget-password", (req, res) => {
  const email = req.body.email;
  //console.log(req.body.email)
  const checkEmailSql = "SELECT * FROM admin WHERE email = ?";

  db.query(checkEmailSql, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking email existence:", checkErr);
      return res.json({ Status: "Error checking user existence" });
    }

    if (checkResult.length === 0) {
      return res.json({ Status: "User not existed" });
    }

    function generateOTP(length = 4) {
      let otp;
      do {
        otp = "";
        for (let i = 0; i < length; i++) {
          otp += Math.floor(Math.random() * 10);
        }
      } while (otp === '0000');
      console.log(otp)
      return otp;
    }

    const otp = generateOTP();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.FROM_EMAIL,
      to: req.body.email,
      subject: "Reset your password",
      html: ` <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>OTP Email Template</title>
              </head>
              <body>
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ROSELUXURY HOTEL</a>
                  </div>
                  <p style="font-size:1.3em;color: #000000;">To ${email}, please use the following One Time Password(OTP)</p>
                  <h1 style="width: max-content;margin-left:0px;border-radius: 4px; font-size:2.3em">${otp}</h1>
                  <p style="font-size:1.3em;color: #000000">Don't share this OTP with anyone. Our customer service team will never ask you for your password or OTP.</p>
                  <p style="font-size:1.3em;color: #000000">We hope to see you again soon</p>
                </div>
              </div>
              </body>
              </html>`,
    };

    const OTP_RESET_DELAY = 300000;

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.send({ Status: "Error sending email" });
      } else {
        const updateOTP = "UPDATE admin SET `otp` = ? WHERE `email` = ?";
        db.query(updateOTP, [otp, email], (checkErr, checkResult) => {
          if (checkErr) {
            return res.send({ Status: "Error updating OTP" });
          }
          res.send({ Status: "Success" });
    
          // Set a timeout to reset the OTP after the specified delay
          setTimeout(() => {
            const resetOTP = "UPDATE admin SET `otp` = NULL WHERE `email` = ?";
            db.query(resetOTP, [email], (resetErr, resetResult) => {
              if (resetErr) {
                console.error("Error resetting OTP:", resetErr);
              } else {
                console.log("OTP reset successfully for email:", email);
              }
            });
          }, OTP_RESET_DELAY);
        });
      }
    });
  });
});

export default router;

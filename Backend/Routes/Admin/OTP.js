import express from "express";
import db from "../../config/DatabaseConfig.js";

const router = express.Router();

router.post("/api/otp", (req, res) => {
  const checkOtpSql = "SELECT `username` FROM admin WHERE `email` = ? and `otp` = ?";

  // Combine OTP parts
  const otp = req.body[1][0] + req.body[1][1] + req.body[1][2] + req.body[1][3];
  const email = req.body[0];

  // Check if OTP is '0000'
  if (otp === '0000') {
    return res.json({ Status: "InvalidOTP" });
  }

  db.query(checkOtpSql, [email, otp], (err, result) => {
    if (err) {
      console.error("Error checking OTP:", err);
      return res.json({ Status: "Error checking OTP" });
    }

    if (result.length > 0) {
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "InvalidOTP" });
    }
  });
});

export default router;

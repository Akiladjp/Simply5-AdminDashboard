import express from "express";
import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";

const router = express.Router();

router.post("/resetpassword", async (req, res) => {
  const updatePasswordSql = "UPDATE admin SET `password` = ? WHERE `email` = ?";
  const password = req.body[1];
  const email = req.body[0];

  console.log(req.body[0])

  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      console.error("Error generating salt:", saltErr);
      return res.json({ Message: "Error generating salt" });
    }

    bcrypt.hash(password.toString(), salt, (hashErr, hash) => {
      if (hashErr) {
        console.error("Error hashing password:", hashErr);
        return res.json({ Message: "Error hashing password" });
      }

      db.query(updatePasswordSql, [hash, email], (updateErr, result) => {
        if (updateErr) {
          console.error("Error updating password:", updateErr);
          return res.json({ Message: "Error updating password" });
        } else if (result) {
          return res.send({ Status: "Success" });
        }
      });
    });
  });
});

export default router;

import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";

const adminLogin = express.Router();

adminLogin.post("/adminlogin", async (req, res) => {
 // console.log(req.body);
  try {
    const sql = "SELECT * FROM admin WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
      if (err) return res.status(500).json({ Message: "Server error" });

      if (result.length > 0) {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (err, response) => {
            //console.log("response", response);
            if (err) return res.status(500).json("Error");

            console.log("response",response);
            if (response) {
              console.log(result[0].username);

              //req.session.name = result[0].username;
             // console.log(result[0].username);
              console.log("session name",req.session.name);
              return res.json({ Login: true,username:result[0].username });
            } else {
              return res.json({ Message: "Password is incorrect!" });
            }
          }
        );
      } else {
        res.json({ Message: "Password is incorrect!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server error" });
  }
});

export default adminLogin;

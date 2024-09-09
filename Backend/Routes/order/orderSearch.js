import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";

const OrderSearch = express.Router();

OrderSearch.get("/searchMobile", (req, res) => {
  const mobileNumber = req.body.search;

  const sql = "SELECT * FROM orders WHERE mobileNo = ?";

  db.query(sql, [mobileNumber], (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Database query failed", error: err });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .send({ message: "No orders found for this mobile number" });
    }

    res.status(200).send(result);
  });
});

export default OrderSearch;


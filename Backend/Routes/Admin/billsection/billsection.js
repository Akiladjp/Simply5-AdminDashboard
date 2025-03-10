import express from "express";
import db from "../../../config/DatabaseConfig.js"


import AdminCashier from "../../../Authorization/AdminCashierAuthrize.js";

const billSection = express.Router();

billSection.get("/billSection/:mobileno",AdminCashier, (req, res) => {
  const {mobileno} = req.params;
console.log("mobile no in bill",mobileno);
  const sql1 = `
    SELECT 
      i.name, 
      o.orderID,
      o.status,
      o.time,
      SUM(c.quantity) AS totalQuantity, 
      i.price, 
      (SUM(c.quantity) * i.price) AS totalPrice,
      (SELECT SUM(c2.quantity)
       FROM orders o2
       JOIN contains c2 ON o2.orderID = c2.orderID
       WHERE o2.mobileNo = ?) AS finalQuantity
    FROM 
      orders o
    JOIN 
      contains c ON o.orderID = c.orderID
    JOIN 
      item i ON c.itemID = i.itemID
    WHERE 
      o.mobileNo = ? AND  o.status != "pending" OR o.status != "hidden"
    GROUP BY 
      i.name, i.price;
  `;

  db.query(sql1, [mobileno, mobileno], (err, result) => {
    if (err) {
      console.log({ Message: "Error in billSection",err });
      return res.status(500).json({ message: "Error in billSection" });
    } else {

      console.log(result);
      if (result.length > 0) {
      
        return res.json(result);
      } else {
        console.log("No orders found for this mobile number.");
        return res.status(404).json({ message: "No orders found for this mobile number." });
      }
    }
  });
});

export default billSection;

import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import { deleteImage } from "../../AWS/delete_image.js";
import multer from "multer";
import AdminAuthorize from "../../Authorization/AdminAuthorize.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Employee = express.Router();



Employee.put("/updateEmployee", AdminAuthorize,async (req, res) => {
    const sql = "update employer set `name` =?, `position` =?, `phoneNo` =?, `NIC` =?, `birthDate` =?, `joinedDate` =?, `address` =? where empID = ?";
    const values = [
        req.body.name,
        req.body.position,
        req.body.phoneNo,
        req.body.NIC,
        req.body.birthDate,
        req.body.joinedDate,
        req.body.address
    ];
    const id = req.params.id;
    db.query(sql, [...values,id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
   });
});


Employee.delete("/delete_emp/:id",AdminAuthorize, async (req, res) => {
    const { id } = req.params;
  
    try {
      const sql1 = "SELECT * FROM employer WHERE empID = ?";
      db.query(sql1, [id], async (err, ans) => {
        if (err) {
          console.error("Error in getting item employer database:", err);
          return res.status(500).json({ message: "Database query error" });
        }
  
        if (ans.length === 0) {
          return res.status(404).json({ message: "Item not found" });
        }
  
        const filename = ans[0].image_link;
  
        try {
          const deleteImageResult = await deleteImage(filename);
  
          if (deleteImageResult.message !== "Success") {
            return res.status(500).json({ message: "Error in image deletion" });
          }
  
          const sql = "DELETE FROM employer WHERE empID = ?";
          db.query(sql, [id], (err, result) => {
            if (err) {
              console.error("Error in deleting item from database:", err);
              return res.status(500).json({ message: "Database query error" });
            }
  
            if (result.affectedRows === 0) {
              return res
                .status(404)
                .json({ message: "Item not found or already deleted" });
            }
  
            res.json({ message: "Item deleted successfully" });
          });
        } catch (deleteError) {
          console.error("Error in deleting image:", deleteError);
          return res.status(500).json({ message: "Error in image deletion" });
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Unexpected error occurred" });
    }
  });

export default Employee;

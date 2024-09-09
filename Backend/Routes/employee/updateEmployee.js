import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import { getImage } from "../../AWS/get_images.js";

const UpdateEmployee = express.Router();

UpdateEmployee.get("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const sql = "SELECT * FROM employer WHERE empID = ?";

    db.query(sql, [id], async (err, ans) => {
      if (err) {
        return res.json({ Message: "Error inside server" });
      }
      if (ans.length === 0) {
        return res.status(404).json({ Message: "Employee not found" });
      }
      const preemployees = [];

      const imageUrl = await getImage(ans[0].image_link);

      preemployees.push({
        ...ans[0],
        image_url: imageUrl,
      });

      console.log(preemployees[0].name);
      console.log(preemployees[0].address);

      return res.json({ preemployees });
    });
  } catch (error) {
    console.log(" error in get employee", error);
    return res.json({ Message: "Error inside server" });
  }
});

UpdateEmployee.put("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { name, position, phoneNo, NIC, birthDate, joinedDate, address } = req.body;

  try {
    const sql = `
      UPDATE employer
      SET name = ?, position = ?, phoneNo = ?, NIC = ?, birthDate = ?, joinedDate = ?, address = ?
      WHERE empID = ?;
    `;
    db.query(sql, [name, position, phoneNo, NIC, birthDate, joinedDate, address, id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error in updating employee" });
      }
      return res.json({ message: "success" });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Error inside server" });
  }
});

export default UpdateEmployee;

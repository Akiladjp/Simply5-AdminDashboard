import db from "../../config/DatabaseConfig.js";
import express from "express";
import multer from "multer";
import { uploadImage } from "../../AWS/upload_image.js";
import { getImage } from "../../AWS/get_images.js";
import { deleteImage } from "../../AWS/delete_image.js";

const Item = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add new item
Item.post("/additemevalues", upload.single("image"), async (req, res) => {
  const fileExtension = req.file.originalname;
  const filename = "item_bucket/" + fileExtension;

  const sql =
    "INSERT INTO item (`name`,`category`,`sub_category`,`price`,`prepare_time`,`description`,`image_link`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.category,
    req.body.sub_category,
    req.body.price,
    req.body.prepare_time,
    req.body.description,
    filename,
  ];

  db.query(sql, [values], async (err, data) => {
    if (err) {
      console.error("Error inserting into database:", err);
      return res.status(500).json({ message: "Error in uploading to database", err });
    }

    const upload_image = await uploadImage(req.file.mimetype, filename, req.file.buffer);

    if (upload_image.message === "Successfully uploaded") {
      return res.json({ message: "Success" });
    } else {
      const deleteSQL = "DELETE FROM `item` WHERE `itemID` = ?";
      db.query(deleteSQL, [data.insertId], (error, result) => {
        if (error) {
          console.error("Error deleting record:", error);
          return res.json({ message: "Error deleting record" });
        }
        return res.json({ message: "Item not added" });
      });
    }
  });
});

// Get all meals
Item.get("/getiteMeal", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Meal"';
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];
      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        const imageUrl = await getImage(ans[i].image_link);
        items.push({ ...ans[i], image_url: imageUrl });
      }

      return res.json({ items });
    });
  } catch (error) {
    return res.json({ Message: "Error inside server" });
  }
});

// Get all drinks
Item.get("/getiteDrinks", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Drinks"';
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];
      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        const imageUrl = await getImage(ans[i].image_link);
        items.push({ ...ans[i], image_url: imageUrl });
      }

      return res.json({ items });
    });
  } catch (error) {
    return res.json({ Message: "Error inside server" });
  }
});

// Get all desserts
Item.get("/getiteDesserts", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Desserts"';
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];
      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        const imageUrl = await getImage(ans[i].image_link);
        items.push({ ...ans[i], image_url: imageUrl });
      }

      return res.json({ items });
    });
  } catch (error) {
    return res.json({ Message: "Error inside server" });
  }
});

// Update item details
Item.put("/updateItem/:id", upload.single("new_image"), async (req, res) => {
  const { id } = req.params;
  const { name, category, sub_category, price, prepare_time, description } = req.body;

  try {
    const sql = `
      UPDATE item
      SET name = ?, category = ?, sub_category = ?, price = ?, prepare_time = ?, description = ? 
      WHERE itemID = ?;
    `;
    db.query(
      sql,
      [name, category, sub_category, price, prepare_time, description, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error in updating item" });
        }
        return res.json({ message: "success" });
      }
    );

    // If new image is provided, update it
    if (req.file) {
      const filename = "item_bucket/" + req.file.originalname;
      await uploadImage(req.file.mimetype, filename, req.file.buffer);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error inside server" });
  }
});

// Delete an item
Item.delete("/delete_item/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sql1 = "SELECT * FROM item WHERE itemID = ?";
    db.query(sql1, [id], async (err, ans) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }

      if (ans.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }

      const filename = ans[0].image_link;
      const deleteImageResult = await deleteImage(filename);

      if (deleteImageResult.message !== "Success") {
        return res.status(500).json({ message: "Error in image deletion" });
      }

      const sql = "DELETE FROM item WHERE itemID = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database query error" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Item not found or already deleted" });
        }

        res.json({ message: "Item deleted successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
});

// Update availability status
Item.put("/updateAvailable/:id", async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    const sql = "UPDATE item SET available = ? WHERE itemID = ?";
    db.query(sql, [available, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }
      return res.status(200).json({ message: "Status updated successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
});

export default Item;

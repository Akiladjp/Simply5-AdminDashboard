import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import multer from "multer";
const Item = express.Router();
import { uploadImage } from "../../AWS/upload_image.js";
import { getImage } from "../../AWS/get_images.js";
import { deleteImage } from "../../AWS/delete_image.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
      return res
        .status(500)
        .json({ message: "Error in uploading to database", err });
    }

    console.log(req.file);
    const upload_image = await uploadImage(
      req.file.mimetype,
      filename,
      req.file.buffer
    );

    if (upload_image.message === "Successfully uploaded") {
      console.log("Successfully uploaded");
      return res.json({ message: "Success" });
    } else {
      const dlt = "DELETE FROM `employer` item `itemID` = ?";
      db.query(dlt, [data.insertId], (error, result) => {
        if (error) {
          console.error("Error deleting record:", error);
          return res.json({ message: "Error deleting record" });
        }
        return res.json({ message: "Item not added" });
      });
    }
  });
});

Item.get("/getiteMeal", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Meal"';

    var imageUrl;
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];

      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        imageUrl = await getImage(ans[i].image_link);

        items.push({
          ...ans[i],
          image_url: imageUrl,
        });
      }

      return res.json({ items });
    });
  } catch (error) {
    console.log(" error in get employee", error);
    return res.json({ Message: "Error inside server" });
  }
});

Item.get("/getiteDrinks", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Drinks"';

    var imageUrl;
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];

      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        imageUrl = await getImage(ans[i].image_link);

        items.push({
          ...ans[i],
          image_url: imageUrl,
        });
      }

      return res.json({ items });
    });
  } catch (error) {
    console.log(" error in get employee", error);
    return res.json({ Message: "Error inside server" });
  }
});

Item.get("/getiteDesserts", async (req, res) => {
  try {
    const sql = 'SELECT * FROM item WHERE category = "Desserts"';

    var imageUrl;
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error inside server" });

      const items = [];

      const maxItems = Math.min(15, ans.length);
      for (var i = 0; i < maxItems; i++) {
        imageUrl = await getImage(ans[i].image_link);

        items.push({
          ...ans[i],
          image_url: imageUrl,
        });
      }

      return res.json({ items });
    });
  } catch (error) {
    console.log(" error in get employee", error);
    return res.json({ Message: "Error inside server" });
  }
});

Item.get("/updateItem/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  //console.log(req.file)
  try {
    const sql = "SELECT * FROM item WHERE itemID = ?";

    db.query(sql, [id], async (err, ans) => {
      if (err) {
        return res.json({ Message: "Error inside server" });
      }
      if (ans.length === 0) {
        return res.status(404).json({ Message: "Employee not found" });
      }
      const preeItem = [];

      const imageUrl = await getImage(ans[0].image_link);

      // console.log(imageUrl);
      preeItem.push({
        ...ans[0],
        image_url: imageUrl,
      });

      return res.json({ preeItem });
    });
  } catch (error) {
    console.log(" error in get employee", error);
    return res.json({ Message: "Error inside server" });
  }
});

// UpdateEmployee.get("/updateEmployee/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const sql = "SELECT * FROM employer WHERE empID = ?";

//     db.query(sql, [id], async (err, ans) => {
//       if (err) {
//         return res.json({ Message: "Error inside server" });
//       }
//       if (ans.length === 0) {
//         return res.status(404).json({ Message: "Employee not found" });
//       }
//       const preemployees = [];

//       const imageUrl = await getImage(ans[0].image_link);

//       preemployees.push({
//         ...ans[0],
//         image_url: imageUrl,
//       });

//       console.log(preemployees[0].name);
//       console.log(preemployees[0].address);

//       return res.json({ preemployees });
//     });
//   } catch (error) {
//     console.log(" error in get employee", error);
//     return res.json({ Message: "Error inside server" });
//   }
// });

Item.put("/updateItem/:id", upload.single("new_image"), async (req, res) => {
  const { id } = req.params;
  console.log("211",id);
  const { name, category, sub_category, price, prepare_time, description } =
    req.body;
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
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Error in updating employee" });
        }
        return res.json({ message: "success" });
      }
    );

    if (req.file) {
      const fileExtension =! req.file.originalname;
  
      const filename = "item_bucket/" + fileExtension;
      const upload_image = await uploadImage(
        req.file.mimetype,
        filename,
        req.file.buffer
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Error inside server" });
  }
});

Item.delete("/delete_item/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sql1 = "SELECT * FROM item WHERE itemID = ?";
    db.query(sql1, [id], async (err, ans) => {
      if (err) {
        console.error("Error in getting item from database:", err);
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

        const sql = "DELETE FROM item WHERE itemID = ?";
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

export default Item;

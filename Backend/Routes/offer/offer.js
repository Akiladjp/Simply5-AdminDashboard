import db from "../../config/DatabaseConfig.js";
import express from "express";
import multer from "multer";
import { uploadImage } from "../../AWS/upload_image.js";
import { getImage } from "../../AWS/get_images.js";
import { deleteImage } from "../../AWS/delete_image.js";

const offer = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add new offer banner

offer.post("/addoffer", upload.single("image"), async (req, res) => {
  const filename = "offers_bucket/" + req.file.originalname;
  const status = "enable";

  const sql = "INSERT INTO offers (`image_link`, `status`) VALUES (?)";

  const values = [filename, status];

  db.query(sql, [values], async (err, data) => {
    if (err) {
      console.error("Error inserting into database:", err);
      return res
        .status(500)
        .json({ message: "Error in uploading to database", err });
    }

    const upload_image = await uploadImage(
      req.file.mimetype,
      filename,
      req.file.buffer
    );

    if (upload_image.message === "Successfully uploaded") {
      console.log("Successfully uploaded");
      return res.json({ message: "Success" });
    } else {
      const dlt = "DELETE FROM `offers` WHERE `offerID` = ?";
      db.query(dlt, [data.insertId], (error, result) => {
        if (error) {
          console.error("Error deleting record:", error);
          return res.status(500).json({ message: "Error deleting record" });
        }
        return res.status(500).json({ message: "Item not added" });
      });
    }
  });
});

offer.get("/showoffer", async (req, res) => {
  try {
    const sql = "SELECT * FROM offers";
    db.query(sql, async (err, ans) => {
      if (err) return res.json({ Message: "Error in offerBanner", err });

      const offerBanner = [];
      const maxOffers = Math.min(15, ans.length);

      for (let i = 0; i < maxOffers; i++) {
        const imageUrl = await getImage(ans[i].image_link);
        offerBanner.push({
          ...ans[i],
          image_url: imageUrl.url,
        });
      }
      console.log(offerBanner);

      return res.json({ offerBanner });
    });
  } catch (error) {
    console.log("Error in get offer banners", error);
    return res.json({ Message: "Error inside server" });
  }
});

offer.put("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const sql = `UPDATE offers SET status = ? WHERE id = ?`;
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }
      return res
        .status(200)
        .json({ message: "Status updated successfully", result });
    });
  } catch (error) {
    console.error("Error updating status", error);
    res.status(500).json({ message: "Error updating status", error });
  }
});

offer.put("/deleteImage/:id", async (req, res) => {
  const offerID = req.params;

  try {
    const sql = "DELETE * FROM offers WHERE offerID = ?";
 
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }
      return res
        .status(200)
        .json({ message: "Offer deleted successfully", result });
    });
  } catch (err) {
    console.error("Error updating status", err);
    res.status(500).json({ message: "Error updating status", err });
  }
});

export default offer;

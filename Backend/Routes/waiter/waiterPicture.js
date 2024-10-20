import db from "../../config/DatabaseConfig.js";
import express from "express";
import multer from "multer";
import { uploadImage } from "../../AWS/upload_image.js";
import { getImage } from "../../AWS/get_images.js";
import { deleteImage } from "../../AWS/delete_image.js";
import offer from "../offer/offer.js";
import WaiterAuthorization from "../../Authorization/WaiterAuthorization.js";

const waiterPicture = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

waiterPicture.get("/waiterpicture/:email",WaiterAuthorization, async (req, res) => {
  const { email } = req.params;

  try {
    const sql =
      "SELECT a.empID, e.image_link FROM admin a JOIN employer e ON a.empID = e.empID WHERE a.email=?";

    db.query(sql, [email], async (err, ans) => {
      if (err)
        return res.json({ Message: "Error in waiterPicture", error: err });

      const offerBanner = [];
      const maxOffers = Math.min(15, ans.length);

      for (let i = 0; i < maxOffers; i++) {
        const imageUrl = await getImage(ans[i].image_link);
        offerBanner.push({
          ...ans[i],
          image_url: imageUrl,
        });
      }
      // console.log(offerBanner);
      return res.json({ offerBanner });
    });
  } catch (err) {
    console.log("Error in waiter picture", err);
    return res.json({ Message: "Server error occurred", error: err });
  }
});

export default waiterPicture;

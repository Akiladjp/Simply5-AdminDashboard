import db from "../../config/DatabaseConfig.js";
import express from "express";
import multer from "multer";
import { uploadImage } from "../../AWS/upload_image.js";
import { getImage } from "../../AWS/get_images.js";
import { deleteImage } from "../../AWS/delete_image.js";
import WaiterAuthorization from "../../Authorization/WaiterAuthorization.js";

const waiterProfile = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

waiterProfile.get("/waiterProfile/:email", WaiterAuthorization, (req, res) => {
	const email = req.params.email;

	const sql = `SELECT e.name, e.phoneNo, e.position, e.address 
               FROM employer e 
               JOIN admin a ON a.empID = e.empID 
               WHERE a.email = ?`;

	db.query(sql, [email], (err, result) => {
		if (err) {
			console.error("Error in waiter profile:", err);
			return res.status(500).send("Server error");
		}

		if (result.length === 0) {
			return res.status(404).send("No waiter profile found");
		}

		return res.json(result[0]);
	});
});

waiterProfile.get("/waiterID/:email",WaiterAuthorization, (req, res) => {
	const email = req.params.email;
	try {
		const sql = "SELECT `empID` FROM admin WHERE email=?";
		db.query(sql, [email], (err, result) => {
			if (err) {
				console.log("server error", err);
			}
			// console.log(result[0]["empID"])
			return res.json({ waiterID: result[0]["empID"] });
		});
	} catch (err) {
		console.log("server Error", err);
	}
});

export default waiterProfile;

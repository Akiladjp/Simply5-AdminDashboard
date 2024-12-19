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

waiterProfile.get("/waiterID/:email", WaiterAuthorization, (req, res) => {
	const email = req.params.email;
	try {
		const sql = "SELECT `empID` FROM admin WHERE email=?";
		db.query(sql, [email], (err, result) => {
			if (err) {
				console.log("server error", err);
			}
		//	console.log(result[0]["empID"]);
			return res.json({ waiterID: result[0]["empID"] });
		});
	} catch (err) {
		console.log("server Error", err);
	}
});

waiterProfile.get("/OrderCount/:waiterID", WaiterAuthorization, (req, res) => {

	const date = new Date().toISOString().split("T")[0];
	const  {waiterID}  = req.params;
	console.log(date,waiterID);
	try {
		// Corrected SQL query to count orders grouped by WaiterID
		const sql = `
		SELECT WaiterID, COUNT(*) AS orderCount
		FROM orders
		WHERE DATE(CONVERT_TZ(date, '+00:00', '+05:30')) = ? AND waiterID =? AND status = "delivered" OR status ="hidden"
		
	`;

		db.query(sql, [date, waiterID], (err, result) => {
			if (err) {
				console.log("SQL error in getting order count:", err);
				return res
					.status(500)
					.json({ message: "Error in querying the database." });
			}
			console.log(result[0].orderCount);
			if (result.length > 0) {
				const orderCount = result[0].orderCount;
				return res.json({ count: orderCount });
			} else {
				return res.json({ count: 0 });
			}
		});
	} catch (err) {
		console.log("Server error:", err);
		return res.status(500).json({ message: "Server error." });
	}
});

waiterProfile.get(
	"/OrderCountMonth/:waiterID",
	WaiterAuthorization,
	(req, res) => {
		try {
			// Get the current year and month
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
			const { waiterID } = req.params;

			// SQL query to count orders grouped by WaiterID for the current month
			const sql = `
          SELECT WaiterID, COUNT(*) AS orderCount
          FROM orders
          WHERE YEAR(date) = ? AND MONTH(date) = ? AND waiterID = ?  AND status = "delivered" OR status ="hidden"
          GROUP BY WaiterID
      `;

			db.query(sql, [year, month, waiterID], (err, result) => {
				if (err) {
					console.log("SQL error in getting order count:", err);
					return res
						.status(500)
						.json({ message: "Error in querying the database." });
				}

				if (result.length > 0) {
					const orderCount = result[0].orderCount;
					return res.json({ count: orderCount });
				} else {
					return res.json({ count: 0 });
				}
			});
		} catch (err) {
			console.log("Server error:", err);
			return res.status(500).json({ message: "Server error." });
		}
	}
);

export default waiterProfile;

import AdminCashier from "../../Authorization/AdminCashierAuthrize.js";
import AllRoleAuthentication from "../../Authorization/AllRoleAuthentication.js";
import db from "../../config/DatabaseConfig.js";
import express from "express";

const notify = express.Router();

notify.get("/get_notification", AllRoleAuthentication, (req, res) => {
	try {
		const sql = "SELECT * FROM orders";

		db.query(sql, [], (err, result) => {
			
			if (err) {
				console.log(err);
				res.json({ message: "sql err" });
			}

			var newlength = result.length;

			res.json({ length: newlength });
		});
	} catch (err) {
		console.log(err);
	}
});

export default notify;

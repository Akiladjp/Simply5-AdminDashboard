import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import { getImage } from "../../AWS/get_images.js";

const Employee = express.Router();

Employee.get("/employeecard", async (req, res) => {
	try {
		const sql = "SELECT employer.*, admin.email FROM employer LEFT JOIN admin ON employer.empID = admin.empID;";

		db.query(sql, async (err, ans) => {
			if (err) return res.json({ Message: "Error inside server" });

			const employees = [];

			const maxItems = Math.min(15, ans.length);
			for (var i = 0; i < maxItems; i++) {
				const imageUrl = await getImage(ans[i].image_link);

				employees.push({
					...ans[i],
					image_url: imageUrl.url,
				});
			}

			return res.json({ employees });
		});
	} catch (error) {
		console.log(" error in get employee", error);
		return res.json({ Message: "Error inside server" });
	}
});

export default Employee;

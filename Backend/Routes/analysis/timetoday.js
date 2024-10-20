import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";

import cors from "cors";
import AdminCashier from "../../Authorization/AdminCashierAuthrize.js";
import AdminAuthorize from "../../Authorization/AdminAuthorize.js";

router.get("/timetoday", AdminAuthorize, (req, res) => {
	const selectedItem = req.query.selectedOption;
	const sqlnames = "SELECT item.name FROM item ORDER BY item.itemID";

	db.query(sqlnames, (err, names) => {
		if (err) return res.json(err);

		const sql =
			"SELECT HOURS.hour AS start,HOURS.hour + 1 AS end,COALESCE(SUM(CASE WHEN item.name = ? THEN contains.quantity ELSE 0 END), 0) AS value FROM (SELECT 00 AS hour UNION SELECT 01 UNION SELECT 02 UNION SELECT 03 UNION SELECT 04 UNION SELECT 05 UNION SELECT 06 UNION SELECT 07 UNION SELECT 08 UNION SELECT 09 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23) AS HOURS LEFT JOIN orders ON HOURS.hour = HOUR(orders.time) AND DATE(orders.date) = CURDATE() LEFT JOIN contains ON orders.orderID = contains.orderID LEFT JOIN item ON contains.itemID = item.itemID AND item.name = ? GROUP BY HOURS.hour ORDER BY HOURS.hour";

		db.query(sql, [selectedItem, selectedItem], (err, todayData) => {
			if (err) return res.json(err);
			return res.json({ names: names, todayData: todayData });
		});
	});
});

export default router;

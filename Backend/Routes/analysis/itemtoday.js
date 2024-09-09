import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";

import cors from "cors";

router.use(cors());

router.get("/today", (req, res) => {
  const sql1 =
    "SELECT item.name,COALESCE(SUM(filtered_contains.quantity),0) AS total_quantity,item.category,filtered_contains.date FROM item LEFT JOIN(SELECT contains.itemID,contains.quantity,orders.date FROM contains JOIN orders ON contains.orderID = orders.orderID WHERE orders.date = CURDATE()) AS filtered_contains ON item.itemID = filtered_contains.itemID GROUP BY item.itemID ORDER BY item.itemID;";

  db.query(sql1, (err, todayData) => {
    if (err) return res.json("Error");
    return res.json(todayData);
  });
});

export default router;

import Express, { query, response } from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";

import AdminAuthorize from "../../Authorization/AdminAuthorize.js";
import WaiterAuthorization from "../../Authorization/WaiterAuthorization.js";
import AdminCashier from "../../Authorization/AdminCashierAuthrize.js";
import AdminWaiterAuthorize from "../../Authorization/AdminWaiterAuthorize.js";
import AllRoleAuthentication from "../../Authorization/AllRoleAuthentication.js";

router.get("/orderpending", AllRoleAuthentication, (req, res) => {
	const sql1 = "SELECT * FROM orders";
	const sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
						orders.time,
            orders.date, 
            orders.total,
            CONCAT('[', GROUP_CONCAT(
                CONCAT('{"itemName": "', item.name, '", "quantity": ', contains.quantity, ', "price": ', item.price, '}') 
                SEPARATOR ', '
            ), ']') AS items,
            user.name AS userName
        FROM orders
        JOIN contains ON orders.orderID = contains.orderID
        JOIN item ON contains.itemID = item.itemID
        JOIN user ON orders.mobileNo = user.phoneNo
        WHERE orders.status = 'pending'
        GROUP BY orders.orderID;
    `;

	db.query(sql, [], (err, rows) => {
		if (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows);
		res.json({
			data: rows,
		});
	});
});
// for admin
router.get("/orderaccepted", AllRoleAuthentication, (req, res) => {
	const { mobileNo } = req.query;

	let sql = `
        SELECT 
            orders.orderID, 
    orders.status, 
    orders.mobileNo, 
    orders.tableNo, 
    orders.date, 
    orders.waiterID,
		orders.total,
    employer.name AS waiterName,
    user.name AS userName,
            CONCAT('[', GROUP_CONCAT(
                CONCAT('{"itemName": "', item.name, '", "quantity": ', contains.quantity, ', "price": ', item.price, '}') 
                SEPARATOR ', '
            ), ']') AS items,
            user.name AS userName
        FROM orders
        JOIN contains ON orders.orderID = contains.orderID
        JOIN item ON contains.itemID = item.itemID
        JOIN user ON orders.mobileNo = user.phoneNo
				JOIN employer ON employer.empID = orders.waiterID
        WHERE orders.status = 'accept'
    `;

	if (mobileNo) {
		sql += ` AND orders.mobileNo LIKE '%${mobileNo}%' `;
	}

	sql += `GROUP BY orders.orderID`;

	db.query(sql, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}

		res.json({
			data: rows,
		});
	});
});
// for waiter
router.get(
	"/order_waiter_accepted/:waiterID",
	WaiterAuthorization,
	(req, res) => {
		const { mobileNo } = req.query;
		const { waiterID } = req.params;

		let sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
            orders.date, 
            orders.total,
						orders.time,
						orders.waiterID,
            CONCAT('[', GROUP_CONCAT(
                CONCAT('{"itemName": "', item.name, '", "quantity": ', contains.quantity, ', "price": ', item.price, '}') 
                SEPARATOR ', '
            ), ']') AS items,
            user.name AS userName
        FROM orders
        JOIN contains ON orders.orderID = contains.orderID
        JOIN item ON contains.itemID = item.itemID
        JOIN user ON orders.mobileNo = user.phoneNo
        WHERE orders.status = 'accept' AND orders.waiterID=?
    `;

		if (mobileNo) {
			sql += ` AND orders.mobileNo LIKE '%${mobileNo}%' `;
		}

		sql += `GROUP BY orders.orderID`;

		db.query(sql, [waiterID], (err, rows) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			res.json({
				data: rows,
			});
		});
	}
);

router.get(
	"/order_waiter_delivered/:waiterID",
	WaiterAuthorization,
	(req, res) => {
		const { waiterID } = req.params;

		const sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
            orders.date, 
            orders.total,
						orders.time,
						orders.waiterID,
            CONCAT('[', GROUP_CONCAT(
                CONCAT('{"itemName": "', item.name, '", "quantity": ', contains.quantity, ', "price": ', item.price, '}') 
                SEPARATOR ', '
            ), ']') AS items,
            user.name AS userName
        FROM orders
        JOIN contains ON orders.orderID = contains.orderID
        JOIN item ON contains.itemID = item.itemID
        JOIN user ON orders.mobileNo = user.phoneNo
        WHERE orders.status = 'delivered' AND orders.waiterID = ?
        GROUP BY orders.orderID;
    `;

		db.query(sql, [waiterID], (err, rows) => {
			if (err) {
				console.log("error in order_waiter_delivered ", err);
				res.status(400).json({ error: err.message });
				return;
			}

			console.log(rows);
			return res.json({
				data: rows,
			});
		});
	}
);

router.get("/orderpaid", AdminCashier, (req, res) => {
	const { mobileNo } = req.query;

	const sql_user = `
  SELECT 
    user.name AS userName,
    user.phoneNo AS userPhoneNo,
		orders.tableNo,
		orders.mobileNo,
		orders.status,
    SUM(orders.total) AS total,
    COUNT(orders.orderID) AS totalOrdersCount
  FROM orders
  JOIN user ON user.phoneNo = orders.mobileNo
	WHERE orders.status =?
  GROUP BY user.phoneNo, user.name;
`;

	db.query(sql_user, ["paid"], (err, result) => {
		if (err) {
			console.log(err);
			res.json({ message: "error on sql", err });
		}

		return res.json({ data: result });
	});
});
router.get("/orderdelivered", AllRoleAuthentication, (req, res) => {
	const { mobileNo } = req.query;

	const sql_user = `
 SELECT 
user.name AS userName,
user.phoneNo AS userPhoneNo,
orders.tableNo,
orders.mobileNo,
orders.status,
orders.time,
orders.waiterID,
orders.orderID,
SUM(orders.total) AS total,
COUNT(orders.orderID) AS totalOrdersCount
FROM orders
JOIN user ON user.phoneNo = orders.mobileNo

WHERE orders.status =?
GROUP BY user.phoneNo, user.name;
`;

	db.query(sql_user, ["delivered"], (err, result) => {
		if (err) {
			console.log(err);
			res.json({ message: "error on sql", err });
		}
		console.log(result);
		return res.json({ data: result });
	});
});

router.get("/getPaiedItem/:mobileNo", AllRoleAuthentication, (req, res) => {
	const { mobileNo } = req.params;
	console.log("in getpaid", mobileNo);
	const sql_getOrderId = `
  SELECT 
    contains.itemID, 
    item.price,
		item.name,
    SUM(contains.quantity) AS totalQuantity,
    (item.price * SUM(contains.quantity)) AS totalPrice
  FROM orders
  JOIN contains ON contains.orderID = orders.orderID 
  JOIN item ON item.itemID = contains.itemID
  WHERE orders.mobileNo = ? AND orders.status=?
  GROUP BY contains.itemID, item.price;

`;

	db;

	db.query(sql_getOrderId, [mobileNo, "paid"], (err, result) => {
		if (err) {
			console.log("error in sql in get paid item", err);
			res.json({ message: "error in sql" });
		}

		res.json({ paidItems: result });
	});
});
router.get("/getDeliveryItem/:mobileNo", AllRoleAuthentication, (req, res) => {
	const { mobileNo } = req.params;
	console.log("in getpaid", mobileNo);
	const sql_getOrderId = `
  SELECT 
    contains.itemID, 
    item.price,
		item.name,
		
    SUM(contains.quantity) AS totalQuantity,
    (item.price * SUM(contains.quantity)) AS totalPrice
  FROM orders
  JOIN contains ON contains.orderID = orders.orderID 
  JOIN item ON item.itemID = contains.itemID
  WHERE orders.mobileNo = ? AND orders.status=?
  GROUP BY contains.itemID, item.price;

`;

	db;

	db.query(sql_getOrderId, [mobileNo, "delivered"], (err, result) => {
		if (err) {
			console.log("error in sql in get paid item", err);
			res.json({ message: "error in sql" });
		}

		res.json({ paidItems: result });
	});
});

router.delete("/orderdelete/:orderID", AllRoleAuthentication, (req, res) => {
	const { orderID } = req.params;

	db.beginTransaction((err) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		}

		// Delete from contains table
		const deleteContainsSQL = "DELETE FROM contains WHERE orderID = ?";
		db.query(deleteContainsSQL, [orderID], (err, result) => {
			if (err) {
				return db.rollback(() => {
					res.status(400).json({ error: err.message });
				});
			}

			// Delete from orders table
			const deleteOrderSQL = "DELETE FROM orders WHERE orderID = ?";
			db.query(deleteOrderSQL, [orderID], (err, result) => {
				if (err) {
					console.log(err);
					return db.rollback(() => {
						res.status(400).json({ error: err.message });
					});
				}

				db.commit((err) => {
					if (err) {
						return db.rollback(() => {
							res.status(400).json({ error: err.message });
						});
					}

					res.status(200).send({
						message: `Order ${orderID} and associated items deleted successfully`,
					});
				});
			});
		});
	});
});
router.put(
	"/order_deleverd_delete/:orderID",
	WaiterAuthorization,
	(req, res) => {
		const { orderID } = req.params;
		const time = req.body["time"];
		console.log(time, orderID, "in chsnge to delivered");
		db.beginTransaction((err) => {
			if (err) {
				return res.status(400).json({ error: err.message });
			}

			// Delete from contains table
			// const deleteContainsSQL = "DELETE FROM contains WHERE orderID = ?";
			// db.query(deleteContainsSQL, [orderID], (err, result) => {
			// 	if (err) {
			// 		return db.rollback(() => {
			// 			res.status(400).json({ error: err.message });
			// 		});
			// 	}

			// Delete from orders table
			const deleteOrderSQL =
				"UPDATE orders SET `status`='hidden' WHERE orderID = ? AND time =?";
			db.query(deleteOrderSQL, [orderID, time], (err, result) => {
				if (err) {
					console.log(err);
					return db.rollback(() => {
						res.status(400).json({ error: err.message });
					});
				}
				console.log(result);
				db.commit((err) => {
					if (err) {
						return db.rollback(() => {
							res.status(400).json({ error: err.message });
						});
					}

					res.status(200).send({
						message: `Order ${orderID} and associated items deleted successfully`,
					});
				});
			});
			// }
			// );
		});
	}
);

router.put("/orderaccept/:orderID", AllRoleAuthentication, (req, res) => {
	const { orderID } = req.params;
	const { selectWaiterid } = req.body;
	const { time } = req.body;

	const updateStatusSQL =
		"UPDATE orders SET status = ? WHERE orderID = ? AND time=?";
	db.query(updateStatusSQL, ["accept", orderID, time], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ error: err.message });
		}

		if (result.affectedRows === 0) {
			console.log("not found");
			return res.status(404).json({ message: `Order ${orderID} not found` });
		}

		const updateWaiterSQL = "UPDATE orders SET waiterID = ? WHERE orderID = ?";
		db.query(updateWaiterSQL, [selectWaiterid, orderID], (err, respo) => {
			if (err) {
				console.log(err);
				return res
					.status(400)
					.json({ message: "Error in adding waiter ID to table", error: err });
			}

			const getMobileSQL = "SELECT mobileNo FROM orders WHERE orderID = ?";
			db.query(getMobileSQL, [orderID], (err, result) => {
				if (err) {
					return res
						.status(404)
						.json({ message: "Error in retrieving mobile number", error: err });
				}

				if (result.length === 0) {
					return res
						.status(404)
						.json({ message: `Mobile number not found for order ${orderID}` });
				}

				const mobileNo = result[0].mobileNo;

				const gettingItemID = "SELECT itemID FROM contains WHERE `orderID`=?";
				db.query(gettingItemID, [orderID], (err, result) => {
					if (err) {
						console.log("SQL ERR IN GETTINGiTEMid", err);
						return;
					}

					const OrderItems = result.map((row) => row.itemID);
					for (let i = 0; i < OrderItems.length; i++) {
						const update_addcartSTate =
							"UPDATE add_cart SET `state` = ? WHERE mobileno = ? AND itemID=?";
						db.query(
							update_addcartSTate,
							["accept", mobileNo, OrderItems[i]],
							(err, result) => {
								if (err) {
									console.log("sql err in updating add cart state", err);
								}
							}
						);
					}
				});
				// const update_addcartSTate = "DELETE FROM add_cart WHERE mobileNo = ?";
				// db.query(deleteCartSQL, [mobileNo], (err) => {
				//   if (err) {
				//     return res.status(404).json({
				//       message: "Error in deleting cart items",
				//       error: err,
				//     });
				//   }

				return res.status(200).json({
					message: `Order ${orderID} status updated to 'accept' and cart cleared for mobile number ${mobileNo}`,
				});
				// });
			});
		});
	});
});

router.put(
	"/orderstatusdelivered/:orderID",
	WaiterAuthorization,
	(req, res) => {
		const { orderID } = req.params;
		const time = req.body["time"];
		console.log(time);
		const updateStatusSQL = `UPDATE orders SET status = ? WHERE orderID = ? AND time=?`;
		db.query(updateStatusSQL, ["delivered", orderID, time], (err, result) => {
			if (err) {
				console.log(err);
				res.status(400).json({ error: err.message });
				return;
			}
			if (result.affectedRows > 0) {
				console.log("changes happen", result);
				return res.json({ message: "update changes" });
			} else {
				res.status(404).send({ message: `Order ${orderID} not found` });
			}
		});
	}
);



router.put("/orderstatuspaid/:selectMobile", AdminCashier, (req, res) => {
	const { selectMobile } = req.params;
	console.log(selectMobile);

	const updateStatusSQL = "UPDATE orders SET status = ? WHERE mobileNo = ?";
	db.query(updateStatusSQL, ["paid", selectMobile], (err, result) => {
		if (err) {
			console.log(err);
			res.status(400).json({ error: err.message });
			return;
		}

		if (result.affectedRows > 0) {
			res
				.status(200)
				.send({ message: `Order ${selectMobile} status updated to paid` });
		} else {
			res.status(404).send({ message: `Order ${selectMobile} not found` });
		}
	});
});

router.delete("/orderpaiddelete/:orderID", (req, res) => {
	const { orderID } = req.params;

	db.beginTransaction((err) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		}

		// Delete from contains table
		const deleteContainsSQL = "DELETE FROM contains WHERE orderID = ?";
		db.query(deleteContainsSQL, [orderID], (err, result) => {
			if (err) {
				return db.rollback(() => {
					res.status(400).json({ error: err.message });
				});
			}

			// Delete from orders table
			const deleteOrderSQL = "DELETE FROM orders WHERE orderID = ?";
			db.query(deleteOrderSQL, [orderID], (err, result) => {
				if (err) {
					return db.rollback(() => {
						res.status(400).json({ error: err.message });
					});
				}

				db.commit((err) => {
					if (err) {
						return db.rollback(() => {
							res.status(400).json({ error: err.message });
						});
					}

					res.status(200).send({
						message: `Order ${orderID} and associated items deleted successfully`,
					});
				});
			});
		});
	});
});

export default router;

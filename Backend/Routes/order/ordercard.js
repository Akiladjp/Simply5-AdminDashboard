import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";
import cors from "cors";

router.use(cors());

router.get("/orderpending", (req, res) => {
	const sql1 = "SELECT * FROM orders";

	const sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
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
			console.log("rows");
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows.length);
		res.json({
			data: rows,
		});
	});
});
// for admin
router.get("/orderaccepted", (req, res) => {
	const { mobileNo } = req.query;

	let sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
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
        WHERE orders.status = 'accept' OR orders.status ='delivered'
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
router.get("/order_waiter_accepted", (req, res) => {
	const { mobileNo } = req.query;

	let sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
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

router.get("/orderdelivered", (req, res) => {
	const sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
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
        WHERE orders.status = 'delivered'
        GROUP BY orders.orderID;
    `;

	db.query(sql, [], (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			data: rows,
		});
	});
});

router.get("/orderpaid", (req, res) => {
	const { mobileNo } = req.query;

	let sql = `
        SELECT 
            orders.orderID, 
            orders.status, 
            orders.mobileNo, 
            orders.tableNo, 
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
        WHERE orders.status = 'paid'
    `;

	if (mobileNo) {
		sql += ` AND orders.mobileNo LIKE '%${mobileNo}%' `;
	}

	sql += `GROUP BY orders.orderID`;

	db.query(sql, [], (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			data: rows,
		});
	});
});

router.delete("/orderdelete/:orderID", (req, res) => {
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
		const deleteOrderSQL =
			"DELETE FROM orders WHERE orderID = ?";
		db.query(deleteOrderSQL, [orderID], (err, result) => {
			if (err) {
				console.log(err)
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
		}
		);
	});
});
router.put("/order_deleverd_delete/:orderID", (req, res) => {
	const { orderID } = req.params;

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
			"UPDATE orders SET `status`='hidden' WHERE orderID = ?";
		db.query(deleteOrderSQL, [orderID], (err, result) => {
			if (err) {
				console.log(err)
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
});

router.put("/orderaccept/:orderID", (req, res) => {
	const { orderID } = req.params;

	const updateStatusSQL = "UPDATE orders SET status = ? WHERE orderID = ?";
	db.query(updateStatusSQL, ["accept", orderID], (err, result) => {
		if (err) {
			// Send error and return to prevent further execution
			return res.status(400).json({ error: err.message });
		}

		if (result.affectedRows > 0) {
			const getMobileSQL = "SELECT mobileNo FROM orders WHERE orderID = ?";
			db.query(getMobileSQL, [orderID], (err, result) => {
				if (err) {
					// Send error and return to prevent further execution
					return res.status(404).send({
						message: "Error in getting mobile number for order",
						err,
					});
				}

				// Check if mobileNo exists before attempting to delete
				if (result.length > 0) {
					const mobileNo = result[0].mobileNo;
					// const deleteCartSQL = "DELETE FROM add_cart WHERE mobileNo = ?";
					// db.query(deleteCartSQL, [mobileNo], (err, result) => {
						if (err) {
							// Send error and return to prevent further execution
							return res.status(404).send({
								message: "Error in deleting cart values for mobile number",
								err,
							});
						}

						// Send the success response after everything is completed
						return res.status(200).send({
							message: `Order ${orderID} status updated to accept and cart cleared for mobile number ${mobileNo}`,
						});
					// });
				} else {
					// Send error if mobileNo not found
					return res.status(404).send({
						message: `Mobile number not found for order ${orderID}`,
					});
				}
			});
		} else {
			// Send error if orderID not found
			return res.status(404).send({ message: `Order ${orderID} not found` });
		}
	});
});

router.put("/orderstatusdelivered/:orderID", (req, res) => {
	const { orderID } = req.params;
	const waiterID = req.body.waiterID;

	const updateStatusSQL = "UPDATE orders SET status = ? WHERE orderID = ?";
	db.query(updateStatusSQL, ["delivered", orderID], (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}

		if (result.affectedRows > 0) {
			const sql1 = "UPDATE orders SET waiterID =? WHERE orderID =?";
			db.query(sql1, [waiterID, orderID], (err, result) => {
				if (err) {
					res
						.status(400)
						.send({ massage: "error in adding waiter id to table" });
				} else {
					res.status(200).send({
						message: "status updated to paid and waiter ID successfully added",
					});
				}
			});
		} else {
			res.status(404).send({ message: `Order ${orderID} not found` });
		}
	});
});
router.put("/orderstatuspaid/:orderID", (req, res) => {
	const { orderID } = req.params;

	const updateStatusSQL = "UPDATE orders SET status = ? WHERE orderID = ?";
	db.query(updateStatusSQL, ["paid", orderID], (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}

		if (result.affectedRows > 0) {
			res
				.status(200)
				.send({ message: `Order ${orderID} status updated to paid` });
		} else {
			res.status(404).send({ message: `Order ${orderID} not found` });
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

import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
const adminLogin = express.Router();

adminLogin.post("/adminlogin", async (req, res) => {
	try {
		const sql = "SELECT * FROM admin WHERE email = ?";
		db.query(sql, [req.body.email], (err, result) => {
			if (err) return res.status(500).json({ Message: "Server error" });

			if (result.length > 0) {
				bcrypt.compare(
					req.body.password,
					result[0].password,
					(err, response) => {
						if (err) return res.status(500).json("Error");

						if (response) {
							const empID = result[0].empID;

							// check the position
							const positionSql =
								"SELECT position FROM employer WHERE empID = ?";
							db.query(positionSql, [empID], (err, positionResult) => {
								if (err)
									return res.status(500).json({ Message: "Server error" });

								if (positionResult.length > 0) {
									const position = positionResult[0].position;
									//jwt
									const token = jwt.sign(
										{ id: empID, userType: position },
										process.env.JWT_SECRET_KEY
									);
									// Redirect based on position
									if (position === "Waiter") {
										return res
											.cookie("jwtToken", token, {
												httpOnly: true,
												maxAge: 24 * 60 * 60 * 1000,
											})
											.json({
												Login: true,
												redirectURL: "/Waiter/pending-orders",
												email: req.body.email,
												role: position,
											});
									} else if (position === "Manager" || position === "Cashier") {
										console.log("position", position, req.body.email);
										
										return res
											.cookie("jwtToken", token, {
												httpOnly: true,
												maxAge: 24 * 60 * 60 * 1000,
											})
											.json({
												Login: true,
												redirectURL: "/app/order/pending",
												email: req.body.email,
												role: position,
											});
									} else {
										return res
											.status(403)
											.json({ Message: "Unauthorized position" });
									}
								} else {
									return res
										.status(404)
										.json({ Message: "Position not found" });
								}
							});
						} else {
							return res.json({ Message: "Password is incorrect!" });
						}
					}
				);
			} else {
				return res.json({ Message: "Email is incorrect!" });
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ Message: "Server error" });
	}
});

export default adminLogin;

import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";

import AllRoleAuthentication from "../../Authorization/AllRoleAuthentication.js";
import WaiterAuthorization from "../../Authorization/WaiterAuthorization.js";
import AdminWaiterAuthorize from "../../Authorization/AdminWaiterAuthorize.js";
import AdminCashier from "../../Authorization/AdminCashierAuthrize.js";
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
									console.log(position);
									//jwt
									const token = jwt.sign(
										{ id: empID, userType: position },
										process.env.JWT_SECRET_KEY,
										{ expiresIn: "1d" } // Token valid for 1 day 1s
								);

									// Redirect based on position
									if (position === "Waiter") {
										return res
										.cookie("jwtToken", token, {
											httpOnly: true,
											maxAge: 24 * 60 * 60 * 1000,
									})
									//max age 1*1000
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

adminLogin.get("/admin-login-validation", AdminCashier, async (req, res) => {
	
	try {
		// console.log("dasf",AdminCashier.res.message);
		const token = req.cookies.jwtToken;
		

		if (!token) {
			console.log("no token");
			return res.status(400).json({ message: "Token is missing" });
		}

		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(400).json({ message: "Unauthorized" });
			}
			console.log(err);

			if (decoded.userType === "Manager" || decoded.userType === "Cashier") {
				return res.status(200).json({ message: "Authorized" });
			} else {
				return res.status(403).json({ message: "Forbidden" });
			}
		});
	} catch (err) {
		console.log("Error in server", err);
		return res.status(500).json({ message: "Internal server error" });
	}
});

adminLogin.get(
	"/waiter-login-validation",
	WaiterAuthorization,
	async (req, res) => {
		console.log(WaiterAuthorization);
		try {
			const token = req.cookies.jwtToken;

			if (!token) {
				return res.status(400).json({ message: "Token is missing" });
			}

			jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
				if (err) {
					return res.status(400).json({ message: "Unauthorized" });
				}

				if (decoded.userType === "Waiter") {
					return res.status(200).json({ message: "Authorized" });
				} else {
					return res.status(403).json({ message: "Forbidden" });
				}
			});
		} catch (err) {
			console.log("Error in server", err);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

adminLogin.get("/login-validation", (req, res) => {
	try {
		const token = req.cookies.jwtToken;
		
		if (!token) {
			console.log("token is missing");
			return res.status(400).json({ message: "Token is missing" });
		}
		
		console.log("token is valid");
		return res.status(200).json({ message: "Token is valid" });
	} catch (err) {
		console.log("Error in server", err);
		return res.status(500).json({ message: "Internal server error" });
	}
});

adminLogin.get('/token-check', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ tokenValid: true });
});

export default adminLogin;

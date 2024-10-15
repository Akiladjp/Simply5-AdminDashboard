import db from "../../config/DatabaseConfig.js";
import express from "express";

const summaryEmployee = express.Router();

summaryEmployee.get("/employeeSummary", (req, res) => {
	try {
		const sql = `
          SELECT e.empID, e.name, e.position, s.date, s.comment 
          FROM employer e 
          LEFT JOIN service s ON e.empID = s.empID 
          WHERE e.position = "Waiter"
      `;

		db.query(sql, (err, result) => {
			if (err) {
				console.error("SQL Error:", err);
				return res
					.status(500)
					.json({ message: "Error in querying the database." });
			}
			// console.log(result);

			const employeeMap = new Map();

			result.forEach((row) => {
				const empID = row.empID;

				if (!employeeMap.has(empID)) {
					employeeMap.set(empID, {
						empID: row.empID,
						name: row.name,
						position: row.position,
						dates: row.date ? [row.date.toISOString().split("T")[0]] : [],
						comments: row.comment ? [row.comment] : [],
					});
				} else {
					const employeeDetails = employeeMap.get(empID);
					if (row.comment) {
						employeeDetails.comments.push(row.comment);
					}
					if (row.date) {
						employeeDetails.dates.push(row.date.toISOString().split("T")[0]);
					}
				}
			});

			const Details = Array.from(employeeMap.values()).map((employee) => ({
				empID: employee.empID,
				name: employee.name,
				position: employee.position,
				dates: employee.dates,
				comments: employee.comments,
			}));

			// console.log(Details)
			return res.json({ EmpDetails: Details });
		});
	} catch (err) {
		console.error("Server error:", err);
		return res.status(500).json({ message: "Server error." });
	}
});

summaryEmployee.get("/OrderCount", (req, res) => {
	const date = new Date().toISOString().split("T")[0];
	console.log(date);
	try {
		// Corrected SQL query to count orders grouped by WaiterID
		const sql = `
		SELECT WaiterID, COUNT(*) AS orderCount
		FROM orders
		WHERE DATE(CONVERT_TZ(date, '+00:00', '+05:30')) = ?
		GROUP BY WaiterID
	`;
	

		db.query(sql, [date], (err, result) => {
			if (err) {
				console.log("SQL error in getting order count:", err);
				return res
					.status(500)
					.json({ message: "Error in querying the database." });
			}
			console.log(result.length);
			const orderCountMap = {};
			result.forEach((row) => {
				orderCountMap[row.WaiterID] = row.orderCount;
			});

			console.log(orderCountMap);
			return res.json({ count: orderCountMap });
		});
	} catch (err) {
		console.log("Server error:", err);
		return res.status(500).json({ message: "Server error." });
	}
});

summaryEmployee.get("/OrderCountMonth", (req, res) => {
	try {
		// Get the current year and month
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based

		// SQL query to count orders grouped by WaiterID for the current month
		const sql = `
          SELECT WaiterID, COUNT(*) AS orderCount
          FROM orders
          WHERE YEAR(date) = ? AND MONTH(date) = ?
          GROUP BY WaiterID
      `;

		db.query(sql, [year, month], (err, result) => {
			if (err) {
				console.log("SQL error in getting order count:", err);
				return res
					.status(500)
					.json({ message: "Error in querying the database." });
			}

			const orderCountMap = {};
			result.forEach((row) => {
				orderCountMap[row.WaiterID] = row.orderCount;
			});

			//  console.log(orderCountMap);
			return res.json({ count: orderCountMap });
		});
	} catch (err) {
		console.log("Server error:", err);
		return res.status(500).json({ message: "Server error." });
	}
});

export default summaryEmployee;

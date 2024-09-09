import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";
import cors from "cors";

router.use(cors());

router.get('/orderpending', (req, res) => {

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
        WHERE orders.status = 'pending' AND orders.date = CURDATE()
        GROUP BY orders.orderID;
    `;

    db.query(sql, [], (err, rows) => {
        if (err) {
           
            res.status(400).json({ "error": err.message });
            return;
        }
      console.log(rows.length)
        res.json({
           
            "data": rows
        });
    });
});

router.get('/orderaccepted', (req, res) => {
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
        WHERE orders.status = 'accept' AND orders.date = CURDATE()
        GROUP BY orders.orderID;
    `;

    db.query(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        });
    });
});

router.get('/orderpaid', (req, res) => {
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
        WHERE orders.status = 'paid' AND orders.date = CURDATE()
        GROUP BY orders.orderID;
    `;

    db.query(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        });
    });
});

router.delete('/orderdelete/:orderID', (req, res) => {
    const { orderID } = req.params;

    db.beginTransaction((err) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }

        // Delete from contains table
        const deleteContainsSQL = 'DELETE FROM contains WHERE orderID = ?';
        db.query(deleteContainsSQL, [orderID], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({ "error": err.message });
                });
            }

            // Delete from orders table
            const deleteOrderSQL = 'DELETE FROM orders WHERE orderID = ?';
            db.query(deleteOrderSQL, [orderID], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(400).json({ "error": err.message });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({ "error": err.message });
                        });
                    }

                    res.status(200).send({ message: `Order ${orderID} and associated items deleted successfully` });
                });
            });
        });
    });
});

router.put('/orderaccept/:orderID', (req, res) => {
    const { orderID } = req.params;

    const updateStatusSQL = 'UPDATE orders SET status = ? WHERE orderID = ?';
    db.query(updateStatusSQL, ['accept', orderID], (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `Order ${orderID} status updated to accept` });
        } else {
            res.status(404).send({ message: `Order ${orderID} not found` });
        }
    });
});

router.put('/orderstatuspaid/:orderID', (req, res) => {
    const { orderID } = req.params;

    const updateStatusSQL = 'UPDATE orders SET status = ? WHERE orderID = ?';
    db.query(updateStatusSQL, ['paid', orderID], (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `Order ${orderID} status updated to paid` });
        } else {
            res.status(404).send({ message: `Order ${orderID} not found` });
        }
    });
});

router.delete('/orderpaiddelete/:orderID', (req, res) => {
    const { orderID } = req.params;

    db.beginTransaction((err) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }

        // Delete from contains table
        const deleteContainsSQL = 'DELETE FROM contains WHERE orderID = ?';
        db.query(deleteContainsSQL, [orderID], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(400).json({ "error": err.message });
                });
            }

            // Delete from orders table
            const deleteOrderSQL = 'DELETE FROM orders WHERE orderID = ?';
            db.query(deleteOrderSQL, [orderID], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(400).json({ "error": err.message });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(400).json({ "error": err.message });
                        });
                    }

                    res.status(200).send({ message: `Order ${orderID} and associated items deleted successfully` });
                });
            });
        });
    });
});



export default router;

import bcrypt from "bcrypt";
import db from "../../config/DatabaseConfig.js";
import express from "express";
import session from "express-session";

const OrderSearch = express.Router();

OrderSearch.get('/suggestPhoneNumbers', async (req, res) => {
  const { phone } = req.query;

  if (!phone || phone.length < 3) {
    return res.status(400).json({ message: 'Please provide at least 3 digits.' });
  }

  try {
    const sql = `SELECT phoneNo FROM users WHERE phoneNo LIKE ? LIMIT 10`;
    const searchPattern = `${phone}%`;

    db.query(sql, [searchPattern], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Database error.' });
      }
      
      const suggestions = results.map(row => row.phone_number);

      return res.json({ suggestions });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Unexpected server error.' });
  }
});

export default OrderSearch;


import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";

// import cors from "cors";
import session from "express-session";
import AdminAuthorize from "../../Authorization/AdminAuthorize.js";
import AllRoleAuthentication from "../../Authorization/AllRoleAuthentication.js";

// router.use(cors());

router.use(
	session({
		secret: "your_secret_key",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	})
);

// Logout route

router.post("/logout", (req, res) => {
  try {
   
    res.clearCookie("jwtToken", {
      httpOnly: true,   
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict' 
    });

    console.log("Token cleared successfully");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in server", err);
    return res.status(500).json({ message: "Server error" });
  }
});



export default router;

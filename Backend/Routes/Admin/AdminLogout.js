import Express from "express";
const router = Express.Router();
import db from "../../config/DatabaseConfig.js";

// import cors from "cors";
import session from "express-session";

// router.use(cors());

router.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your client origin
//   credentials: true
// };

// router.use(cors(corsOptions));



// router.post("/adminlogout", (req, res) => {
  

//   console.log("before",req.session.name);
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//     } else {
//       res.clearCookie("connect.sid"); // Clear the session token cookie
//       res.json({ success: true, message: "Logout successful" });
//     }
//   });
 

// });

router.get('/', (req, res) => {

  const username = req.session.name;
  if (username) {
    console.log("username",username)
    res.json({
      message: username,
      sessionData: {
        name: username
      }
    });
  } else {
    res.json({
      message: 'No session data found'
    });
  }
});


  // console.log(sessionValues);
  // res.json({
  //   message: 'Session values retrieved',
  //   sessionData: sessionValues
  // });


  // console.log(sessionValues);
  // res.json({
  //   message: 'Session values retrieved',
  //   sessionData: sessionValues
  // });


export default router;

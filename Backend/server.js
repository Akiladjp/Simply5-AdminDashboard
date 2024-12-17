import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  // console.log("CORS headers set for:", req.method, req.url);
  next();
});


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);



// Setup cookie-parser middleware
app.use(cookieParser());

// Setup express-session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Setup body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

import itemTodayRouter from "./Routes/analysis/itemtoday.js";
import timeTodayRouter from "./Routes/analysis/timetoday.js";
import itemWeekRouter from "./Routes/analysis/itemweek.js";
import timeWeekRouter from "./Routes/analysis/timeweek.js";
import itemMonthRouter from "./Routes/analysis/itemmonth.js";
import timeMonthRouter from "./Routes/analysis/timemonth.js";
import AdminLogin from "./Routes/Admin/AdminLogin.js";
import AdminLogout from "./Routes/Admin/AdminLogout.js";
import forgetPasswordRoute from "./Routes/Admin/Forgetpassword.js";
import otpRoute from "./Routes/Admin/OTP.js";
import resetRoute from "./Routes/Admin/Resetpassword.js";
import addemployee from "./Routes/employee/addEmployee.js";
import editemployee from "./Routes/employee/editEmployee.js";
import reademployee from "./Routes/employee/readEmployee.js";

import ordercard from "./Routes/order/ordercard.js"

import item from "./Routes/Item/item.js";
import UpdateEmployee from "../Backend/Routes/employee/updateEmployee.js";
import notify from "../Backend/Routes/notification/notification.js"

import orderSearch from "./Routes/order/orderSearch.js";
import offer from "./Routes/offer/offer.js";
import waiterProfile from "./Routes/waiter/waiterProfile.js";
import summaryEmployee from "./Routes/employee/summaryEmployee.js";
import waiterPicture from "./Routes/waiter/waiterPicture.js";

app.use("/", orderSearch);
app.use("/", itemTodayRouter);
app.use("/", timeTodayRouter);
app.use("/", itemWeekRouter);
app.use("/", timeWeekRouter);
app.use("/", itemMonthRouter);
app.use("/", timeMonthRouter);
app.use("/", AdminLogin);
app.use("/", AdminLogout);
app.use("/", forgetPasswordRoute);
app.use("/", otpRoute);
app.use("/", resetRoute);
app.use("/", addemployee);
app.use("/", editemployee);
app.use("/", reademployee);
app.use("/", ordercard);
app.use("/", item);
app.use("/", UpdateEmployee);
app.use("/", offer);
app.use("/", summaryEmployee);
app.use("/", notify);

app.use("/", waiterProfile);
app.use("/", waiterPicture);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };


import jwt from "jsonwebtoken";

function AdminCashier(req, res, next) {
  const token = req.cookies.jwtToken;
  if(!token){
    return res.json({message:"Unauthorized"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.json({message:"taoken invalied or expired"})
    }
    console.log(decoded.userType);
    if(decoded.userType!=="Manager" && decoded.userType!=="Cashier" ){
      console.log("messagge:","forbidden");
      return res.json({messagge:"forbidden"})
    }
    req.user= decoded;
    next();
  })
}

export default AdminCashier

import jwt from "jsonwebtoken";

function AdminWaiterAuthorize(req, res, next) {
  const token = req.cookies.jwtToken;
  if(!token){
    console.log("AdminWaiterAuthorize:Unauthorized");
    return res.status(400).json({message:"Unauthorized"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.status(400).json({message:"taoken invalied or expired"})
    }
    
    if(decoded.userType!=="Manager" && decoded.userType!=="Waiter" ){
      return res.status(403).json({messagge:"forbidden"})
    }
    req.user= decoded;
    
    next();
  })
}

export default AdminWaiterAuthorize

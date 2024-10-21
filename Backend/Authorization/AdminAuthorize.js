import jwt from "jsonwebtoken";

function AdminAuthorize(req, res, next) {
	const token = req.cookies.jwtToken;
  if(!token){
    return res.status(400).json({message:"Unauthorized"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.status(400).json({message:"taoken invalied or expired"})
    }
    
    if(decoded.userType!=="Manager"){
      return res.status(403).json({messagge:"forbidden"})
    }
    req.user= decoded;
    
    next();
  })
}

export default AdminAuthorize;





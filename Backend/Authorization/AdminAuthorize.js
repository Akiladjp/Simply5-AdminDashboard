import jwt from "jsonwebtoken";

function AdminAuthorize(req, res, next) {
	const token = req.cookies.jwtToken;
  if(!token){
    return res.json({message:"Unauthorized"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.json({message:"taoken invalied or expired"})
    }
    
    if(decoded.userType!=="Manager"){
      return res.json({messagge:"forbidden"})
    }
    req.user= decoded;
    
    next();
  })
}

export default AdminAuthorize;





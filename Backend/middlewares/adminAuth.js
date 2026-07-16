// import jwt from 'jsonwebtoken'

// const adminAuth=async(res, res, next)=>{
//     try {
//         const {token}=req.headers
//         if(!token){
//             res.json({success:false, message:"Unauthorized User"})
//         }

//         const token_decode=jwt.verify(token, process.env.JWT_SECRET);
//         if(token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false, message:"User is not authorized"})
//         }
//         next()
//     } catch (error) {
//         return res.json({success:false, message:error.message})
        
//     }
// }
// export default adminAuth

import jwt from 'jsonwebtoken';

const adminAuth = async(req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized User" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded Token:", token_decode);
    // console.log("Expected Admin Email:", process.env.ADMIN_EMAIL);

    if(token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
             return res.json({success:false, message:"User is not authorized"})
        }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;

import dotenv from "dotenv"
dotenv.config()

const verifyAdmin = async (req, res, next) => {
    try {
      const token=req.cookies.token
      if(!token){
        return res.json({status:false,message:"token not found"})
      }
      const decoded = jwt.verify(token, process.env.KEY);
      next()
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default verifyAdmin;

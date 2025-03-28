const jwt=require('jsonwebtoken')
const JWT_SECRET = 'ILoveOwlCity'

const fetchuser=(req,res,next)=>{
    //get the user form jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error:"no token found"})
    }
    try {
        const data=jwt.verify(token, JWT_SECRET)
        req.user=data.user
        next()
    } catch (error) {
        res.status(401).send({error:"Invalid token"})
    }
   

}
module.exports=fetchuser
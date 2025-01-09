const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('Authorization');
    if (!token){
        return res.status(401).json({message: 'No token'});
    }
    try{
        const bearerToken=token.split(' ')[1];
        const decoded=jwt.verify(bearerToken,process.env.JWT_SECRET);
        req.user=decoded.id;
        next();
    }
    catch(error){
        return res.status(401).json({message: 'Token is not valid'});
        
    }
}
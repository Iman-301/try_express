const express=require('express');
const {check,validationResult}=require('express-validator');
const {register,login}=require('../controllers/authController');
const router=express.Router();

router.post('/register',[
    check('name', 'Name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password> 6').isLength({min: 6}),
],
async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    register(req,res);
}

);

router.post('/login',[
    check('email','need email').isEmail(),
    check('password','need password').exists(),
],
    async (req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
        login(req,res);
    }
)

module.exports=router;

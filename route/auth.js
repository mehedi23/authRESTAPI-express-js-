const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register" , async (req , res) => {

    const is_Email = await User.findOne({
        email : req.body.email
    });
    if(is_Email) return res.status(400).send("email already exist") ;

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password , salt);

    const user = new User({
        name : req.body.name ,
        email : req.body.email,
        password : hashpassword
    });

    try{
        const saveUser = await user.save();
        res.send(saveUser)
    }catch(err){
        res.status(400).send(err)
    }
});

router.post("/logIn" , async (req , res ) =>{
    
    const user = await User.findOne({
        email : req.body.email
    });
    if(!user) return res.status(400).send("Email not found, please register") ;

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Password not match");

    const jwtToken = jwt.sign({ _id : user._id } , process.env.TOKEN_SECRET)
    res.header("auth-token" , jwtToken).send(jwtToken)

});

module.exports = router;
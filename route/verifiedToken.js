const { json } = require('express');
const jwt = require('jsonwebtoken');

function authVeryfi( req , res , next ){
    const token = req.header('auth-token');
    if(!token) return res.status(400).send("access denied");

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

    
}

module.exports = authVeryfi

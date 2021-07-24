const router = require('express').Router();
const authVeryfi = require('./verifiedToken')

router.get('/' , authVeryfi , (req , res) => {
    res.json({
        title : "this is title",
        description : "this is description"
    })
})

module.exports = router
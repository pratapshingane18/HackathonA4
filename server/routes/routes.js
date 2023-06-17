const express = require('express')
const router = express.Router();
const path = require('path')

//Controllers
const register = require('../controller/register')




//GET Request:

router.get("/",(req,res)=>{
    res.send("Hello");
})

//For posting judge and lawyer list as response
router.get("/addCase",admin.PostData);


//Post Request:


router.post("/register",register.register);

//For Login: req.body -> user_id, password
router.post("/login",register.login);
   



module.exports = router;
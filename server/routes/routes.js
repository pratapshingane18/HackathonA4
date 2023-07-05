import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import login from '../controllers/login.js';
import register  from "../controllers/register.js";
import * as course from "../controllers/course.js";
import * as allotment  from "../controllers/allotment.js";


/* import middlewares */
import Auth, { localVariables } from '../middleware/auth.js';
import verifyUser from "../middleware/verify.js";



/** POST Methods */
router.route('/register').post(register); // register user
router.route('/registerMail').post(registerMail); // send the email
// router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/authenticate').post(verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(verifyUser,login); // login in app
router.route('/course/submission').post(course.submission);
router.route('/allotment').post(allotment.allotment);

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/subject').get(course.subjectForm);
router.route('/subject/:id').get(course.subjectForm);

router.route('/allot').get(allotment.allot);

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



export default router;

// const express = require('express')
// const router = express.Router();
// const path = require('path')

// //Controllers
// const register = require('../controller/register')




// //GET Request:

// router.get("/",(req,res)=>{
//     res.send("Hello");
// })

// //For posting judge and lawyer list as response
// router.get("/addCase",admin.PostData);


// //Post Request:


// router.post("/register",register.register);

// //For Login: req.body -> user_id, password
// router.post("/login",register.login);
   



// module.exports = router;
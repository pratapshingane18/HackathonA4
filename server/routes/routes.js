import { Router } from "express";
const router = Router();

/** import all controllers */
// import * as controller from '../controllers/appController.js';

import { registerMail } from '../controllers/authentication/mailer.js'
import login from '../controllers/authentication/login.js';
import register  from "../controllers/authentication/register.js";
import * as course from "../controllers/course.js";
import * as allotment  from "../controllers/allotment/allotment.js";
import * as user from "../controllers/user.js";
import * as otp from "../controllers/authentication/otpGenerator.js";

/* import middlewares */
import Auth, { localVariables } from '../middleware/auth.js';
import verifyUser from "../middleware/verify.js";



/** POST Methods */
router.route('/register').post(register); // register user
router.route('/registerMail').post(registerMail); // send the email
// router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/authenticate').post(verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(verifyUser,login); // login in app
router.route('/course/submission').post(verifyUser,course.submission);
router.route('/allotment').post(verifyUser,allotment.allotment);



/** GET Methods */
router.route('/user/:username').get(user.getUser) // user with username
router.route('/generateOTP').get(verifyUser, localVariables, otp.generateOTP) // generate random OTP
router.route('/verifyOTP').get(verifyUser, otp.verifyOTP) // verify generated OTP
// router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/subject').get(course.subjectForm);
router.route('/subject/:id').get(course.subjectForm);
router.route('/allot').get(allotment.allData);



/** PUT Methods */
router.route('/updateuser').put(Auth, user.updateUser); // is use to update the user profile
// router.route('/resetPassword').put(verifyUser, controller.resetPassword); // use to reset password



export default router;

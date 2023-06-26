import {UserModel} from '../models/user.Model.js'
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import ENV from '../config.js';
// import otpGenerator from 'otp-generator';

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export default async function register(req,res){

  try {
      const { username, password, profile, email } = req.body;        

      // check the existing user
      const existUsername = new Promise((resolve, reject) => {
          UserModel.findOne({ username }, function(err, user){
              if(err) reject(new Error(err))
              if(user) reject({ error : "Please use unique username"});

              resolve();
          })
      });

      // check for existing email
      const existEmail = new Promise((resolve, reject) => {
          UserModel.findOne({ email }, function(err, email){
              if(err) reject(new Error(err))
              if(email) reject({ error : "Please use unique Email"});

              resolve();
          })
      });


      Promise.all([existUsername, existEmail])
          .then(() => {
              if(password){
                  bcrypt.hash(password, 10)
                      .then( hashedPassword => {
                          
                          const user = new UserModel({
                              username,
                              password: hashedPassword,
                              profile: profile || '',
                              email
                          });
                        console.log("Done");
                          // return save result as a response
                          user.save()
                              .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                              .catch(error => res.status(500).send({error}))

                      }).catch(error => {
                          return res.status(500).send({
                              error : "Enable to hashed password"
                          })
                      })
              }
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error);
  }

}





// const bcrypt = require("bcrypt");
// const Student = require("../models/student");

// class Register {
//   static register = async (req, res) => {
    

//     //Body properties
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const userId = req.body.userId;
//     const password = req.body.password;
//     const cpassword = req.body.cpassword;
//     const email = req.body.email;
//     const branch = req.body.branch;
//     const year = req.body.year;
//     const degree = req.body.degree;
    

//     //Checking if exist or not
//     const user = await Student.findOne({ userId: userId }).lean();

//     if (user) {
//       res.json({ status: "failed", message: "User Already Exist!!" });
//       console.log(user);
//     } else {
//       //Checking all properties are fulfilled
//       if (firstname && userId && password) {
//         //matching the passwords
//         if (password == cpassword) {
//           try {
//             //Generating a hash
//             const salt = await bcrypt.genSalt(10);
//             const hash_password = await bcrypt.hash(password, salt);

//             //Building a model document of user
//             const doc = new Student({
//               firstname: firstname,
//               lastname: lastname,
//               userId: userId,
//               password: password,
//               email: email,
//               branch: branch,
//               year: year,
//               degree: degree
//             });

//             //saving it
//             await doc.save();

//             const saved = await Student.findOne({ user_id: userId });

//             if (saved) {
//               res.json({
//                 status: "success",
//                 message: "Registration Successful",
//               });
//             } else {
//               res.json({
//                 status: "failed",
//                 message: "Registration Unsuccessful and not saved",
//               });
//             }
//           } catch (err) {
//             console.log(err);
//             res.json({
//               status: "failed",
//               message: "Registration UnSuccessful",
//             });
//           }
//         } else {
//           res.json({
//             status: "failed",
//             message: "Password and Confirm Password wasn't matching",
//           });
//         }
//       } else {
//         res.json({ status: "failed", message: "All feilds are required" });
//       }
//     }
//   };




//   static login = async (req, res) => {
    

//     const userId = req.body.userId;
//     const password = req.body.password;
    

//     const user = await Student.findOne({ user_id: userId }).lean();

//     if (user) {
//       if (password) {
//         const checkpass = await bcrypt.compareSync(password, user.password);

//         if (user.user_id === userId && checkpass) {
//           console.log("Login Successfully");
//           res.status(201).json({
//             status: "success",
//             message: "Login Successful",

//             userId: user.userId,
            
//           });
//         } else {
//           console.log("Login Unsuccessful");
//           const result = {
//             status: "failed",
//             message: "Please check the credentials",
//           };

//           res.json(result);
//         }
//       } else {
//         console.log("All feilds are required");
//         res.json({ status: "failed", message: "All feilds are required" });
//       }
//     } else {
//       console.log("User not found! Please registe");
//       res.json({
//         status: "failed",
//         message: "User not found! Please register",
//       });
//     }
//   };
// }

// module.exports = Register;

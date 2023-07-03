import { UserModel } from "../models/user.Model.js";
import bcrypt from "bcrypt";

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
export default async function register(req, res) {
  try {
    const {
      userId,
      password,
      email,
      firstname,
      lastname,
      mobile,
      address,
      profile,
    } = req.body;

    // check the existing user
    const existUsername = await UserModel.findOne({ userId });
    if(existUsername){
      console.log("user exists");
      return res.status(500).json({message: "User exist"});
    }
    
    // check for existing email
    const existEmail = await UserModel.findOne( {email });


    
// console.log(existEmail)

    if (existEmail || existUsername) {
      res.json({ error: "user existt" });
    } else {
      if (password) {
        
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            const user = new UserModel({
              userId: userId,
              password: hash_password,
              email: email,
              firstName: firstname,
              lastName: lastname,
              mobile: mobile,
              address: address,
              profile: profile
            });
            console.log("Done");
            // return save result as a response
            // user
            //   .save()
            //   .then((result) =>
            //     res.status(201).send({ msg: "User Register Successfully", data:JSON.stringify(result) })
            //   )
            //   .catch((error) => res.status(500).send({ error: "Not saved" }));
            const saved = await user.save();
            if(saved){
              res.status(201).send({ msg: "User Register Successfully", data:JSON.stringify(saved) })
            }
            else{
              res.status(500).send({ error: "Not saved" });
            }
          
         
          }
      }
    } catch (error) {
    throw error;
    return res.status(500).json({error:error,msg:"NOt able to register"});
  }
}


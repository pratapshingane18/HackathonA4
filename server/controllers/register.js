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
      username,
      password,
      email,
      firstname,
      lastname,
      mobile,
      address,
      profile,
    } = req.body;

    // check the existing user
    const existUsername = await UserModel.findOne({ username });
    // check for existing email
   

    const existEmail = await UserModel.findOne( {email });


    const salt = await bcrypt.genSalt(10);


    if (existEmail || existUsername) {
      res.json({ error: "user existt" });
    } else {
      if (password) {
        // bcrypt
        //   .hash(password, salt)
        //   .then((hashedPassword) => {
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            const user = new UserModel({
              username: username,
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
            user
              .save()
              .then((result) =>
                res.status(201).send({ msg: "User Register Successfully" })
              )
              .catch((error) => res.status(500).send({ error: "Not saved",msg: "Not saved" }));
          
         
          }
      }
    } catch (error) {
    throw error;
    return res.status(500).json({error:error,msg:"NOt able to register"});
  }
}


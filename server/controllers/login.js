import {UserModel} from '../models/user.Model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config/config.js';


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export default async function login(req,res){
   
    const { userId, password } = req.body;
  
    try {
        
        UserModel.findOne({ userId })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
  
                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});
  
                        // create jwt token
                        const token = jwt.sign({
                                        Id: user._id,
                                        userId : user.userId
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});
  
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            userId: user.userId,
                            token
                        });                                    
  
                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })
  
    } catch (error) {
        return res.status(500).send({ error});
    }
  }
  
  
  
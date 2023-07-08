import {UserModel} from '../models/user.Model.js'
import jwt from 'jsonwebtoken';
import ENV from '../config/config.js';

/** middleware for verify user */
export default async function verifyUser(req, res, next){
    try {
        
        // const { username } = req.method == "GET" ? req.query : req.body;
        const {token} = req.cookies;
        console.log(token);

        // check the user existance
        const data = await jwt.verify(token,ENV.JWT_SECRET);
        // console.log(data);
        // return res.status(200).send({token: data});
        let exist = await UserModel.findOne({ userId: data.userId });
        
        if(!exist) return res.status(404).send({status:"failed", error : "Can't find User!"});
        // else res.userId = data.userId;
        next();

    } catch (error) {
        return res.status(404).send({status:"failed", error: "Authentication Error"});
    }
}


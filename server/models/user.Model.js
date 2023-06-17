import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [ true, "Please Provide Unique Username "],
        unique: [true, "Username Exict"]
    },

    password:{
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },

    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },

    firstname: {type: string},
    lastname: {type: string},
    mobile:{type:string},
    address: {type: string},
    profile: {type:string}

});

export default mongoose.model.Users || mongoose.model('User',UserSchema);
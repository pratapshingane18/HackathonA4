import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    firstname: {type: string},
    lastname: {type: string},
    userId: {
        type: String,
        required : [ true, "Please Provide Unique Username "],
        unique: [true, "Username Exist"]
    },

    password:{
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },

    email: {
        type: String,
    required: true,
    match: /.+\@+"walchandsangli.ac.in"+/,
    unique: true
    },

    degree:{type:string}, 
    branch: {type: string},
    year:{type:string},

});

export default mongoose.model.Users || mongoose.model('User',UserSchema);
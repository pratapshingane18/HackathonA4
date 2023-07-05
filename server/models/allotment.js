import mongoose from "mongoose";

const Schema = mongoose.Schema

const allotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:'users',
    required: true,
    unique: true,
  },
  courseCode: {
    type: String,
    unique: false,
    required: true,
  },
  cgpa: { 
    type: Number,
    required:true
  },
  preference:{
    type:Number,
    required:true,

  },
  type:{
    type: String,
    enum: ["professional","open"],
    default: "professional"
  },
  elective: {
    type: String,
    required: true,
    enum: ["1", "2"],
    default: "1",
  },
  preferences:{
    type: Array,
    required: true
  }
});

const Allotment = mongoose.model("Allotment", allotSchema);
export default Allotment;

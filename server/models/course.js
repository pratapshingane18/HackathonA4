import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  degree: {
    type: String,
    enum: ["Diploma", "Btech", "Mtech"],
    default: "Btech",
  },
  department: {
    type: String,
    required: [true, "Please provide a password"],
  },

  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
    unique: false,
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
  credits: { 
    type: Number, 
    required: true, 
    default: 2 
},
  capacity: {
    type: Number,
    required: true,
  },
  remaining: {
    type: Number,
    required: true,
    default: () => {
      return this.capacity;
    },
    
  },
  limit: {
    type: Number,
    required: false,
    default: 0,
  },
  last: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    // required: true,
    default: null,
  },
});

const Course = mongoose.model("Courses", courseSchema);
export default Course;

import Course from "../models/course.js";
import { UserModel } from "../models/user.Model.js";
import Allotment from "../models/allotment.js";
import mongoose from "mongoose";


let allot = async (data) => { 


  const session = await mongoose.startSession();


    const user = await UserModel.findOne({ userId: data.userId });


    const check = await Allotment.findOne({userId:user._id});
    if(check) return ({"status":"failed","message":"already alloted"})


  for (let i = data.index; i < data.preferences.length; i++) {
    
    const course = await Course.findOne({ code: data.preferences[i] });
    const remain = course["remaining"];

    if (remain === 0) {
      if (course.limit < data.cgpa) {
        session.startTransaction();
        try{

        
        //Reference user with lowest cgpa in particular subject;
        let Id = course["last"];

        const user2 = await UserModel.findById(Id);
        const scrap = await Allotment.findOne({ userId: Id });
        let change = {
          userId: user2.userId,
          type: scrap.type,
          elective: scrap.elective,
          cgpa: scrap.cgpa,
          preferences: scrap.preferences,
          index: scrap.preference,
        };

        const changePreference = await allot(change);
        if (changePreference.status == "success") {
          const allot_delete = await Allotment.deleteOneById(scrap._id);
          if (allot_delete) {
            try {
              const ticket = new Allotment({
                userId: user._id,
                courseCode: course.code,
                cgpa: data.cgpa,
                preference: i + 1,
                preferences: data.preferences,
                type: data.type,
                elective: data.elective,
              });
              const save = await ticket.save();
              if (save) {
                const mincgpa = await Allotment.findOne({courseCode:course.code}).sort('cgpa');
                const update = await Course.updateOne(course._id, {
                  limit: mincgpa.cgpa,
                  last: mincgpa.userId,
                });
                if (update) {
                  session.commitTransaction();
                  return ({
                    status: "success",
                    message: "Alloted Successfully",
                  });
                                } else {
                                  session.abortTransaction();
                  return ({
                    status: "failed",
                    message:
                      "Alloted Unsuccessfully (Not Updated the course limit)",
                  });
                }
              } else {
                session.abortTransaction();
                return ({
                  status: "failed",
                  message: "Alloted Unsuccessfully (Not saved the allotment)",
                });
              }
            } catch (e) {
              session.abortTransaction();
              return ({ status: "failed" });
            }
          }
        } else {
          return changePreference;
        }
      }catch(e){
        session.abortTransaction();
        return res.json({"status":"failed","message":"Error Detected",error:e})
      }
      
      break;
    }
    } else {
      session.startTransaction();
      try {
        const ticket = new Allotment({
          userId: user._id,
          courseCode: course.code,
          cgpa: data.cgpa,
          preference: i + 1,
          preferences: data.preferences,
          type: data.type,
          elective: data.elective,
        });

        const save = await ticket.save();

        if (save) {
          let updated_data;
          if (course.limit >= data.cgpa || course.limit==0) {
            updated_data = { 
              remaining: remain - 1,
              limit: data.cgpa,
              last: user._id, 
            };
          } else {
            updated_data = {
                remaining: remain - 1,
              };
        }
        const update = await Course.findByIdAndUpdate(course._id, updated_data);
        console.log(update);
          if (update) {
            session.commitTransaction();
            return ({
              status: "success",
              message: "Alloted Successfully",
            });
          } else {
            session.abortTransaction();
            return ({
              status: "failed",
              message: "Alloted Successfully but failed to update capacity",
            });
          }
        } else {
          session.abortTransaction();
          return ({
            status: "failed",
            message: "Failed to Allot",
          });
        }
      } catch (e) {
        session.abortTransaction();
          return (e);
            throw e;
      }
      break;
    }
  }
  session.endSession();
  return ({
    status: "failed",
    message: "the preference is not appropriate",
  });

};

export const allotment = async (req, res) => {
  //   const { userId, type, elective, cqpa, preferences } = req.body;
  const data = req.body;

    if (!Array.isArray(data.preferences) && preferences.length == 0) {
      return res.json({
        status: "failed",
        message: "preference not in array format", 
      });
    }

  data["index"] = 0;
  console.log(data);
  const response = await allot(data);
  console.log(response)
  return res.json(response);
};



export const test = async (req,res) =>{
  const mincgpa = await Allotment.findOne({courseCode:"5CS401"}).sort({"cgpa":1});
  const data = await Allotment.find();
  
  return res.send({mincgpa:mincgpa,data:data});
}
import Course from "../models/course.js";
import { UserModel } from "../models/user.Model.js";
import Allotment from "../models/allotment.js";

let allot = async (data) => { 


    const user = await UserModel.findOne({ userId: data.userId });


    const check = await Allotment.findOne({userId:user._id});
    if(check) return ({"status":"failed","message":"already alloted"})


  for (let i = data.index; i < data.preferences.length; i++) {
    
    const course = await Course.findOne({ code: data.preferences[i] });
    const remain = course["remaining"];

    if (remain === 0) {
      if (course.limit < data.cgpa) {
        // continue;
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
                courseCode: course._id,
                cgpa: data.cgpa,
                preference: i + 1,
                type: data.type,
                elective: data.elective,
              });
              const save = ticket.save();
              if (save) {
                const update = await Course.updateOne(course._id, {
                  limit: data.cgpa,
                  last: user._id,
                });
                if (update) {
                  return ({
                    status: "success",
                    message: "Alloted Successfully",
                  });
                } else {
                  return ({
                    status: "failed",
                    message:
                      "Alloted Unsuccessfully (Not Updated the course limit)",
                  });
                }
              } else {
                return ({
                  status: "failed",
                  message: "Alloted Unsuccessfully (Not saved the allotment)",
                });
              }
            } catch (e) {
              return ({ status: "failed" });
            }
          }
        } else {
          return changePreference;
        }
    break;
    }
    } else {
      try {
        const ticket = new Allotment({
          userId: user._id,
          courseCode: course._id,
          cgpa: data.cgpa,
          preference: i + 1,
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
            return ({
              status: "success",
              message: "Alloted Successfully",
            });
          } else {
            return ({
              status: "partial",
              message: "Alloted Successfully but failed to update capacity",
            });
          }
        } else {
          return ({
            status: "failed",
            message: "Failed to Allot",
          });
        }
      } catch (e) {
          return (e);
            throw e;
      }
      break;
    }
  }
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

import Course from "../models/course";
import { UserModel } from "../models/user.Model";
import Allotment from "../models/allotment";

let allot = async (data) => {
  const user = await UserModel.findOne({ username: userCode });

  for (let i = data.index; i < data.preferences; i++) {
    const course = await Course.findOne({ code: prefer });
    const remain = course["remaining"];

    if (remain === 0) {
      if (limit < data.cgpa) {
        // continue;
        let Id = course["last"];

        const user2 = await UserModel.findById(Id);
        const scrap = await Allotment.findOne({ userId: Id });
        let change = {
          userCode: user2.userId,
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
                  return JSON.stringify({
                    status: "success",
                    message: "Alloted Successfully",
                  });
                } else {
                  return JSON.stringify({
                    status: "failed",
                    message:
                      "Alloted Unsuccessfully (Not Updated the course limit)",
                  });
                }
              } else {
                return JSON.stringify({
                  status: "failed",
                  message: "Alloted Unsuccessfully (Not saved the allotment)",
                });
              }
            } catch (e) {
              return JSON.stringify({ status: "failed" });
            }
          }
        } else {
          return changePreference;
        }
      }
    } else {
      try {
        const ticket = new Allotment({
          userId: user._id,
          courseCode: course._id,
          cgpa: data.cgpa,
          preference: i + 1,
          type: type,
          elective: elective,
        });

        const save = await ticket.save();

        if (save) {
          let update;
          if (limit >= cgpa) {
            update = Course.updateOne(course._id, {
              remaining: remain - 1,
              limit: cgpa,
              last: user._id,
            });
          } else {
            update = Course.updateOne(course._id, {
              remaining: remain - 1,
            });
          }
          if (update) {
            return JSON.stringify({
              status: "success",
              message: "Alloted Successfully",
            });
          } else {
            return JSON.stringify({
              status: "partial",
              message: "Alloted Successfully but failed to update capacity",
            });
          }
        } else {
          return JSON.stringify({
            status: "failed",
            message: "Failed to Allot",
          });
        }
      } catch (e) {
        // throw e;
        return JSON.stringify({
          status: "failed",
          message: "Not able to allot",
        });
      }
    }
  }
  return JSON.stringify({
    status: "failed",
    message: "the preference is not appropriate",
  });
};

export const allotment = async (req, res) => {
  //   const { userCode, type, elective, cqpa, preferences } = req.body;
  const data = req.body;

    if (!Array.isArray(data.preferences) && preferences.length == 0) {
      return res.json({
        status: "failed",
        message: "preference not in array format",
      });
    }

  data["index"] = 0;
  const response = allot(data);
  return res.json(response);
};

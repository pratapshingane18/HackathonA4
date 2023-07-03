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
              await Allotment.deleteOne({ userId: Id })
                .then(() => {
                  const changePreference = allot(change);
                })
                .catch((e) => {
                  return JSON.stringify({ status: "failed" });
                });
            }
          }
        } catch (e) {
          return JSON.stringify({ status: "failed" });
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

  const user = await UserModel.findOne({ username: userCode });
  for (let prefer of preferences) {
    const course = await Course.findOne({ code: prefer });
    const remain = course["remaining"];

    if (remain === 0) {
      if (limit < cgpa) {
        // continue;
      }
    } else {
      try {
        const ticket = new Allotment({
          userId: user._id,
          courseCode: course._id,
          cgpa: cgpa,
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
            return res.json({
              status: "success",
              message: "Alloted Successfully",
            });
          } else {
            return res.json({
              status: "partial",
              message: "Alloted Successfully but failed to update capacity",
            });
          }
        } else {
          return res.json({ status: "failed", message: "Failed to Allot" });
        }
      } catch (e) {
        throw e;
        res.json({ status: "failed" });
      }
    }
  }
};

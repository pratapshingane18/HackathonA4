import Course from "../../models/course.js";
import { UserModel } from "../../models/user.Model.js";
import Allotment from "../../models/allotment.js";
import mongoose from "mongoose";

const allot = async (data) => {
  const session = await mongoose.startSession(); // Start a session

  try {
    session.startTransaction(); // Start the transaction

    // For checking if the user is already allotted
    const user = await UserModel.findOne({ userId: data.userId });
    if (!user) {
      throw new Error("User Not Found");
    }
    const check = await Allotment.findOne({ userId: user._id });
    if (check) {
      throw new Error("Already Allotted");
    }

    // Alloting the subject to the user
    for (let i = data.index; i < data.preferences.length; i++) {
      const course = await Course.findOne({ code: data.preferences[i] });
      const remain = course.remaining;

      if (remain >= 0) {
        if (remain === 0 && course.limit < data.cgpa) {
          // Reference user with the lowest CGPA in a particular subject
          const Id = course.last;
          const user2 = await UserModel.findById(Id);
          const scrap = await Allotment.findOne({ userId: Id });

          const allot_delete = await Allotment.deleteOne({ _id: scrap._id }); // Deleting the allotted preference of the replaced user

          if (allot_delete) {
            // Building a recursion of user to be replaced by the current user
            const change = {
              userId: user2.userId,
              type: scrap.type,
              elective: scrap.elective,
              cgpa: scrap.cgpa,
              preferences: scrap.preferences,
              index: scrap.preference,
            };

            const alloted = await allot(change); // Recursively call allot with changed user

            // If the recursive allotment is successful, continue to the next preference
            // if(!alloted)     continue;
          }
          else{
            throw new Error("Not able to Delete the previous allotment");
          }
        }

        const ticket = await Allotment.create({
          userId: user._id,
          courseCode: course.code,
          cgpa: data.cgpa,
          preference: i + 1,
          preferences: data.preferences,
          type: data.type,
          elective: data.elective,
        });

        if (ticket) {
        //   throw new Error("Failed to Allot");
        console.log(ticket);
        const mincgpa = await Allotment.find(
            {
            courseCode: course.code,
        }
        ).sort("cgpa"); 
        console.log(mincgpa);
        if (mincgpa.length==0) {
            throw new Error("No allotment found");
        }
            const updated_data = {
                remaining: course.capacity - mincgpa.length,
                limit: mincgpa.length > 0 ? mincgpa[0].cgpa : 0,
                last: mincgpa.length > 0 ? mincgpa[0].userId : null, 
            };
            
            const update = await Course.updateOne(
                { code: course.code },
                {$set:updated_data},
                { session }
                );
                console.log(update);
                if (!update) {
                    throw new Error("Failed to update capacity");
                }
            }
            else{
                  throw new Error("Failed to Allot");
            }
            break;
        } 
      }
    

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      message: "Allotted Successfully",
    };
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return {
        status:"failed",
        message: "Allotement Unsuccessful",
        error: JSON.stringify(e)
    }
    throw e;
  }

};

export default allot;

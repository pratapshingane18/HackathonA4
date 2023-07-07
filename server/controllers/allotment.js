import Allotment from "../models/allotment.js";
import allot from "./subjectAllocation.js";


export const allotment = async (req, res) => {
  //   const { userId, type, elective, cqpa, preferences } = req.body;
  const data = req.body;

  if (!Array.isArray(data.preferences) && preferences.length == 0) {
    return res.json({
      status: "failed",
      message: "preference not in array format or is empty",
    });
  }

  data["index"] = 0;
  console.log(data);
  // const response = await allot(data);
  const response = await allot(data);
  console.log(response);
  return res.json(response);
};




export const allData = async (req, res) => {
  // const mincgpa = await Allotment.find();
  const data = await Allotment.find();
  
  return res.send({ status: "success", data: data });
  // return res.send({ mincgpa: mincgpa, data: data });
};

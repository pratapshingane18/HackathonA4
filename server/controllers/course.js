import Course from "../models/course.js";

export const subjectForm = async (req, res) => {
  let data;
  if(req.params.id){
data = await Course.find({code:req.params.id})
  }
  else{
    data = Course.find();
  }

  res.json({ status: "success", msg: "Function is working",data:data });
};

/** POST: http://localhost:8080/api/subject 
 * @param : {
  "courseCode" : "5CS401",
  "courseName" : "Artificial Intelligence",
  "department": "CSE",
"degree": "Btech",
  "year" : 3,
  "elective": '1',
  "credits": 3,
  "capacity" : 10,
  "remaining": 10,
  "limit": 0,
  "last":null
}
*/

export const submission = async (req, res) => {
  const {
    courseCode,
    courseName,
    department,
    degree,
    year,
    elective,
    credits,
    capacity,
    remaining,
    limit,
  } = req.body;

  if (courseCode
     &&courseName
      && department
       && degree
        && year
         && elective 
         && credits
          && capacity
           && remaining
     ){
    try{

        const code = await Course.findOne({code:courseCode});
        if(code){
            return res.json({"status":"failed","message":"Course Code already present","data":code});
        }
        else{
            try{
                const course = new Course({
                    code : courseCode,
  name : courseName,
  department: department,
degree: degree,
  year : year,
  elective: elective,
  credits: credits,
  capacity : capacity,
  remaining: remaining,
  limit: limit
                });
                const save = await course.save();
                if(save){
                    res.json({"status":"success","message":"Course Inserted Successfully"});
                }
                else{
                    res.json({"status":"failed","message":"Data not saved"});
                }

            }catch(e){
                res.json({"status":"failed"});
                throw e;
            }
        }
    }catch(e){ 
        res.json({"status":"failed"});
        throw e;
    }


    
  }else{
    res.json({ status: "failed",message:"Enter all the fields","data":req.body });
  }
    // if (courseCode) return res.json({ status: "success" });
    // else return res.json({ status: "failed" });
};

// export default subjectForm;

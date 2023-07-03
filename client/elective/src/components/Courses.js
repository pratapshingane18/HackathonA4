import React from 'react';

const courses = [
  {
    image: "https://images.pexels.com/photos/34514/spot-runs-start-la.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    courseCode: "5CS404",
    courseName: "Computer Graphics",
    department: "CSE",
    degree: "Btech",
    year: 3,
    type: "professional",
    elective: "1",
    credits: 3
  },
  {
    image: "https://images.pexels.com/photos/68761/pexels-photo-68761.jpeg?auto=compress&cs=tinysrgb&w=600/",
    courseCode: "4EC301",
    courseName: "Digital Electronics",
    department: "ECE",
    degree: "Btech",
    year: 2,
    type: "core",
    elective: "0",
    credits: 4
  },
  {
    image: "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600/",
    courseCode: "6ME506",
    courseName: "Thermodynamics",
    department: "Mechanical",
    degree: "Btech",
    year: 4,
    type: "professional",
    elective: "0",
    credits: 3
  },
  {
    image: "https://images.pexels.com/photos/68761/pexels-photo-68761.jpeg?auto=compress&cs=tinysrgb&w=600/",
    courseCode: "3ME201",
    courseName: "Engineering Mechanics",
    department: "Mechanical",
    degree: "Btech",
    year: 2,
    type: "core",
    elective: "0",
    credits: 4
  },
  {
    image: "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600/",
    courseCode: "5EE403",
    courseName: "Power Systems",
    department: "Electrical",
    degree: "Btech",
    year: 3,
    type: "professional",
    elective: "0",
    credits: 3
  },
  {
    image: "https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=600/",
    courseCode: "6CS601",
    courseName: "Artificial Intelligence",
    department: "CSE",
    degree: "Btech",
    year: 4,
    type: "professional",
    elective: "0",
    credits: 4
  }
];

const Card = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mx-2 my-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img
        src={course.image}
        alt="Course"
        className="rounded-md mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{course.courseCode}</h3>
      <p className="text-sm text-gray-500 mb-1">{course.courseName}</p>
      <div className="flex flex-wrap items-center mb-2">
        <span className="badge bg-blue-500 text-white text-xs px-2 py-1 rounded-md mr-1 mb-1">
          {course.department}
        </span>
        <span className="badge bg-green-500 text-white text-xs px-2 py-1 rounded-md mr-1 mb-1">
          {course.degree}
        </span>
        <span className="badge bg-indigo-500 text-white text-xs px-2 py-1 rounded-md">
          {course.type}
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        <div className="w-full sm:w-1/2">
        <p className="text-sm font-semibold mb-1">Year: {course.year}</p>
          <p className="text-sm font-semibold mb-1">Elective: {course.elective}</p>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-sm font-semibold mb-1">Credits: {course.credits}</p>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course, index) => (
        <Card key={index} course={course} />
      ))}
    </div>
  );
};

export default Courses;


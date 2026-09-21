import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let CourseProvider = createContext();

const CourseContext = ({ children }) => {
  let [allCourses, setAllCourses] = useState(null);

  let findById = (id) => {
    let data = allCourses?.find((el) => {
      return el.id == id;
    });

    return data;
  };

  let getAllCourses = async () => {
    try {
      let res = await axios.get(
        "https://course-management-system-w77d.onrender.com/courses"
      );

      if (res.status == 200 && res.data.length > 0) {
        setAllCourses(res.data);
      }
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  let handleAddCourse = (courseData) => {
    setAllCourses([...allCourses, courseData]);
  };

  let handleUpdateCourse = (courseData) => {
    let updated = allCourses.map((course) => {
      return course.id == courseData.id ? courseData : course;
    });

    setAllCourses(updated);
  };

  let deleteById = async (id) => {
    try {
      let filtered = allCourses?.filter((el) => el.id != id);
      setAllCourses(filtered);

      let res = await axios.delete(
        `https://course-management-system-w77d.onrender.com/courses/${id}`
      );

      console.log(res);
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <CourseProvider.Provider
      value={{
        allCourses,
        handleUpdateCourse,
        handleAddCourse,
        findById,
        deleteById,
      }}
    >
      {children}
    </CourseProvider.Provider>
  );
};

export default CourseContext;

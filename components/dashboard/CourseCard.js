import React from 'react';
import EmptyOverviewComponent from './EmptyOverviewComponent';
import Course from './Course';

const CourseCard = ({
  userCourses, currentView, userData, token,
}) => {
//   const precentage = (id) => {
//     const arr = userModules.filter((e) => (
//       e.id === id
//     ));
//     console.log(arr.length > 0 ? arr[0].prg : 0);
//     return arr.length > 0 ? arr[0].prg : 0;
//   };
  const courses = userCourses.filter((course) => course.categories.includes(currentView));
  return (
    <>
      {courses.length > 0 ? (
        <div className="overview-courses-cards d-flex flex-column">
          {userCourses.map((course) => (
            <Course userData={userData} course={course} token={token} key={course._id} />
          ))}
        </div>
      ) : (
        <EmptyOverviewComponent
          imgURL="assets/images/dashboard/course.png"
          description={`You haven’t  enrolled for any courses in ${currentView} on MPA yet. You can enroll for one in the Courses Section. Remember, you earn $MINORITY tokens when you complete a course.`}
          btnText="Enroll For Your First Course"
        />
      )}
    </>
  );
};

export default CourseCard;

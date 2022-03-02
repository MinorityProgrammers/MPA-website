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
          imgURL="https://s3-alpha-sig.figma.com/img/4ee3/cff9/cf0ef958c8ee474d3c466885d8a7acb2?Expires=1639353600&Signature=TUwGQk6amGy9LVngHcQ9lpNszIIYYHcey9eFrtByZlXq4AYii34O9UV9gD6A12kkvefHyADputgq6M3rDcTSa693YyLBsATyREcjTHgqfSE3vIIzXCpyfxnfMQgt-TWTTyHYiGIO0V-6N0rj7Q0LcOK4Bou5G7gmGnbKSlQ1UGy19IXXOuSwtNaM2E1Yil-4DhsxCGDFN6shDvn6CiMzy~DPjAzOw2iLucONYSLAeHBvb4AkRf6T9f3UXtG3xhXG-RY69Yw2MP-NZFGgXYu0fivIn1CDxZf-PdnaSrvKjjg-vxylIHFfY1UviTIlhbj1WorWh~N1Y3d8SIPe~6FhNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          description={`You haven’t  enrolled for any courses in ${currentView} on MPA yet. You can enroll for one in the Courses Section. Remember, you earn $MINORITY tokens when you complete a course.`}
          btnText="Enroll For Your First Course"
        />
      )}
    </>
  );
};

export default CourseCard;

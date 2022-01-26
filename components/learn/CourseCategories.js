import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Modal } from 'antd';
import LoginModal from '../login-signup/card/index';
import UserCourses from './UserCourses';
import RecommendedCourses from './RecommendedCourses';
import CoursesSkeleton from './CoursesSkeleton';
import FeaturedCourses from './FeaturedCourses';

const CourseCategories = ({ user, enrolledCourses, usersCourses }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [singleCourse, setSingleCourse] = useState({});
  const [courses, setCourses] = useState([]);
  const [totalEnrolledCourse, setTotalEnrolledCourse] = useState(0);
  const [enrolledCourse, setEnrolledCourse] = useState({});
  const [enrolledBtn, setEnrolledBtn] = useState(false);
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get(`${process.env.BASE_URI}/course`).then((res) => {
      setCourses(res.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, [
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null,
  ]);

  const handleEnrolledCourse = () => {
    setDisable(true);
    const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
    fetch(`${process.env.BASE_URI}/learn/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        courseId: singleCourse._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const userCourse = `/courses/${singleCourse._id}`;
          router.push(userCourse);
        }
      });
  };

  const recommendedCourses =
    courses &&
    courses.filter((course) =>
      enrolledCourses.every((eCourse) => course._id !== eCourse.courseId._id)
    );

  const handleCourseInfo = (course) => {
    setSingleCourse(course);
    const usersCoursesInfo = usersCourses?.filter(
      (usersCourse) => usersCourse.courseId._id === course._id
    );
    setTotalEnrolledCourse(usersCoursesInfo);
    const singleEnrolledCourse = enrolledCourses?.filter(
      (eCourse) => eCourse.courseId._id === course._id
    );
    const _singleCourse = singleEnrolledCourse[0];
    const enrolledCourseId = _singleCourse?.courseId;
    if (!enrolledCourseId) {
      return null;
    }
    setEnrolledCourse(enrolledCourseId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onClick = () => {
    setIsActive(!isActive);
  };

  const goToCourseInfo = () => {
    setEnrolledBtn(true);
    const userCourse = `/courses/${singleCourse._id}`;
    router.push(userCourse);
  };

  return (
    <>
      <div className="courses pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 pb-2">
              <div className="search-items pt-5">
                <form className="d-flex" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <div className="input-group-append learnSearch-btn">
                      <input
                        type="text"
                        className="course-search search-input"
                        placeholder="Search Courses"
                      />
                      <button className="courseSearch-btn">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>

                  <div className="options-type ">
                    <select className="learn-filter">
                      <option defaultValue="">Filter search</option>
                      <option value="my_courses">My Courses</option>
                      <option value="web_development">Web Development</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="ui/ui_design">UI/UX Design</option>
                      <option value="entrepreneurship">Entrepreneurship</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
          <div className="learn-items mb-5">
            <ul className="tw-flex tw-flex-row tw-justify-center tw-pt-2">
              <li
                className={`tw-cursor-pointer ${
                  router.pathname.split('/').length !== 3
                    ? 'tw-bg-blue-700 tw-w-36 tw-text-center tw-p-2 tw-mx-2 tw-rounded-md tw-shadow-lg'
                    : 'menu tw-text-center'
                }`}
              >
                <Link href="/learn-page">
                  <p className="learn-item-active hover:tw-text-blue-600">
                    COURSES
                  </p>
                </Link>
              </li>
              {!isActive && user !== null && (
                <li
                  className={`tw-cursor-pointer ${
                    router.pathname.split('/').length === 3
                      ? 'tw-bg-blue-700 tw-w-36 tw-text-center tw-p-2 tw-mx-2 tw-rounded-md tw-shadow-lg'
                      : 'menu tw-text-center'
                  }`}
                >
                  <Link href="/learn-page/certificates">
                    <p className="hover:tw-text-blue-600">MY CERTIFICATES</p>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="courses">
            {loading ? (
              <CoursesSkeleton title="My Courses" />
            ) : enrolledCourses.length > 0 ? (
              <UserCourses enrolledCourses={enrolledCourses} user={user} />
            ) : (
              <div className="mb-5 pb-3">
                <div className="course-category d-flex font-weight-bold">
                  <h1 className="tw-text-blue-900" style={{ fontSize: '30px' }}>
                    My Courses
                  </h1>
                </div>
                <div className="mt-3 courses-info">
                  {user !== null && user !== undefined ? (
                    <h1 className="tw-text-blue-900">
                      No enrolled courses yet
                    </h1>
                  ) : (
                    <h1 className="tw-text-blue-900">
                      Login to view your courses
                    </h1>
                  )}
                </div>
              </div>
            )}

            {loading ? (
              <CoursesSkeleton title="Recommended Courses" />
            ) : (
              recommendedCourses.length > 0 && (
                <RecommendedCourses
                  showModal={showModal}
                  recommendedCourses={recommendedCourses}
                  handleCourseInfo={handleCourseInfo}
                />
              )
            )}

            {loading ? (
              <CoursesSkeleton title="Featured Courses" />
            ) : (
              <FeaturedCourses
                showModal={showModal}
                courses={courses}
                enrolledCourses={enrolledCourses}
                handleCourseInfo={handleCourseInfo}
                enrolledBtn={enrolledBtn}
              />
            )}
          </div>
        </div>

        {/* Modal */}
        <Modal
          title=""
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleOk}
          footer={null}
          closable={false}
          wrapClassName="web"
        >
          <div className="modal-dialog activity-modal" role="document">
            <div className="modal-content course-specific-info">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5
                  className="mt-4 pb-1"
                  id="exampleModalLabel"
                  style={{ fontSize: '25px', fontWeight: '600' }}
                >
                  {singleCourse.name}
                </h5>
                <p className="">{singleCourse.description}</p>
                <div>
                  <ul className="d-flex">
                    <li className="mx-2  mt-3">
                      <p className="user-enroll">
                        <FontAwesomeIcon icon={faUsers} />
                      </p>
                      <p className="font-weight-bold pt-1">
                        {totalEnrolledCourse.length}
                      </p>
                      <span style={{ fontSize: '14px', color: '#545353' }}>
                        Enrolled
                      </span>
                    </li>
                  </ul>
                </div>

                {user !== null && user !== undefined ? (
                  <>
                    {enrolledCourse._id === singleCourse._id ? (
                      <button
                        type="button"
                        onClick={goToCourseInfo}
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn px-5 banner-btn mt-4 pt-2  mb-2"
                      >
                        Learn
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={disable}
                        onClick={handleEnrolledCourse}
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn px-5 banner-btn mt-4 pt-2  mb-2"
                      >
                        Enroll
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onClick}
                    data-dismiss="modal"
                    aria-label="Close"
                    className="btn px-5 banner-btn mt-4 pt-2 font-weight-bold mb-2"
                  >
                    login to access your courses
                  </button>
                )}

                <p
                  className="pb-4 pt-2 modal-center"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Login Modal */}
      {isActive && user == null ? (
        <div className="create_event">
          <div className="create_event-shadow">
            <div className="create_event-container">
              <LoginModal />
            </div>
            <i
              onClick={() => setIsActive(false)}
              className="close_icon fas fa-times close-icon tw-text-white"
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CourseCategories;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewCourses = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('webdev');
  const [allCourses, setAllCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const categories = [
    {
      category: 'webdev',
      tags: ['HTML', 'Web development', 'React', 'Javascript'],
    },
    {
      category: 'blockchain',
      tags: ['Solidity', 'Smart Contract'],
    },
    {
      category: 'ui/ux',
      tags: ['UI/UX', 'Figma'],
    },
    {
      category: 'entrepeneurship',
      tags: ['Entrepeneurship'],
    },
    {
      category: 'all',
      tags: ['HTML', 'Web development', 'React', 'Javascript', 'Solidity', 'Smart Contract', 'UI/UX', 'Figma', 'Entrepeneurship'],
    },
  ];
  useEffect(() => {
    if (props.token !== null) {
      axios
        .get('https://koinstreet-learn-api.herokuapp.com/api/v1/learn/')
        .then((response) => {
          //  add classification for the courses
          const tempAllCoursesData = response.data.data;
          tempAllCoursesData.map((course) => {
            course.categories = [];
            // if courses tag include
            categories.map((category) => {
              course.courseId.tags.some((tag) => category.tags.includes(tag) && course.categories.push(category.category));
            });
          });
          setAllCourses(tempAllCoursesData);
          return axios
            .get(
              'https://koinstreet-learn-api.herokuapp.com/api/v1/learn/userCourses',
              {
                headers: {
                  Authorization: `Bearer ${props.token}`,
                },
              },
            );
        })
        .then((response) => {
          //  add classification for the courses
          const tempUserCoursesData = response.data.data;
          tempUserCoursesData.map((course) => {
            course.categories = [];
            // if courses tag include
            categories.map((category) => {
              course.courseId.tags.some((tag) => category.tags.includes(tag) && course.categories.push(category.category));
            });
          });
          setUserCourses(tempUserCoursesData);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          setUserCourses([]);
          setLoading(true);
        });
    }
  }, []);

  const ProgressBar = (props) => {
    let value = props.completionRate;
    if (typeof value === 'number' || (typeof value === 'String')) {
      value = props.completionRate;
    } else { value = 0; }
    return (
      <div className="overview-wrapper">
        <div className="overview-barContainer">
          <div className="overview-filler" style={{ width: `${value}%` }} />
        </div>
      </div>
    );
  };

  const CourseCard = () => {
    const courses = userCourses.filter((course) => course.categories.includes(currentView));

    return (
      <>

        {
          courses.length > 0
            ? (
              <div className="overview-courses-cards d-flex flex-column">
                {courses.map((course) => (

                  <div key={course?.createdAt} className="overview-course-card d-flex flex-row justify-content-between">
                    {/* First and Second */}
                    <div className="d-flex flex-row" style={{ width: '40%' }}>
                      {/* First Column - logo */}
                      <div className="overview-career-card-image d-flex justify-content-center align-items-center" style={{ paddingRight: '10px', width: '30%' }}>
                        <img alt="company's logo" src={course?.courseId.image} />
                      </div>
                      {/* Second Column - Title + Description */}
                      <div className="overview-course-card-info d-flex flex-column" style={{ width: '70%' }}>
                        <p className="overview-course-card-info-title">{course?.courseId?.name}</p>
                        <p className="overview-course-card-description">{course?.courseId?.description}</p>
                      </div>
                    </div>
                    {/* Third Column */}
                    <div className="d-flex flex-column justify-content-center" style={{ width: '20%', marginRight: '2%' }}>
                      <p style={{ fontSize: '12px', color: 'black', textAlign: 'center' }}>
                        {course.completionRate}
                        % Completed
                        {' '}
                      </p>
                      <ProgressBar completionRate={parseInt(course?.completionRate, 10)} />
                    </div>
                    {/* Fourth and Fifth Column */}
                    <div className="d-flex flex-row" style={{ width: '40%' }}>
                      {/* Fourth Column */}
                      <div className="overview-course-currency d-flex justify-content-center flex-column align-items-center" style={{ marginRight: '2%' }}>
                        <p style={{ fontSize: '12px' }}>$MINORITY Earned</p>
                        <p style={{ fontSize: '16px', fontWeight: '700' }}>
                          $
                          {parseInt(course.completionRate, 10) !== 100 ? 0 : course?.courseId?.earn}
                        </p>
                      </div>
                      {/* Fifth Column */}
                      <div className="d-flex justify-content-center align-items-center ">
                        <a href="#" target="_blank">
                          <button className="btn btn-primary overview-course-viewcourse-btn" style={{ fontSize: '0.7rem', background: '#151371' }}>
                            View Course
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
            : (
              <EmptyOverviewComponent
                imgURL="https://s3-alpha-sig.figma.com/img/4ee3/cff9/cf0ef958c8ee474d3c466885d8a7acb2?Expires=1639353600&Signature=TUwGQk6amGy9LVngHcQ9lpNszIIYYHcey9eFrtByZlXq4AYii34O9UV9gD6A12kkvefHyADputgq6M3rDcTSa693YyLBsATyREcjTHgqfSE3vIIzXCpyfxnfMQgt-TWTTyHYiGIO0V-6N0rj7Q0LcOK4Bou5G7gmGnbKSlQ1UGy19IXXOuSwtNaM2E1Yil-4DhsxCGDFN6shDvn6CiMzy~DPjAzOw2iLucONYSLAeHBvb4AkRf6T9f3UXtG3xhXG-RY69Yw2MP-NZFGgXYu0fivIn1CDxZf-PdnaSrvKjjg-vxylIHFfY1UviTIlhbj1WorWh~N1Y3d8SIPe~6FhNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                description={`You haven’t  enrolled for any courses in ${currentView} on MPA yet. You can enroll for one in the Courses Section. Remember, you earn $MINORITY tokens when you complete a course.`}
                btnText="Enroll For Your First Course"
                btnFunction={() => { setLoading(!loading); }}
              />
            )
        }
      </>
    );
  };

  return (
    // this component will have 2 rows
    // - first row: Course + buttons
    // - second row: 3 courses for each page selected
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '15%', marginBottom: '2%' }}>
        <div>
          <p style={{
            fontSize: '18px', fontWeight: '700', color: 'black', margin: 0,
          }}
          >
            Courses
          </p>
        </div>
        <div className="overview-courses-list d-flex flex-row justify-content-between align-items-center" style={{ maxWidth: '60%', overflowY: 'hidden' }}>
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div
              className={currentView === 'webdev' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('webdev'); }}
              style={{ marginRight: '2%' }}
            >
              <p onClick={() => { setCurrentView('webdev'); }}>Web Dev</p>
            </div>
            <div className={currentView === 'blockchain' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('blockchain'); }}>
              <p onClick={() => { setCurrentView('blockchain'); }}>Blockchain</p>
            </div>
            <div
              className={currentView === 'ui/ux' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('ui/ux'); }}
            >
              <p onClick={() => { setCurrentView('ui/ux'); }}>UI/UX Design</p>
            </div>
            <div
              className={currentView === 'entrepeneurship' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('entrepeneurship'); }}
            >
              <p onClick={() => { setCurrentView('entrepeneurship'); }}>Entrepeneurship</p>
            </div>
            <div
              className={currentView === 'all' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('all'); }}
            >
              <p onClick={() => { setCurrentView('all'); }}>View all Courses</p>
            </div>
          </div>

        </div>
      </div>
      {/* Second row */}
      {loading
        ? (
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/4ee3/cff9/cf0ef958c8ee474d3c466885d8a7acb2?Expires=1638144000&Signature=Hx2O6JatkBlAG0Wm5bk50yhqB9mRDEKvIGMTg6McZouzxm7lEI7bFyXuuggJECaV6up1yFLf99jvfeUJAoOKgYZriW6XvBzfkVooV5h1KI82p5hOFABst8NLDLKU6ChjUx8hbDorzGTFj77oN7KzekqomQteVjwAnx9qXUIRQSl2p0TCUGrrWvTvPnhB1piU~An6M3nmKlNYJzpsl9O30kRSiaaYl2XGPDQi9cSj8J8LBeJgat~oM7LrcCGCHZ4smIJu6zjOuL9pcsO71P-mCCFjLeQYvz6uNC~LGyRXBIh4HIIlDh67It4yKd49NaCOVhJ-WFZUgAVDt3ytdidWhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description={`You haven’t  enrolled for any courses in ${currentView} on MPA yet. You can enroll for one in the Courses Section. Remember, you earn $MINORITY tokens when you complete a course.`}
            btnText="Enroll For Your First Course"
            btnFunction={() => { setLoading(!loading); }}
          />
        )
        : <CourseCard />}

    </div>
  );
};

export default OverviewCourses;

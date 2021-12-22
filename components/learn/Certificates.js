import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginModal from '../login-signup/card/index';
import CoursesSkeleton from './CoursesSkeleton';

const CourseCategories = function ({ user, certificates, loading }) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
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
                    <input type="text" className="course-search search-input" placeholder="What course are you looking for?" />
                    <div className="input-group-append learnSearch-btn">
                      <button className="btn bg-white" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
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
              <li className={`tw-cursor-pointer ${router.pathname.split('/').length !== 3 ? 'tw-bg-blue-700 tw-w-36 tw-text-center tw-p-2 tw-mx-2 tw-rounded-md tw-shadow-lg' : 'menu tw-text-center'}`}>
                <Link href="/learn-page">
                  <p className="learn-item-active hover:tw-text-blue-600">
                    COURSES
                  </p>
                </Link>
              </li>
              <li className={`tw-cursor-pointer ${router.pathname.split('/').length === 3 ? 'tw-bg-blue-700 tw-w-36 tw-text-center tw-p-2 tw-mx-2 tw-rounded-md tw-shadow-lg' : 'menu tw-text-center'}`}>
                <Link href="/learn-page/certificates">
                  <p className="hover:tw-text-blue-600">MY CERTIFICATES</p>
                </Link>
              </li>
              {/* <li className="pl-md-5">
                <Link href="#">
                  <a>BLOCKCHAIN</a>
                </Link>
              </li>
              <li className="pl-md-5">
                <Link href="#">
                  <a>UI / UX DESIGN</a>
                </Link>
              </li>
              <li className="pl-md-5">
                <Link href="#">
                  <a>ENTREPRENEURSHIP</a>
                </Link>
              </li> */}
            </ul>
          </div>

          <div>

            {
              loading
                ? (
                  <CoursesSkeleton title="My Certificates" />

                )
                : certificates.length > 0
                  ? (
                    <div className="tw-flex tw-flex-row tw-flex-wrap">
                      {certificates.map((each) => (
                        <div className="courses tw-cursor-pointer hover:tw-shadow-xl tw-w-80 tw-h-44 tw-mx-4" key={each._id}>
                          <a href={each.ipfsURL} target="_blank" rel="noreferrer"><img className="tw-rounded-md" src={each.ipfsURL} alt="certificate" /></a>
                        </div>
                      ))}

                    </div>
                  )
                  : (
                    <div className="mb-5 pb-3">
                      <div className="course-category d-flex font-weight-bold">
                        <h1 className="tw-text-blue-900" style={{ fontSize: '30px' }}>My Certificates</h1>
                      </div>
                      <div className="mt-3 courses-info">
                        {user !== null && user !== undefined
                          ? <h1 className="tw-text-blue-900">You do not have any certificate</h1>
                          : <h1 className="tw-text-blue-900">Login to view your certificates</h1>}
                      </div>
                    </div>
                  )
            }
          </div>

        </div>

      </div>

      {/* Login Modal */}
      {isActive && user == null ? (
        <div className="create_event">
          <div className="create_event-shadow">
            <div className="create_event-container">
              <LoginModal />
            </div>
            <i onClick={() => setIsActive(false)} className="close_icon fas fa-times close-icon tw-text-white" />
          </div>
        </div>
      ) : ''}
    </>
  );
};

export default CourseCategories;

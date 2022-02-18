import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Projects({
  isLoggedIn, ownsProfile, projectCards, proEditMode,
  setProEditMode, removePro, proAddMode, ProDateInput,
  proTitleInput, setProTitleInput, setProIMG, setProDateInput,
  handleProImgUpload, uploadedProImg, setProjectRole,
  setProAddMode, ProjectRole, clearProAdd, completeProAdd, setProject, project,
}) {
  // const [swiper, setSwiper] = useState(null);
  const [show, setShow] = useState(false);
  //   const [currentIndex, setCurrentIndex] = useState('');
  //   const [total, setTotal] = useState('');
  // const speed = 1000;
  // const goNext = () => {
  //   if (swiper !== null) {
  //     swiper.slideNext(speed);
  //   }
  // };

  // const goPrev = () => {
  //   if (swiper !== null) {
  //     swiper.slidePrev(speed);
  //   }
  // };
  // const params = {
  //   slidesPerView: 3,
  //   loop: projectCards.length > 3,
  //   speed: 1000,
  //   // freeMode: true,
  //   spaceBetween: 30,
  //   rebuildOnUpdate: true,
  //   getSwiper: setSwiper,
  //   // autoplay: {
  //   //   delay: 3000,
  //   //   disableOnInteraction: true,
  //   // },
  //   pagination: {
  //     el: '.swiper-pagination .fraction-p',
  //     type: 'fraction',
  //   },
  //   // Responsive breakpoints
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     640: {
  //       slidesPerView: 2,
  //     },
  //     320: {
  //       slidesPerView: 1,
  //     },
  //   },

  // };
  const conditionalInfinite = {
    dots: false,
    speed: 2000,
    slidesToShow: 2,
    infinite: projectCards > 2,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          infinite: projectCards > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: projectCards >= 1,
        },
      },
    ],
  };
  const yyyymmdd = (date) => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };
  return (
    <div className="profileTopSection tw-relative tw-py-10 tw-z-10">
      <section className="tw-w-11/12 tw-mx-auto tw-rounded-xl tw-shadow-md topSection tw-py-10 tw-p-6 lg:tw-p-3 tw-flex tw-flex-col tw-justify-start">
        <div className="tw-w-full tw-flex tw-justify-between tw-flex-row tw-mb-10">
          <div className="tw-flex">
            <div className="tw-m-2 tw-text-3xl lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-white">Projects</div>
            {isLoggedIn && ownsProfile && !!projectCards?.length && (
              <img
                onClick={() => {
                  setProEditMode(!proEditMode);
                }}
                className="tw-w-8 tw-h-8 tw-mt-2 tw-cursor-pointer"
                src="/assets/new/edit.png"
                alt="edit icon"
              />
            )}
          </div>
          {isLoggedIn && ownsProfile && !!projectCards?.length && (
          <div className="tw-flex tw-align-center">
            <h2
              onClick={() => setShow(!show)}
              className="tw-m-2 tw-text-xl tw-cursor-pointer lg:tw-text-xl tw-font-medium tw-text-left tw-px-10 tw-text-white show-full-projects"
            >
              See
              {' '}
              {!show && 'all'}
              {show && 'less'}

            </h2>
          </div>
          )}
        </div>

        <div className="tw-m-4 lg:tw-m-4 lg:tw-px-4 tw-my-1 tw-w-full tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-row tw-flex-wrap lg:tw-w-col container">
            {projectCards?.length ? !show ? (

              <>
                <Slider {...conditionalInfinite}>
                  {projectCards.map(
                    (projectItem) => (
                      <div className="profile__project-card" key={projectItem._id}>
                        <img src={projectItem.image} alt={projectItem.link} />
                        <div className="row">
                          <div className="detail col-6">
                            <h2>{projectItem.title}</h2>
                            <h2>{projectItem.role}</h2>
                            <h3>{ typeof projectItem.date === 'string' ? projectItem.date.split('T')[0] : yyyymmdd(projectItem.date) }</h3>
                            {proEditMode === true && (
                            <span
                              className="tw-my-4 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                              onClick={() => removePro(projectItem?._id)}
                            >
                              Remove
                            </span>
                            )}
                          </div>
                          <div className="view-btn col-6">
                            <a target="_blank" href={projectItem.link} rel="noreferrer">View project</a>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </Slider>
                {/* <div className="profile-projects-controllers">
                  <div>
                    <img onClick={goPrev} style={{ transform: 'rotate(180deg)' }} src="/assets/images/arrow-righ-circle.svg" alt="control" />
                    <p />
                    <img onClick={goNext} src="/assets/images/arrow-righ-circle.svg" alt="control" />
                  </div>
                </div> */}
              </>

            ) : (
              projectCards.map((edu) => (

                <div
                  key={edu._id}
                  className="tw-flex tw-py-5 tw-mx-2 lg:tw-mx-2 tw-w-full lg:tw-w-full  tw-rounded-md tw-cursor-pointer"
                >
                  <div className="tw-flex tw-flex-row tw-w-full">
                    <div className="tw-rounded-md tw-flex tw-flex-col tw-mx-4">
                      <a href={edu?.link} target="_blank" rel="noreferrer">
                        <img
                          className="tw-w-40 tw-h-40 tw-mx-6 tw-rounded-md"
                          src={edu.image}
                          alt={edu.title}
                        />
                      </a>
                      {proEditMode === true && (
                      <span
                        className="tw-my-4 tw-mx-6 tw-text-xs tw-font-bold tw-text-red-500 tw-cursor-pointer hover:tw-text-gray-500"
                        onClick={() => removePro(edu?._id)}
                      >
                        Remove
                      </span>
                      )}
                    </div>
                    <div className="tw-flex tw-flex-col">
                      <p className="tw-text-white tw-text-2xl">{edu.title}</p>
                      <div className="tw-flex tw-flex-row tw-my-2">
                        <p className="tw-text-white">{edu?.role}</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-my-2">
                        <p className="tw-text-white">
                          {edu?.date.split('T')[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <span className="note tw-text-white tw-m-4 tw" style={{ cursor: 'default' }}>
                No Projects yet
              </span>
            )}
          </div>
          {isLoggedIn
                  && ownsProfile
                  && (!projectCards?.length || !proEditMode) && (
                    <form
                      id="add-Edu-fields"
                      className="add-Edu-edu tw-flex lg:tw-flex-col tw-items-center tw-w-full tw-my-8 lg:tw-m-2"
                    >
                      {proAddMode && (
                      <div className="ee-fields tw-flex tw-flex-col tw-items-start tw-mb-2">
                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Project Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Project Name"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={proTitleInput}
                            onChange={(e) => setProTitleInput(e.target.value)}
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Project Date</label>
                          <DatePicker
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            minDate={new Date(ProDateInput)}
                            name="gradDate"
                            value={
                                ProDateInput === '' ? 'Project Date' : ProDateInput
                              }
                            selected={ProDateInput}
                            onChange={(date) => {
                              setProDateInput(date);
                            }}
                            dateFormat="MM/dd/yyyy"
                            placeholder="Project Date"
                            autoComplete="false"
                            required
                          />
                        </div>

                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Role</label>

                          <input
                            type="text"
                            placeholder="Role"
                            name="link"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={ProjectRole}
                            onChange={(e) => setProjectRole(e.target.value)}
                          />
                        </div>
                        <div className="tw-flex tw-flex-col tw-my-2 tw-w-10/12">
                          <label className="tw-text-white tw-my-1">Link</label>
                          <input
                            type="text"
                            placeholder="Project Link"
                            name="link"
                            className="topSection tw-p-4 tw-rounded-md focus:tw-outline-none tw-bg-gray-600 tw-text-white"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                          />
                        </div>

                      </div>
                      )}
                      <div className="addImg tw-mr-4 tw-cursor-pointer">
                        {proAddMode && (
                          <label
                            htmlFor="upload-Edu-image"
                            className="tw-m-0 tw-w-full"
                          >
                            <input
                              type="file"
                              name="image"
                              id="upload-Edu-image"
                              onChange={(e) => {
                                handleProImgUpload(e.target.files[0]);
                                setProIMG(e.target.files[0]);
                              }}
                            />

                            <img
                              src={
                                uploadedProImg
                                || '/assets/images/profile/addEntry.png'
                              }
                              alt="add item"
                              className="tw-w-full"
                            />
                            <p className="tw-text-sm tw-text-gray-500 tw-my-3">
                              add Project cover
                            </p>
                          </label>
                        )}
                        {proAddMode && (
                        <div className="tw-flex tw-flex-row tw-justify-around tw-my-4">
                          <div
                            className="md:tw-w-11/12 md:tw-my-2 mintBTN tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2"
                            onClick={() => completeProAdd()}
                          >
                            <p className="tw-text-center tw-text-white">Add</p>
                          </div>
                          <div
                            className="tw-bg-red-500 hover:tw-bg-red-600 tw-outline-none focus:tw-ring-offset-0 focus:tw-border-opacity-0 tw-ring-offset-0 tw-transition tw-ease-in-out tw-delay-150 duration-300 tw-w-28 tw-p-3 tw-rounded-3xl tw-h-12 tw-flex tw-flex-row tw-justify-center tw-mx-2 tw-text-white"
                            onClick={() => clearProAdd()}
                          >
                            <p className="tw-text-center tw-text-white">Cancel</p>
                          </div>
                        </div>
                        )}
                      </div>
                    </form>
          )}
          {isLoggedIn && ownsProfile && (
            <div
              className="tw-my-8 tw-flex tw-flex-row tw-justify-evenly tw-rounded-md tw-cursor-pointer hover:tw-bg-gray-800 tw-w-1/4 lg:tw-w-1/2 topSection"
              onClick={() => setProAddMode(!proAddMode)}
            >
              <img className="tw-w-10 tw-h-10" src="/assets/images/profile/add.png" alt="add" />
              <p className="tw-text-gray-500 tw-mt-2">Add Project</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Projects;

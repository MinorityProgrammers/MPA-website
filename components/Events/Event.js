// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable max-len */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import CreateEvent from "../CreateEvent";
import EventCard from "./EventCard";
import EventCardFeatured from "./EventCardFeatured";
import { useRouter } from "next/router";
import EventCardSkeleton from "./EventCardSkeleton";
import EventCardFeaturedSkeleton from "./EventCardFeaturedSkeleton";
import EventMoreInfo from "./EventMoreInfo";
import Card from "../login-signup/card/index";
import EventCategoryFilterButton from "./EventCategoryFilterButton";
import PastEventCard from "./PastEventCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const eventdata = {
  step: 0,
  EventPicture: "",
  eventName: "",
  catName: "",
  catNameOptions: "",
  EventDescription: "",
  eventLink: "",
  Virtual: "",
  VirtualOptions: "",
  eventTime: "",
  eventDate: "",
  time: "",
  isError: false,
};

const ctgButtons = [
  {
    category: "Lectures/Webinars",
    description: "On The Hottest Topic",
    activebtn: false,
  },
  {
    category: "Workshops/Conferences",
    description: "Hands on Training",
    activebtn: false,
  },
  {
    category: "Hackathons",
    description: "Compete For Prizes",
    activebtn: false,
  },
  {
    category: "Incubators/Accelerators",
    description: "Start Your Tech Business",
    activebtn: false,
  },
];

const Event = (props) => {
  const [Swiperdata, setSwiperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [AllEvent, setAllEvent] = useState([]);
  const [PastEvent, setPastEvent] = useState([]);
  const [moreInfoData, setMoreInfoData] = useState([]);
  const [allsavedEvents, setAllSavedEvents] = useState([]);
  const [userSavedEvents, setUserSavedEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [createEventData, setCreateEventData] = useState(eventdata);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showMyEvent, setShowMyEvent] = useState(false);
  const [eventDateTime, setEventDateTime] = useState("");
  const [myEvent, setMyEvent] = useState(false);
  const [categoryButtons, setCategoryButtons] = useState(ctgButtons);
  const [categoryButtonsActiveIndex, setCategoryButtonsActiveIndex] =
    useState(-1);
  const [categoryFilterLoading, setCategoryFilterLoading] = useState(false);
  const [filter, setFilters] = useState({
    event_time: "",
    catName: "",
    Virtual: "",
    Featured: "",
  });
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, setSliderRef] = useState(null);
  const { userData, active, clickRegister, setClickRegister, token } = props;

  const options = [
    {
      label: "Event Location",
      options: [
        { label: "Virtual Event", value: "Virtual Event" },
        { label: "In-person Event", value: "In-person Event" },
      ],
    },
    {
      label: "happening in",
      options: [
        { label: "Week", value: "Week" },
        { label: "Month", value: "Month" },
      ],
    },
    {
      label: "Cost",
      options: [
        { label: "Free", value: "Free" },
        { label: "Paid", value: "Paid" },
      ],
    },
  ];

  const router = useRouter();

  useEffect(() => {
    Promise.all([
      getEvents(),
      getSavedEvents(),
      findSavedEvents(),
      getUserSavedEvents(),
    ])
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.error(err));
  }, []);

  const getEvents = async () => {
    const dateNow = Date.now();
    await axios.get(`${process.env.BASE_URI}/event`).then((response) => {
      setAllEvent(() =>
        response.data.data.filter((event) => {
          const eventTime = new Date(event.time).getTime();
          if (
            dateNow < eventTime &&
            event.approved !== null &&
            event.approved === true
          )
            return event;
        })
      );

      setSwiperData(() =>
        response.data.data.filter((event) => {
          const eventTime = new Date(event.time).getTime();
          if (event.approved !== null && event.approved === true) {
            return event.Featured === true;
          }
        })
      );

      setPastEvent(() =>
        response.data.data
          .filter((event) => {
            const eventTime = new Date(event.time).getTime();
            if (
              dateNow > eventTime &&
              event.approved !== null &&
              event.approved === true
            ) {
              return event;
            }
          })
          .sort((a, b) => new Date(a.time) - new Date(b.time))
      );
    });
  };

  const getSavedEvents = async () => {
    const token = window.localStorage.getItem("jwtToken");

    return axios
      .get(`${process.env.BASE_URI}/saveEvent/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setAllSavedEvents(res.data.data));
  };

  const getUserSavedEvents = async () => {
    const token = window.localStorage.getItem("jwtToken");

    if (token != null) {
      return axios
        .get(`${process.env.BASE_URI}/saveEvent/userEvents`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUserEvents(res.data.data);
          setUserSavedEvents(res.data.data);
        });
    }
  };

  const setEventState = (response) => {
    const dateNow = Date.now();
    setAllEvent(() =>
      response?.data?.filter((event) => {
        const eventTime = new Date(event.time).getTime();
        if (
          dateNow < eventTime &&
          event.approved !== null &&
          event.approved === true
        ) {
          return event;
        }
      })
    );

    setSwiperData(() =>
      response?.data?.filter((event) => {
        const eventTime = new Date(event.time).getTime();
        if (event.approved !== null && event.approved === true) {
          return event.Featured;
        }
      })
    );
    setPastEvent(() =>
      response?.data
        ?.filter((event) => {
          const eventTime = new Date(event.time).getTime();
          if (
            dateNow > eventTime &&
            event.approved !== null &&
            event.approved === true
          ) {
            return event;
          }
        })
        .sort((a, b) => new Date(a.time) - new Date(b.time))
    );
    setCategoryFilterLoading(false);
  };

  const filterEvents = () => {
    setCategoryFilterLoading(true);
    fetch(
      `${process.env.BASE_URI}/event/?Virtual=${filter.Virtual}&event_time=${filter.event_time}&catName=${filter.catName}`
    )
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setEventState(response);
        }, 1500);
      });
  };

  const findSavedEvents = () => {
    if (userData !== null) {
      userEvents?.map((all) => {
        if (all.event_id !== null) {
          if (
            all.user_id._id === userData._id &&
            all.event_id.approved !== null &&
            all.event_id.approved === true
          ) {
            setUserSavedEvents((current) => [...current, all]);
          }
        }
      });
      setUserSavedEvents((current) =>
        current.filter((event) => event.user_id._id === userData._id)
      );
      return userSavedEvents;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.childNodes[0].value) {
      const searchValue = e.target.childNodes[0].value;
      setAllEvent((current) =>
        [...current].filter((event) =>
          event.eventName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setPastEvent((current) =>
        [...current].filter((event) =>
          event.eventName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setSwiperData((current) =>
        [...current].filter((event) =>
          event.eventName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      filterEvents();
    }
  };

  const handleMoreInfo = (item) => {
    if (showCreateEvent === true) {
      if (showMoreInfo === true) {
        setMoreInfoData([]);
        setShowMoreInfo(false);
      } else {
        setMoreInfoData(createEventData);
        setShowMoreInfo(true);
      }
    } else if (showMoreInfo === false) {
      setMoreInfoData(item);
      setShowMoreInfo(true);
    } else {
      setMoreInfoData([]);
      setShowMoreInfo(false);
    }
  };

  const handleCreateEvent = () => {
    if (showCreateEvent === false) {
      showCreateEvent(true);
    } else {
      showCreateEvent(false);
      const changedState = {
        ...createEventData,
        step: 0,
        EventPicture: "",
      };
      setCreateEventData(changedState);
    }
  };

  const handleError = (input) => {
    let changedState = { ...createEventData };
    if (input === "isError") {
      if (createEventData.isError === false) {
        changedState = { ...createEventData, [input]: true };
      } else {
        changedState = { ...createEventData, [input]: false };
      }
      setCreateEventData(changedState);
    }
  };

  const conditionalInfinite = {
    arrows: false,
    dots: false,
    speed: 2000,
    slidesToShow: 2,
    infinite: Swiperdata?.length > 2,
    autoplay: true,
    slidesToScroll: 1,
    className: "profile__projects-slider",
    afterChange: (current) => setCurrentIndex(current),
    responsive: [
      {
        breakpoint: 1755,
        settings: {
          slidesToShow: 2,
          infinite: Swiperdata?.length > 2,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 1,
          infinite: Swiperdata?.length > 1,
        },
      },
    ],
  };

  const handleEventDateTime = (inputDateTime) => {
    setEventDateTime(inputDateTime.toISOString());
    const changedState = [...createEventData];
    changedState[0].time = inputDateTime.toISOString();
    setCreateEventData(changedState);
  };

  const handleCreateEventData = (input) => (e) => {
    if (input === "step") {
      const { step } = createEventData;
      const changedState = {
        ...createEventData,
        [input]: step + 1,
      };
      setCreateEventData(changedState);
      if (step === 2) {
        handleMoreInfo();
      }
    } else if (input === "catName" || input === "Virtual") {
      if (input === "eventDate") {
        if (createEventData?.eventTime?.length === 0) {
          const changedState = {
            ...createEventData,
            [input]: e.target.value,
            time: `${e.target.value}T00:00:00.000Z`,
          };
          setCreateEventData(changedState);
        } else {
          const changedState = {
            ...createEventData,
            [input]: e.target.value,
            time: `${e.target.value}T${createEventData?.eventTime}:00.000Z`,
          };
          createEventData(changedState);
        }
      } else if (input === "eventTime") {
        if (createEventData.eventDate?.length === 0) {
          const changedState = {
            ...createEventData,
            [input]: e.target.value,
            time: `2021-01-01'T${e.target.value}:00.000Z`,
          };
          setCreateEventData(changedState);
        }
      }
    } else {
      const changedState = {
        ...createEventData,
        [input]: e.target.value,
      };
      setCreateEventData(changedState);
    }
  };

  const handleCreateEventPicture = (input) => {
    const changedState = {
      ...createEventData,
      EventPicture: input,
    };
    setCreateEventData(changedState);
  };

  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      padding: 10,
      cursor: "pointer",
      backgroundColor: "var(--secondary-high-contrast)",
      zIndex: "2",
    }),
    input: (provided) => ({
      ...provided,
      padding: 0,
      height: 50,
      minHeight: 50,
    }),
    container: (provided) => ({
      ...provided,
      height: 50,
      minHeight: 50,
      width: 200,
      minWidth: 200,

      "@media only screen and (max-width: 666px)": {
        width: "80%",
        minWidth: "80%",
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0,
      height: 50,
      minHeight: 50,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: 50,
      minHeight: 50,
    }),
    control: (base) => ({
      ...base,
      backgroundColor: "var(--secondary-high-contrast)",
      "&:hover": { borderColor: "#6938EF" },
      border: "1px solid var(--secondary-accent)",
      boxShadow: "none",
      padding: 0,
      height: 50,
      minHeight: 50,
      borderRadius: "50px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#6938EF" : "none",
      "&:hover": {
        backgroundColor: "#6938EF",
        transition: "all 0.3s ease-in",
      },
      "&:focused": { backgroundColor: "#6938EF", color: "#6938EF" },
      color: "#fff",
      cursor: "pointer",
      padding: 10,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "12px",
      color: "#fff",
      fontWeight: 500,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    groupHeading: (base) => ({
      ...base,
      fontSize: "1.02em",
      color: "#fff",
      fontWeight: 700,
    }),
  };

  const fetchEvents = async () => {
    const dateNow = Date.now();
    const response = await axios.get(`${process.env.BASE_URI}/event`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    setSwiperData(() =>
      response.data.data.filter((event) => {
        const eventTime = new Date(event.time).getTime();
        if (
          dateNow < eventTime &&
          event.approved !== null &&
          event.approved === true
        ) {
          return event.Featured === true;
        }
      })
    );
    setAllEvent(() =>
      response.data.data.filter((event) => {
        const eventTime = new Date(event.time).getTime();
        if (
          dateNow < eventTime &&
          event.approved !== null &&
          event.approved === true
        ) {
          return event;
        }
      })
    );
    setPastEvent(() =>
      response.data.data.filter((event) => {
        const eventTime = new Date(event.time).getTime();
        if (
          dateNow > eventTime &&
          event.approved !== null &&
          event.approved === true
        ) {
          return event;
        }
      })
    );
  };

  const onChangeInput = async (value) => {
    if ((await value) !== null) {
      if (value.value === "Virtual Event") {
        setFilters((current) => [{ ...current.filter, Virtual: true }]);
      }
      if (value.value === "In-person Event") {
        setFilters((current) => [{ ...current.filter, Virtual: false }]);
      }
      if (value.value === "Week") {
        setFilters((current) => [{ ...current.filter, event_time: "week" }]);
      }
      if (value.value === "Month") {
        setFilters((current) => [{ ...current.filter, event_time: "month" }]);
      }
    } else {
      fetchEvents();
    }
    filterEvents();
  };

  const categoryFilter = async (idx) => {
    setCategoryFilterLoading(true);
    setCategoryButtonsActiveIndex(idx);

    if (idx === categoryButtonsActiveIndex) {
      setCategoryButtonsActiveIndex(-1);
    }
    if (idx !== -1) {
      if (idx === 0) {
        if (categories.includes("Webinar") || categories.includes("Lecture")) {
          setCategories((current) =>
            [...current].filter(
              (category) => category !== "Webinar" && category !== "Lecture"
            )
          );
        }
      } else {
        setCategories((current) => [...current, "Webinar", "Lecture"]);
      }

      setFilters((current) => [{ ...current, catName: categories }]);
      if (idx === 1) {
        if (
          categories.includes("Workshop") ||
          categories.includes("Conference")
        ) {
          setCategories((current) =>
            [...current].filter((category) => {
              category !== "Workshop" && category !== "Conference";
            })
          );
        } else {
          setCategories((current) => [...current, "Workshop", "Conference"]);
        }
      }
      setFilters((current) => [{ ...current, catName: categories }]);
      if (idx === 2) {
        if (categories.includes("Hackathon")) {
          setCategories((current) =>
            [...current].filter((category) => category !== "Hackathon")
          );
        } else {
          setCategories((current) => [...current, "Hackathon"]);
        }
      }
      setFilters((current) => [{ ...current, catName: categories }]);

      if (idx === 3) {
        if (
          categories.includes("Incubator") ||
          categories.includes("Accelerator")
        ) {
          setCategories((current) =>
            [...current].filter(
              (category) =>
                category !== "Incubator" && category !== "Accelerator"
            )
          );
        } else {
          setCategories((current) => [...current, "Incubator, Accelerator"]);
        }
      }
      setFilters((current) => [{ ...current, catName: categories }]);
    }
    filterEvents();
  };

  const searchNoValue = (e) => {
    if (!e.target.value) fetchEvents();
  };

  const resetFilter = () => {
    setCategories([]);
    setFilters((current) => [{ ...current, catName: categories }]);
    setCategoryButtonsActiveIndex(-1);
    categoryButtons?.map((button) => {
      button.activebtn = false;
    });
    filterEvents();
  };

  const clearFilters = () => [
    getEvents(),
    getSavedEvents(),
    getUserSavedEvents(),
    filterEvents(),
  ];

  return (
    <div className="event_wrapper">
      <div className="event_container">
        <div className="event_search">
          <form className="event__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="input">
              <i className="fas fa-search tw-text-xl tw-h-auto fas-hide" />
              <input
                type="text"
                className="events_search"
                placeholder="What event are you looking for?"
                onChange={(e) => searchNoValue(e)}
              />
            </div>
            <button className="event_search_button" type="submit">
              Search
            </button>
          </form>
          <div className="background-icons">
            <img
              src="/assets/images/bg-shadow-circle.png"
              className="tw-absolute"
              style={{ top: "4%", left: "1%" }}
              alt="background"
            />
          </div>
          <div className="mt-4 tw-flex tw-flex-row tw-justify-center tw-items-center event_select_grid">
            {options.map(({ label, options }) => (
              <label className="tw-mr-8">
                <Select
                  id="form-filter"
                  instanceId="form-filter"
                  options={options}
                  className="event_Select tw-rounded-full tw-select-none"
                  placeholder={label}
                  styles={selectStyles}
                  closeMenuOnSelect
                  isSearchable={false}
                  isClearable
                  onChange={onChangeInput}
                />
              </label>
            ))}
            <span
              className="clear-button tw-text-white tw-cursor-pointer tw-text-sm tw-font-semibold "
              onClick={() => clearFilters()}
            >
              Clear Filter
            </span>
            <div className="img_position">
              <img
                src="/assets/images/home-page/about-title-icon.svg"
                alt="bg"
              />
            </div>
          </div>
          /**MIGHT BE NEEDED LATER ON */
          {/* <div className="mobile_event_select">
            <Select
              id="form-filter"
              instanceId="form-filter"
              options={options}
              className="event_Select tw-select-none"
              styles={selectStyles}
              closeMenuOnSelect
              placeholder="Filter Search"
              isSearchable={false}
              onChange={onChangeInput}
            />
          </div> */}
        </div>

        <div className="event_title_button">
          {categoryButtons.map((button, idx) => (
            <EventCategoryFilterButton
              key={`${`evnt_btn${idx}`}`}
              category={button.category}
              description={button.description}
              categoryFilter={categoryFilter}
              idx={idx}
              filter={filter}
              activebtn={button.activebtn}
              onClickActive={() => {
                button.activebtn = !button.activebtn;
              }}
            />
          ))}

          {[...categoryButtons].filter((button) => button.activebtn === true)
            ?.length > 0 ? (
            <button
              className="clear-button tw-text-white tw-cursor-pointer tw-text-base tw-font-semibold tw-mt-2"
              type="button"
              onClick={() => resetFilter()}
            >
              Reset
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="background-icons">
          <img
            src="/assets/images/bg-shadow-circle.png"
            className="tw-absolute"
            style={{ top: "9%", left: "80%" }}
            alt="background"
          />
        </div>

        <div className="event_divide">
          <h1>Featured&nbsp;Events</h1>
        </div>

        {/* LOADING SKELETON HERE */}
        <div className="swiper-container">
          {loading ? (
            <div className="swiper-wrapper" style={{ width: "100%" }}>
              <div className="mr-4">
                <EventCardSkeleton />
              </div>
              <div className="">
                <EventCardSkeleton />
              </div>
            </div>
          ) : categoryFilterLoading ? (
            <div className="swiper-wrapper" style={{ width: "100%" }}>
              <div className="mr-4">
                <EventCardSkeleton />
              </div>
              <div className="">
                <EventCardSkeleton />
              </div>
            </div>
          ) : Swiperdata?.length < 1 ? (
            <div
              className="text-center tw-text-white tw-font-bold tw-text-2xl no-filters tw-ml-4"
              style={{ width: "100%" }}
            >
              Sorry, no events match your filters
            </div>
          ) : (
            <>
              <div className="container">
                <Slider ref={setSliderRef} {...conditionalInfinite}>
                  {Swiperdata?.map((event, index) => (
                    <EventCardFeatured
                      item={event}
                      attended={event}
                      userSavedEvents={userSavedEvents}
                      handleMoreInfo={handleMoreInfo}
                      active={active}
                      setClickRegister={setClickRegister}
                      userEvent={userEvents}
                      clickRegister={clickRegister}
                      userData={userData}
                      token={token}
                      allsavedEvents={allsavedEvents}
                    />
                  ))}
                </Slider>
                <div className="profile-projects-controllers">
                  <div>
                    <img
                      onClick={sliderRef?.slickPrev}
                      style={{ transform: "rotate(180deg)" }}
                      src="/assets/images/arrow-righ-circle.svg"
                      alt="control"
                    />
                    <p>
                      {Swiperdata?.length > 2
                        ? `${currentIndex + 1}/${Swiperdata?.length}`
                        : "1/1"}
                    </p>
                    <img
                      onClick={sliderRef?.slickNext}
                      src="/assets/images/arrow-righ-circle.svg"
                      alt="control"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <img
                  src="/assets/images/home-page/about-title-icon.svg"
                  alt="bg"
                />
              </div>
            </>
          )}
        </div>

        <div className="event_divide event_divide_second">
          <h1>Active&nbsp;Events</h1>
        </div>
        {/* LOADING SKELETON HERE */}
        <div className="event_container_section">
          {loading ? (
            <div className="cards">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : categoryFilterLoading ? (
            <div className="cards">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="cards">
              {AllEvent?.length < 1 && (
                <div
                  className="text-center tw-text-white tw-font-bold tw-text-2xl no-filters"
                  style={{ width: "100%" }}
                >
                  Sorry, no events match your filters
                </div>
              )}
              {AllEvent?.map((events, index) => (
                <EventCard
                  item={events}
                  attended={userSavedEvents}
                  userSavedEvents={userSavedEvents}
                  userEvent={userEvents}
                  key={`${`event_card${index}`}`}
                  handleMoreInfo={handleMoreInfo}
                  active={active}
                  setClickRegister={setClickRegister}
                  clickRegister={clickRegister}
                  userData={userData}
                  token={token}
                  allsavedEvents={allsavedEvents}
                  getUserSavedEvents={getUserSavedEvents}
                />
              ))}
            </div>
          )}
        </div>

        <div className="event_divide">
          <h1>Past&nbsp;Events</h1>
        </div>
        {/* LOADING SKELETON HERE */}
        <div className="event_container_section">
          {loading ? (
            <div className="cards">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : categoryFilterLoading ? (
            <div className="cards">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <div className="cards">
              {PastEvent?.length < 1 && (
                <div
                  className="text-center tw-text-white tw-font-bold tw-text-2xl no-filters"
                  style={{ width: "100%" }}
                >
                  Sorry, no events match your filters
                </div>
              )}

              <PastEventCard
                data={PastEvent}
                attended={userSavedEvents}
                userSavedEvents={userSavedEvents}
                userEvent={userEvents}
                handleMoreInfo={handleMoreInfo}
                active={active}
                setClickRegister={setClickRegister}
                clickRegister={clickRegister}
                userData={userData}
                token={token}
                allsavedEvents={allsavedEvents}
                getUserSavedEvents={getUserSavedEvents}
              />
            </div>
          )}
        </div>

        <div className="event_myevent">
          <div className="event_divide">
            <h1>My&nbsp;Events</h1>
          </div>

          {userData !== null ? (
            <div className="swiper-container">
              {loading ? (
                <div className="swiper-wrapper" style={{ width: "100%" }}>
                  <div className="swiper-slide">
                    <EventCardFeaturedSkeleton />
                  </div>
                  <div className="swiper-slide">
                    <EventCardFeaturedSkeleton />
                  </div>
                  <div className="swiper-slide">
                    <EventCardFeaturedSkeleton />
                  </div>
                  {/* <div className="swiper-slide">
                    <EventCardFeaturedSkeleton />
                  </div> */}
                </div>
              ) : catergoryFilterLoading ? (
                <div className="swiper-wrapper" style={{ width: "100%" }}>
                  <div className="swiper-slide">
                    <EventCardSkeleton />
                  </div>
                  <div className="swiper-slide">
                    <EventCardSkeleton />
                  </div>
                  <div className="swiper-slide">
                    <EventCardSkeleton />
                  </div>
                  <div className="swiper-slide">
                    <EventCardSkeleton />
                  </div>
                </div>
              ) : userEvents?.length === 0 ? (
                <div className="container d-flex justify-content-center">
                  <h1>You have not registered to any events yet.</h1>
                </div>
              ) : (
                <>
                  <div className="swiper-wrapper">
                    {userEvents
                      ?.filter(
                        (e) =>
                          (e.attending === "yes" || e.attending === "maybe") &&
                          e.event_id !== null
                      )
                      ?.map((events, index) => (
                        <div
                          className="swiper-slide"
                          key={`${`event_card${index}`}`}
                        >
                          <EventCard
                            item={events.event_id}
                            attended={events}
                            userEvent={userEvents}
                            /* key={index} */
                            handleMoreInfo={handleMoreInfo}
                            active={active}
                            setClickRegister={setClickRegister}
                            clickRegister={clickRegister}
                            userData={userData}
                            token={token}
                            userSavedEvents={userSavedEvents}
                            allsavedEvents={allsavedEvents}
                            getUserSavedEvents={getUserSavedEvents}
                          />
                        </div>
                      ))}
                  </div>
                  <div>
                    <img
                      src="/assets/images/bg-shadow-circle.png"
                      className="tw-absolute"
                      style={{ top: "10%" }}
                      alt="background"
                    />
                  </div>
                  <div className="swiper-navigation_container">
                    <div className="swiper-navigation">
                      <div className="swiper-button-prev" />
                      <div className="swiper-button-next" />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="event_login">
              <h1>Participate in events you enjoy</h1>
              <h2>
                Choose from the hundreds of virtual, hybrid, and IRL events in
                the Minority Programmers network.
              </h2>

              <div className="event_login_button">
                <button
                  type="button"
                  className="event_login_gradient-button"
                  onClick={() => {
                    setShowMyEvent(false);
                  }}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
          {showMyEvent ? (
            <div className="create_event">
              <div
                className="create_event-shadow"
                onClick={() => {
                  setShowMyEvent(false);
                }}
              />
              <div
                id="create_event-container"
                className="create_event-container"
              >
                <Card />
              </div>
              <i
                className="close_icon fas fa-times close-icon tw-text-white"
                onClick={() => {
                  setShowMyEvent(false);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="event_create_own_event">
          <div className="event_end_text">
            <h1>Create your own event</h1>
            <h6>
              It could be a virtual party, workshop, meetup or seminar. Host any
              event you want and share for people to join.
            </h6>
            <div className="event_submit_button">
              <button
                type="button"
                className="gradient-button gradient-button-1"
                onClick={() => {
                  setShowCreateEvent(true);
                }}
              >
                + Submit an Event
              </button>
            </div>
          </div>
          <div className="images-box">
            <div className="image">
              <img
                className="event_img1"
                src="/assets/images/event1.png"
                alt="event1"
              />
            </div>
            <div className="image_two_three_four">
              <div className="image">
                <img
                  className="event_img2"
                  src="/assets/images/event2.png"
                  alt="event2"
                />
              </div>
              <div className="image_three_four">
                <div className="image">
                  <img
                    className="event_img3"
                    src="/assets/images/event3.png"
                    alt="event3"
                  />
                </div>
                <div className="image">
                  <img
                    className="event_img4"
                    src="/assets/images/event4.png"
                    alt="event4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showCreateEvent && (
          <CreateEvent
            data={createEventData}
            handleError={handleError}
            // updateTime={updateTime}
            handleMoreInfo={handleMoreInfo}
            handleCreateEvent={handleCreateEvent}
            handleCreateEventData={handleCreateEventData}
            handleCreateEventPicture={handleCreateEventPicture}
            userData={userData}
            active={active}
            token={token}
            handleEventDateTime={handleEventDateTime}
            eventDateTime={eventDateTime}
          />
        )}
        {showMoreInfo && (
          <EventMoreInfo
            data={moreInfoData}
            handleMoreInfo={handleMoreInfo}
            handleCreateEventData={handleCreateEventData}
            active={active}
            setClickRegister={setClickRegister}
            clickRegister={clickRegister}
            userData={userData}
            token={token}
            userSavedEvents={userSavedEvents}
            attended={handleMoreInfo}
            allsavedEvents={allsavedEvents}
            createEventData={createEventData}
            handleEventDateTime={handleEventDateTime}
            eventDateTime={eventDateTime}
            allEvent={AllEvent}
            myEvent={myEvent}
            userEvent={userEvents}
            getUserSavedEvents={getUserSavedEvents}
          />
        )}
        {clickRegister && !active ? (
          <div className="create_event">
            <div
              className="create_event-shadow"
              onClick={() => {
                setClickRegister(false);
              }}
            />
            <div id="create_event-container" className="create_event-container">
              <Card />
            </div>
            <i
              className="close_icon fas fa-times close-icon"
              onClick={() => {
                setClickRegister(false);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Event;

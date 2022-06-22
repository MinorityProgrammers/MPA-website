import React, { useState, useEffect } from "react";
import Link from "next/link";
import Moment from "moment";
import axios from "axios";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { successToast, errorToast } from "../../contexts/utils/toasts";

const EventMoreInfo = (props) => {
  const {
    clickRegister,
    setClickRegister,
    active,
    data,
    userData,
    token,
    attended,
    userSavedEvents,
    allsavedEvents,
    createEventData,
    allEvent,
    getUserSavedEvents,
    handleMoreInfo,
    handleCreateEventData,
  } = props;
  const [, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const dateNow = Date.now();
  const eventTime = new Date(data.time).getTime();
  const shareUrl = `${data.eventLink}`;
  const title = `${data.eventName}`;
  const eventStatus = userSavedEvents
    .filter((user) => user.event_id?._id === data._id)
    .map((x) => <li className="event-status-yes">{x.attending}</li>);

  const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const checkRegister = (e, status) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true);
    } else if (active === true && userData !== null) {
      setLoading(true);
      axios
        .post(
          `${process.env.BASE_URI}/saveEvent`,
          {
            event_id: data._id,
            user_id: userData._id,
            attending: `${status}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((/* res */) => {
          setLoading(false);
          successToast("You are registered!");
          getUserSavedEvents();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          errorToast("Something went wrong, please contact us.");
        });
    }
  };

  const cancelRegister = (e, eventId, _token) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true);
    } else if (active === true && userData !== null) {
      axios
        .delete(`${process.env.BASE_URI}/saveEvent/${eventId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${_token}`,
          },
        })
        .then((/* res */) => {
          setLoading(false);
          successToast("removed event");
          getUserSavedEvents();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          errorToast("Something went wrong, please contact us.");
        });
    }
  };
  const checkSaveEvent = (val) => {
    if (val === "Register") {
      for (let i = 0; i < userSavedEvents.length; i += 1) {
        if (
          userSavedEvents[i].event_id?._id === data._id ||
          (userSavedEvents !== null && attended.attending === "yes")
        ) {
          return (
            <button
              type="button"
              className="button_action"
              onClick={(e) => cancelRegister(e, userSavedEvents[i]._id, token)}
            >
              Cancel Registration
            </button>
          );
        }
      }
    } else if (val === "attendance") {
      for (let i = 0; i < userSavedEvents.length; i += 1) {
        if (
          userSavedEvents[i].event_id._id === data._id ||
          (userSavedEvents !== null && attended.attending === "yes")
        ) {
          return <p> </p>;
        }
      }
    }
  };

  const getSelectedEvent = () => {
    for (let i = 0; i < userSavedEvents.length; i += 1) {
      if (userSavedEvents[i].event_id?._id === data._id) {
        setSelectedEvent(userSavedEvents[i]);
      }
    }
    return selectedEvent;
  };

  const changeStatusApi = (
    e,
    _token,
    savedEventId,
    eventId,
    userId,
    attendingStatus
  ) => {
    e.preventDefault();
    const _data = {
      event_id: eventId,
      user_id: userId,
      attending: `${attendingStatus}`,
    };

    axios
      .patch(`${process.env.BASE_URI}/saveEvent/${savedEventId}`, _data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${_token}`,
        },
      })
      .then((/* res */) => {
        setLoading(false);
        successToast(`Attending status: ${attendingStatus}`);
        getUserSavedEvents();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        errorToast(
          `Cannot change status to ${attendingStatus} Something went wrong, please contact us.`
        );
      });
  };

  useEffect(() => {
    let isMount = true;
    getSelectedEvent();
    return () => {
      isMount = false;
    };
  }, []);
  const changeStatus = (e, event, status) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true);
    } else if (active === true && userData !== null) {
      if (!userSavedEvents.includes(event) && status !== "no") {
        checkRegister(e, "yes");
      }
      if (userSavedEvents.includes(event)) {
        if (status === "yes") {
          changeStatusApi(e, token, event._id, data._id, userData._id, status);
        } else if (status === "no") {
          cancelRegister(e, event._id, token);
        } else if (status === "maybe") {
          changeStatusApi(e, token, event._id, data._id, userData._id, status);
        }
      }
    }
  };

  let count = 0;
  const totalAttendees = (eventId) => {
    for (let i = 0; i < allsavedEvents.length; i += 1) {
      if (allsavedEvents[i].event_id !== null) {
        if (
          allsavedEvents[i].attending === "yes" &&
          allsavedEvents[i].event_id._id === eventId
        ) {
          count += 1;
        }
      }
    }
    return count;
  };

  let label;
  let exportButton;
  let catName;
  let Virtual;
  if (data.catName.label) {
    catName = data.catName.label;
  } else {
    catName = data.catName;
  }
  if (data.Virtual.label) {
    Virtual = data.Virtual.value;
  } else {
    Virtual = data.Virtual;
  }
  const labelTitle = catName.toLowerCase();
  if (labelTitle === "lecture" || labelTitle === "webinar") {
    label = (
      <p className="about_header-label about_header-label-first">
        {Capitalize(catName)}
      </p>
    );
    exportButton = (
      <button
        type="button"
        className="eventmoreinfo_export eventmoreinfo_export-first"
      >
        Export Event To Calendar
      </button>
    );
  } else if (labelTitle === "workshop" || labelTitle === "conference") {
    label = (
      <p className="about_header-label about_header-label-second">
        {Capitalize(catName)}
      </p>
    );
    exportButton = (
      <button
        type="button"
        className="eventmoreinfo_export eventmoreinfo_export-second"
      >
        Export Event To Calendar
      </button>
    );
  } else if (labelTitle === "hackathon") {
    label = (
      <p className="about_header-label about_header-label-third">
        {Capitalize(catName)}
      </p>
    );
    exportButton = (
      <button
        type="button"
        className="eventmoreinfo_export eventmoreinfo_export-third"
      >
        Export Event To Calendar
      </button>
    );
  } else if (labelTitle === "incubator" || labelTitle === "accelerator") {
    label = (
      <p className="about_header-label about_header-label-fourth">
        {Capitalize(catName)}
      </p>
    );
    exportButton = (
      <button
        type="button"
        className="eventmoreinfo_export eventmoreinfo_export-fourth"
      >
        Export Event To Calendar
      </button>
    );
  }

  const getEventDetailPhoto = () =>
    allEvent
      .filter((e) => e._id === data._id)
      .map((n) => (
        <img
          src={
            n.host.profilePicture
              ? n.host.profilePicture
              : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"
          }
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginRight: "20px",
          }}
          alt="avatar"
        />
      ));

  const getEventDetailName = () =>
    allEvent
      .filter((e) => e._id === data._id)
      .map((n) => (
        <>
          <p>{n.host.fistName}</p>
          <p> {n.host.lastName}</p>
        </>
      ));

  Moment.locale("en");

  return (
    <div className="eventinfo">
      {data.host ? (
        <div
          className="eventmoreinfo_shadow"
          onClick={() => handleMoreInfo()}
        />
      ) : (
        <div className="eventmoreinfo_shadow" />
      )}

      <div className="eventmoreinfo_container tw-z-50">
        {data.host && (
          <i
            className="close_icon fas fa-times"
            id="closeicon"
            onClick={() => handleMoreInfo()}
          />
        )}
        <div className="eventmoreinfo_container_grid">
          <div className="eventmoreinfo_container_left">
            <img src={data.EventPicture} alt="Event_Picture" />
          </div>
          <div className="eventmoreinfo_container_right">
            <div className="about_header">
              <h1>
                {data.eventName} {label}
                {eventStatus && (
                  <div className="event-status">{eventStatus}</div>
                )}
              </h1>
            </div>
            <div className="header">
              {data.host ? (
                <div className="host_details">
                  {data.host.profilePicture ? (
                    <img
                      src={
                        data.host.profilePicture
                          ? data.host.profilePicture
                          : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"
                      }
                      alt="Host Avatar"
                    />
                  ) : (
                    getEventDetailPhoto()
                  )}

                  <div className="host_title">
                    <h4>Host</h4>
                    {data.host.firstName ? (
                      <p>
                        {data.host.firstName} {data.host.lastName}
                      </p>
                    ) : (
                      getEventDetailName()
                    )}
                  </div>
                </div>
              ) : (
                <div className="host_details">
                  <img
                    src={
                      userData.profilePicture
                        ? userData.profilePicture
                        : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"
                    }
                    alt="Host Avatar"
                  />
                  <div className="host_title">
                    <h4>Host</h4>
                    <p>
                      {userData.firstName
                        ? userData.firstName
                        : data.host.fistName}{" "}
                      {userData.lastName
                        ? userData.lastName
                        : data.host.lastName}
                    </p>
                  </div>
                </div>
              )}
              {createEventData.step === 2 ? (
                ""
              ) : (
                <div className="buttons">
                  {eventTime < dateNow ? (
                    <button type="button" className="button_action">
                      <Link href={data.actionLink}>
                        <a target="_blank">Watch Webinar</a>
                      </Link>
                    </button>
                  ) : (
                    <span>
                      {userData !== null ? (
                        checkSaveEvent("Register")
                      ) : (
                        <button
                          type="button"
                          className="button_action"
                          onClick={(e) => checkRegister(e, "yes")}
                        >
                          {data.callToAction}
                        </button>
                      )}
                      {userData !== null && !checkSaveEvent("Register") ? (
                        <button
                          type="button"
                          className="button_action"
                          onClick={(e) => checkRegister(e, "yes")}
                        >
                          {data.callToAction}
                        </button>
                      ) : (
                        ""
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>
            <hr />
            <div className="body">
              <div className="sidebar" style={{ marginTop: "0px" }}>
                <span>Local Time</span>
                <h3 className="date">{Moment(data.time).format("LLL")}</h3>
                {/* <p className="attending">
                  {totalAttendees(data._id)}
                  {totalAttendees(data._id) > 2 ? "people" : "person"}
                  {eventTime < dateNow ? "attended" : "attending"}
                </p> */}
                <h3>Location</h3>
                {Virtual === "true" ? (
                  <p className="date">Virtual Event</p>
                ) : (
                  <p className="date">In-Person Event</p>
                )}
                {eventTime < dateNow || createEventData.step === 2 ? (
                  ""
                ) : (
                  <>
                    <h3>Will you be attending?</h3>
                    <div className="option_buttons">
                      <button
                        type="button"
                        className={
                          selectedEvent.attending === "yes" ? "focus" : ""
                        }
                        onClick={(e) => changeStatus(e, selectedEvent, "yes")}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={
                          selectedEvent.attending === "no" ? "focus" : ""
                        }
                        onClick={(e) => changeStatus(e, selectedEvent, "no")}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={
                          selectedEvent.attending === "maybe" ? "focus" : ""
                        }
                        onClick={(e) => changeStatus(e, selectedEvent, "maybe")}
                      >
                        Maybe
                      </button>
                    </div>
                  </>
                )}

                <h3>Share event</h3>
                <div className="share_event">
                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                  >
                    <i className="fab fa-twitter" />
                  </TwitterShareButton>
                  <TelegramShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                  >
                    <i className="fab fa-telegram" />
                  </TelegramShareButton>

                  <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                  >
                    <i className="fab fa-facebook" />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <i className="fab fa-linkedin" />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <i className="fab fa-whatsapp" />
                  </WhatsappShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body="body"
                    className="Demo__some-network__share-button"
                  >
                    <i className="fas fa-envelope" />
                  </EmailShareButton>
                </div>
                {userData && eventTime > dateNow && createEventData.step !== 2
                  ? exportButton
                  : ""}
              </div>
            </div>
            {data.host ? (
              <div />
            ) : (
              <div className="bottom">
                <div className="buttons">
                  <button type="button" onClick={() => handleMoreInfo()}>
                    Edit
                  </button>
                  <button type="button" onClick={handleCreateEventData("step")}>
                    Submit Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="about_footer">
          <div className="about_body">
            <h3>About Event</h3>
            <p>{data.EventDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMoreInfo;

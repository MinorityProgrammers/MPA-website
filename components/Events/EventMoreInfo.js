import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Moment from 'moment';
import axios from 'axios';
import { successToast, errorToast } from '../../contexts/utils/toasts'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

const EventMoreInfo = (props) => {
  const router = useRouter()
  const { clickRegister, setClickRegister, active, userData, token, attended, userSavedEvents, allsavedEvents, createEventData, eventDateTime, allEvent,getUserSavedEvents } = props;
  const [loading, setLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])
  let dateNow = Date.now();
  let eventTime = new Date(props.data.time).getTime()

  console.log("props eventInfo", props.data)
  console.log("allEvent eventInfo", allEvent)
  console.log("userSavedEvents from EventMoreInfo", userSavedEvents)

  const shareUrl = `${props.data.eventLink}`;
  const title = `${props.data.eventName}`;


  const eventStatus = userSavedEvents.filter(user => user.event_id?._id === props.data._id).map(x => (
    <li className="event-status-yes">{x.attending}</li>
  ))

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Check saveEvents to change label
  const checkSaveEvent = (val) => {
    if (val === "Register") {
      for (let i = 0; i < userSavedEvents.length; i++) {
        if (userSavedEvents[i].event_id?._id === props.data._id || userSavedEvents !== null && attended.attending === "yes") {
          //console.log("cancel", userSavedEvents[i]._id)
          return <button className="button_action" onClick={(e) => cancelRegister(e, userSavedEvents[i]._id, token)}>Cancel Registration</button>
        }
      }
    } else if (val === "attendance") {
      for (let i = 0; i < userSavedEvents.length; i++) {
        if (userSavedEvents[i].event_id._id === props.data._id || userSavedEvents !== null && attended.attending === "yes") {
          //console.log("true attendance", userSavedEvents[i].event_id._id)
          return <p>{" "}</p>
        }
      }
    }
  }

  const checkRegister = (e, status) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true)
      //console.log("event card", clickRegister)
    } else if (active === true && userData !== null) {
      setLoading(true)
      axios.post('https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent', {
        event_id: props.data._id,
        user_id: userData._id,
        attending: `${status}`
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => {
          console.log("register:", res)
          setLoading(false)
          successToast("You are registered!")
          getUserSavedEvents()
          // setTimeout("location.reload(true);", 2000);
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          errorToast("Something went wrong, please contact us.")
        })
    }
  }

  const cancelRegister = (e, eventId, token) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true)
      //console.log("event card", clickRegister)
    } else if (active === true && userData !== null) {
      axios.delete(`https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent/${eventId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => {
          console.log("cancel:", res)
          setLoading(false)
          successToast("removed event")
          getUserSavedEvents()
          // setTimeout("location.reload(true);", 2000);
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          errorToast("Something went wrong, please contact us.")
        })
    }
  }

  const getSelectedEvent = () => {
    for (let i = 0; i < userSavedEvents.length; i++) {
      if (userSavedEvents[i].event_id?._id === props.data._id) {
        setSelectedEvent(userSavedEvents[i])
      }
    }
    return selectedEvent
  }

  const changeStatusApi = (e, token, savedEventId, eventId, userId, attendingStatus) => {
    e.preventDefault()
    let data = {
      event_id: eventId,
      user_id: userId,
      attending: `${attendingStatus}`
    }
    console.log(savedEventId, eventId, userId, attendingStatus)
    axios.patch(`https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent/${savedEventId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log("Changed status", res)
        setLoading(false)
        successToast(`Attending status: ${attendingStatus}`)
        getUserSavedEvents()
        // setTimeout("location.reload(true);", 2000);
      })
      .catch(err => {
        console.log(err.response.data)
        setLoading(false)
        errorToast(`Cannot change status to ${attendingStatus} Something went wrong, please contact us.`)
      })
  }

  useEffect(() => {
    let isMount = true
    getSelectedEvent()
    return () => {
      isMount = false
    }
  }, [])

  //console.log("selectedevent", selectedEvent)

  const changeStatus = (e, event, status) => {
    e.preventDefault();
    if (clickRegister === false && active === false) {
      setClickRegister(true)
    } else if (active === true && userData !== null) {
      if (!userSavedEvents.includes(event) && status !== "no") {
        checkRegister(e, "yes")
      }
      if (userSavedEvents.includes(event)) {
        if (status === 'yes') {
          changeStatusApi(e, token, event._id, props.data._id, userData._id, status)
        } else if (status === 'no') {
          cancelRegister(e, event._id, token)
        } else if (status === 'maybe') {
          changeStatusApi(e, token, event._id, props.data._id, userData._id, status)
        }
      }
    }
  }

  let count = 0;
  const totalAttendees = (eventId) => {
    for (let i = 0; i < allsavedEvents.length; i++) {
      if (allsavedEvents[i].event_id !== null) {
        if (allsavedEvents[i].attending === "yes" && allsavedEvents[i].event_id._id === eventId) {
          count++
        }
      }
    }
    return count
  }

  let label
  let exportButton
  let catName
  let Virtual
  if (props.data.catName.label) {
    catName = props.data.catName.label
  }
  else {
    catName = props.data.catName

  }
  if (props.data.Virtual.label) {
    Virtual = props.data.Virtual.value
  }
  else {
    Virtual = props.data.Virtual
  }
  const labelTitle = catName.toLowerCase()
  if (labelTitle == 'lecture' || labelTitle == 'webinar') {
    label = <p className="about_header-label about_header-label-first">
      {Capitalize(catName)}
    </p>
    exportButton = <button className="eventmoreinfo_export eventmoreinfo_export-first">Export Event To Calendar</button>
  }
  else if (labelTitle == 'workshop' || labelTitle == 'conference') {
    label = <p className="about_header-label about_header-label-second">
      {Capitalize(catName)}
    </p>
    exportButton = <button className="eventmoreinfo_export eventmoreinfo_export-second">Export Event To Calendar</button>
  }
  else if (labelTitle == 'hackathon') {
    label = <p className="about_header-label about_header-label-third">
      {Capitalize(catName)}
    </p>
    exportButton = <button className="eventmoreinfo_export eventmoreinfo_export-third">Export Event To Calendar</button>
  }
  else if (labelTitle == 'incubator' || labelTitle == 'accelerator') {
    label = <p className="about_header-label about_header-label-fourth">
      {Capitalize(catName)}
    </p>
    exportButton = <button className="eventmoreinfo_export eventmoreinfo_export-fourth">Export Event To Calendar</button>
  }

  const getEventDetailPhoto = () => {
    return allEvent.filter(e => e._id === props.data._id).map(n => (
      <img src={n.host.profilePicture ? n.host.profilePicture : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"} style={{
        borderRadius: "50%",
        width: "100px",
        height: "100px",
        objectFit: "cover",
        marginRight: "20px"
      }} />
    ))
  }

  const getEventDetailName = () => {
    return allEvent.filter(e => e._id === props.data._id).map(n => (
      <><p>{n.host.fistName}</p><p> {n.host.lastName}</p></>
    ))
  }

  Moment.locale('en');

  return (
    <div className="eventinfo">
      {props.data.host ?
        <div className="eventmoreinfo_shadow" onClick={() => props.handleMoreInfo()}>
        </div>
        :
        <div className="eventmoreinfo_shadow">
        </div>
      }

      <div className="eventmoreinfo_container ">
        <div className="eventmoreinfo_container_left">
          <img src={props.data.EventPicture} alt="Event Picture" />
        </div>
        <div className="eventmoreinfo_container_right">
          {props.data.host &&
            <i className="close_icon fas fa-times" id="closeicon" onClick={() => props.handleMoreInfo()} ></i>
          }
          <div className="header">
            {props.data.host ? <div className="host_details">
              {props.data.host.profilePicture ? <img src={props.data.host.profilePicture ? props.data.host.profilePicture : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"} alt="Host Avatar" /> : getEventDetailPhoto()}

              <div className="host_title">
                <h4>Host</h4>
                {props.data.host.firstName ? <p>{props.data.host.firstName} {props.data.host.lastName}</p> : getEventDetailName()}
                {/* <p>{props.data.host.firstName} {props.data.host.lastName}</p> */}
              </div>
            </div> : <div className="host_details">
              <img src={userData.profilePicture ? userData.profilePicture : "https://github.com/MinorityProgrammers/mpa-avatars/blob/main/avatars/mysteryAvatar.png?raw=true"} alt="Host Avatar" />
              <div className="host_title">
                <h4>Host</h4>
                <p>{userData.firstName ? userData.firstName : props.data.host.fistName} {userData.lastName ? userData.lastName : props.data.host.lastName}</p>
              </div>
            </div>}
            {createEventData.step === 2 ? "" :
              <div className="buttons">
                {Virtual == "true" ? <p>Virtual Event</p> : <p>In-Person Event</p>}
                {eventTime < dateNow ? <button className="button_action"><Link href={props.data.actionLink}><a target="_blank">Watch Webinar</a></Link></button> : <span>
                  {userData !== null ? checkSaveEvent("Register") : <button className="button_action" onClick={(e) => checkRegister(e, "yes")}>{props.data.callToAction}</button>}
                  {userData !== null && !checkSaveEvent("Register") ? <button className="button_action" onClick={(e) => checkRegister(e, "yes")}>{props.data.callToAction}</button> : ""}
                </span>}
              </div>}
          </div>
          <hr />
          <div className="body">
            <div className="about">
              <div className="about_header">
                <h1>{props.data.eventName}</h1>
                {label}
                {eventStatus && <div className="event-status">
                  {eventStatus}
                </div>}
              </div>
              <div className="about_body">
                <h3>About event</h3>
                <p>{props.data.EventDescription}</p>
              </div>
            </div>
            <div className="sidebar" style={{ marginTop: "0px" }}>
              <span>Local Time</span>
              <h3>{Moment(props.data.time).format('LLL')}</h3>
              <p className="attending">{totalAttendees(props.data._id)} {totalAttendees(props.data._id) > 2 ? "people" : "person"} {eventTime < dateNow ? "attended" : "attending"}</p>
              {eventTime < dateNow || createEventData.step === 2 ? "" : <>
                <h3>Will you be attending?</h3>
                <div className="option_buttons">
                  <button className={selectedEvent.attending === "yes" ? "focus" : ""} onClick={(e) => changeStatus(e, selectedEvent, "yes")}>Yes</button>
                  <button className={selectedEvent.attending === "no" ? "focus" : ""} onClick={(e) => changeStatus(e, selectedEvent, "no")}>No</button>
                  <button className={selectedEvent.attending === "maybe" ? "focus" : ""} onClick={(e) => changeStatus(e, selectedEvent, "maybe")}> Maybe</button>
                </div></>}

              <h3>Share event</h3>
              <div className="share_event">
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                >
                  <i className="fab fa-twitter"></i>
                </TwitterShareButton>
                <TelegramShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                >
                  <i className="fab fa-telegram"></i>
                </TelegramShareButton>

                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="Demo__some-network__share-button"
                >
                  <i className="fab fa-facebook"></i>
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
                  <i className="fab fa-linkedin"></i>
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <i className="fab fa-whatsapp"></i>
                </WhatsappShareButton>
                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body="body"
                  className="Demo__some-network__share-button"
                >
                  <i className="fas fa-envelope"></i>
                </EmailShareButton>
              </div>
              {userData && eventTime > dateNow && createEventData.step !== 2 ? exportButton : ""}
            </div>
          </div>
          {props.data.host ? <div></div> :
            <div className="bottom">
              <div className="buttons">

                <button onClick={() => props.handleMoreInfo()}>Edit</button>
                <button onClick={props.handleCreateEventData("step")}>Submit Event</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div >

  );
}

export default EventMoreInfo;
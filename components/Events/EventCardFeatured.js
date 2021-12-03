import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Moment from 'moment';
import axios from 'axios';
import { successToast, errorToast } from '../../contexts/utils/toasts'

const EventCardFeatured = (props) => {
  const router = useRouter()
  const { clickRegister, setClickRegister, active, userData, token, attended, userSavedEvents, allsavedEvents, userEvent } = props;
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)

  let dateNow = Date.now();
  let eventTime = new Date(props.item.time).getTime()

  

  // Check saveEvents to change label
  const checkSaveEvent = (val) => {
    if (val === "Register") {
      for (let i = 0; i < userSavedEvents.length; i++) {
        if (userSavedEvents !== null && ((userSavedEvents[i].event_id._id === props.item._id) && (userSavedEvents[i].attending === "yes" || userSavedEvents[i].attending === "maybe"))) {
          // console.log("true", userSavedEvents[i].event_id._id)
          return <button className="button_register">Registered</button>
        }
      }
    }
  }

  const handleToggle = (e, eventId) => {
    e.preventDefault()
    if (clickRegister === false && active === false) {
      setClickRegister(true)
      // console.log("event card", clickRegister)
    }
    if (props.item._id === eventId) {
      setLiked(!liked);
      if (liked === true) {
        //alert("I'll cancel your registration")
        setLiked(false)
      } else if (liked == false) {
        for (let i = 0; i < userSavedEvents.length; i++) {
          if (userSavedEvents[i].event_id._id === eventId) {
            if (userSavedEvents[i].attending === "yes" || userSavedEvents[i].attending === "maybe") {
              //console.log(userSavedEvents[i]._id, token)
              cancelEvent(e, userSavedEvents[i]._id, token)
              return
            }
          }
        }
        // console.log("not found", "userSavedEvents", userSavedEvents[i].event_id._id, "eventId", eventId)
        checkRegister("maybe")
        //return alert("I registered you and set attendance to maybe ")
      }

    }
  }

  const cancelEvent = (e, eventId, token) => {
    e.preventDefault()
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
        successToast("You have already cancel your registration")
        setTimeout("location.reload(true);", 2000);
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        errorToast("Something went wrong, please contact us.")
      })
  }


  const checkRegister = (val) => {
    if (clickRegister === false && active === false) {
      setClickRegister(true)
    } else if (active === true && userData !== null) {
      setLoading(true)
      if (val === "yes") {
        axios.post('https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent', {
          event_id: props.item._id,
          user_id: userData._id,
          attending: `${val}`
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
            successToast("You have already cancel your registration")
            setTimeout("location.reload(true);", 2000);
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            errorToast("Something went wrong, please contact us.")
          })
      } else if (val === "maybe") {
        axios.post('https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent', {
          event_id: props.item._id,
          user_id: userData._id,
          attending: `${val}`
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
            successToast(`Attending status: ${val}`)
            setTimeout("location.reload(true);", 2000);
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            errorToast(`Cannot change status to ${val} Something went wrong, please contact us.`)
          })
      }
    }
  }

  const checkAttend = () => {
    for (let i = 0; i < userSavedEvents.length; i++) {
      if (userSavedEvents !== null && ((userSavedEvents[i].event_id._id === props.item._id) && (userSavedEvents[i].attending === "maybe" || userSavedEvents[i].attending === "yes"))) {
        return <><i className="fas fa-heart" ></i> Saved</>
      } else if (userSavedEvents === null && dateNow > eventTime) {
        return "nothing"
      }
    }
  }

  let count = 0;
  const totalAttendees = (eventId) => {
    for (let i = 0; i < allsavedEvents.length; i++) {
      if(allsavedEvents[i].event_id !== null){
      if (allsavedEvents[i].attending === "yes" && allsavedEvents[i].event_id._id === eventId) {
        count++
      }
    }
    }
    return count
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  Moment.locale('en');

  let label
  const labelTitle = props.item.catName.toLowerCase()
  if (labelTitle == 'lecture' || labelTitle == 'webinar') {
    label = <p className="eventcard_image-label eventcard_image-label-first">
      {Capitalize(props.item.catName)}
    </p>
  }
  else if (labelTitle == 'workshop' || labelTitle == 'conference') {
    label = <p className="eventcard_image-label eventcard_image-label-second">
      {Capitalize(props.item.catName)}
    </p>
  }
  else if (labelTitle == 'hackathon') {
    label = <p className="eventcard_image-label eventcard_image-label-third">
      {Capitalize(props.item.catName)}
    </p>
  }
  else if (labelTitle == 'incubator' || labelTitle == 'accelerator') {
    label = <p className="eventcard_image-label eventcard_image-label-fourth">
      {Capitalize(props.item.catName)}
    </p>
  }
  return (
    <div className="eventcard_container">

      <div className="eventcard_image ">
        <img src={props.item.EventPicture} className="tw-max-h-80" alt="" />
        {label}

      </div>

      <div className="eventcard_content">
        <div className="eventcard_top">
          <h2>{props.item.eventName}</h2>
          <p className="date">{Moment(props.item.time).format('LL')}</p>
          <p className="attending">{totalAttendees(props.item._id)} {totalAttendees(props.item._id) > 2 ? "people" : "person"} {eventTime < dateNow ? "attended" : "attending"}</p>
        </div>
        <div className="eventcard_bottom">
          {/* Check save events heart label */}
          {eventTime < dateNow ? "" :
            <p className="save" onClick={(e) => handleToggle(e, props.item._id)}>
              {userData !== null ? checkAttend() : <><i className="far fa-heart"></i> Save for later</>}
              {userData !== null && !checkAttend() ? <><i className="far fa-heart"></i> Save for later</> : ""}
            </p>}
          <button className="button_info" onClick={() => props.handleMoreInfo(props.item)} > <i className="fas fa-plus"></i> More Info</button>
          {/* Check save events Register label */}
          {eventTime < dateNow ? <button className="button_register"><Link href={props.item.actionLink}><a target="_blank">Watch Webinar</a></Link></button> : <span>
            {userData !== null ? checkSaveEvent("Register") : <button className="button_register" onClick={() => checkRegister("yes")}>{props.item.callToAction}</button>}
            {userData !== null && !checkSaveEvent("Register") ? <button className="button_register" onClick={() => checkRegister("yes")}>{props.item.callToAction}</button> : ""}
          </span>}
        </div>
      </div>
    </div>
  );
}

export default EventCardFeatured;
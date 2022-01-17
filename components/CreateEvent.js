import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Select from 'react-select';
import FormData from 'form-data';
import DatePicker from 'react-datepicker';
import Card from './login-signup/card/index';
import { successToast, errorToast } from '../contexts/utils/toasts';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEvent = (props) => {
  const { token } = props;
  const [, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDate = (date) => {
    setSelectedDate(date);
    props.handleEventDateTime(date);
  };

  const setimg = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        props.handleCreateEventPicture(e.target.result);
        const uploadButton = document.getElementById('img_upload');
        const deleteButton = document.getElementById('delete_upload');
        uploadButton.style.display = 'none';
        deleteButton.style.display = 'block';
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const removePictureConfrimation = () => {
    const blur = document.getElementById('delete_image-container');
    const deleteButton = document.getElementById('delete_upload');
    const blurQuestion = document.getElementById(
      'delete_image-container-question',
    );
    blur.style.display = 'flex';
    blur.style.backgroundImage = `url(data:${props.data.EventPicture})`;
    blurQuestion.style.display = 'block';
    deleteButton.style.display = 'none';
  };
  const removePictureDeny = () => {
    const blur = document.getElementById('delete_image-container');
    const blurQuestion = document.getElementById(
      'delete_image-container-question',
    );
    const deleteButton = document.getElementById('delete_upload');
    blur.style.display = 'none';
    blurQuestion.style.display = 'none';
    deleteButton.style.display = 'block';
  };
  const removePicture = () => {
    const blur = document.getElementById('delete_image-container');
    const uploadButton = document.getElementById('img_upload');
    const blurQuestion = document.getElementById(
      'delete_image-container-question',
    );
    blurQuestion.style.display = 'none';
    blur.style.display = 'none';
    uploadButton.value = '';
    uploadButton.style.display = 'block';
    props.handleCreateEventPicture('');
  };

  const selectStyles = {
    control: () => ({
      background: 'rgb(223, 223, 223)',
      width: '100%',
      height: '58px',
      border: '1px solid #222',
      borderRadius: '5px',
      padding: '10px',
      display: 'flex',
    }),
  };

  const handlePreview = () => {
    if (
      props.data.EventPicture.length === 0
      || props.data.eventName.length === 0
      || props.data.EventDescription.length === 0
      || props.data.eventLink.length === 0
      || props.data.time.length === 0
      || props.data.catName.length === 0
      || props.data.Virtual.length === 0
    ) {
      if (props.data.isError === false) {
        props.handleError('isError');
      }
    } else {
      props.handleMoreInfo();
      if (props.data.isError === true) {
        props.handleError('isError');
      }
    }
  };

  const formData = new FormData();
  formData.append('eventName', props.data.eventName);
  formData.append('Eventpicture', props.data.EventPicture);
  formData.append('catName', props.data.catName);
  formData.append('eventLink', props.data.eventLink);
  formData.append('EventDescription', props.data.EventDescription);
  formData.append('time', props.data.time);
  formData.append('actionLink', 'Pre-Register');
  formData.append('callToAction', 'Pre-Register');
  formData.append('approved', true);

  useEffect(() => {
    if (props.data.step === 3) {
      setLoading(true);
      axios
        .post(`${process.env.BASE_URI}/event`, formData, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        })
        .then(() => {
          setLoading(false);
          successToast('Event created!');
        })
        .catch(() => {
          setLoading(false);
          errorToast('Something went wrong, please contact us.');
        });
    }
  }, [props.data.step]);

  const pop2 = () => (
    <div className="create_event-container-right-middle-row">
      <div className="create_event-container-right-middle-row-question">
        <label htmlFor="description">Event Detail</label>
        <textarea
          name="description"
          type="text"
          onChange={props.handleCreateEventData('EventDescription')}
          value={props.data.EventDescription}
          placeholder="What is your event about?"
        />
      </div>

      <div className="create_event-container-right-middle-row-column">
        <div className="create_event-container-right-middle-row-question column-question">
          <label htmlFor="time">Date &amp; Time (Local Time)</label>
          <DatePicker
            className="datepicker"
            placeholderText="When is the event?"
            selected={selectedDate}
            value={selectedDate}
            onChange={(date) => {
              handleDate(date);
            }}
            showTimeSelect
            dateFormat="MM/dd/yyyy  EE hh:mm a"
            required
            minDate={new Date()}
          />
        </div>
      </div>
    </div>
  );

  const pop3 = () => (
    <div className="create_event-container-right-middle-row">
      <div className="create_event-container-right-middle-row-question">
        <label htmlFor="virtual">Is the Event Virtual?</label>
        <Select
          styles={selectStyles}
          name="virtual"
          placeholder="Yes / No"
          onChange={props.handleCreateEventData('Virtual')}
          value={props.data.VirtualOptions}
          options={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
          isSearchable={false}
        />
      </div>
      <div className="create_event-container-right-middle-row-question">
        <label htmlFor="address">Event Link / Address</label>
        <input
          name="address"
          type="text"
          onChange={props.handleCreateEventData('eventLink')}
          value={props.data.eventLink}
          placeholder="Where is event happening?"
        />
      </div>
    </div>
  );

  const popSubmitted = () => {
    const container = document.getElementById('create_event-container');
    const left = document.getElementById('container_left');
    const right = document.getElementById('container_right');
    container.style.overflow = 'hidden';
    left.style.display = 'none';
    right.style.display = 'none';

    return (
      <div className="event_thankyou">
        <img src="/assets/images/Idea_icon.png" alt="icon" />
        <h1>Thank you for submitting an event.</h1>
        <p>
          Your Event is currently under review. Visit the Dashboard to check on
          the status of the event.
        </p>
        <div className="buttons">
          <button type="button">
            <Link href="/dashboard">
              <a>See events in Dashboard</a>
            </Link>
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Continue to events page
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {props.active ? (
        <div className="create_event">
          <div
            className="create_event-shadow"
            onClick={() => {
              props.handleCreateEvent();
            }}
          />
          <div id="create_event-container" className="create_event-container">
            <div id="container_left" className="create_event-container-left">
              {props.data.EventPicture !== '' && (
                <img
                  id="the_background_img"
                  className="the_background_img"
                  src={props.data.EventPicture}
                  alt="event_picture"
                />
              )}
              <div id="delete_image-container" />
              <div
                id="delete_image-container-question"
                className="delete_image-question"
              >
                <h6>Are you sure you want to delete this image?</h6>
                <div className="delete_image-question-buttons">
                  <button
                    type="button"
                    onClick={() => {
                      removePicture();
                    }}
                  >
                    <i className="far fa-trash-alt" />
                    {' '}
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removePictureDeny();
                    }}
                  >
                    No, keep it
                  </button>
                </div>
              </div>
              <input
                type="file"
                id="img_upload"
                accept="image/*"
                title=""
                onChange={(e) => {
                  setimg(e);
                }}
              />
              <button
                type="button"
                className="eventpopup_imgrm"
                id="delete_upload"
                onClick={() => {
                  removePictureConfrimation();
                }}
              >
                <i className="far fa-trash-alt" />
                {' '}
                Delete Image
              </button>
            </div>
            <div id="container_right" className="create_event-container-right">
              <div className="create_event-container-right-top">
                <h1 className="create_event-title">Tell us about your event</h1>
                <i
                  className="fas fa-times"
                  id="closeicon2"
                  onClick={() => {
                    props.handleCreateEvent();
                  }}
                />
              </div>
              <div className="create_event-container-right-middle">
                {props.data.isError ? (
                  <span className="tw-text-red-500 tw-select-none tw-m-0">
                    Please fill in all the blank fields
                  </span>
                ) : (
                  <span className="tw-text-red-500 tw-select-none tw-opacity-0 tw-m-0">
                    Please fill in all the blank fields
                  </span>
                )}
                <div className="create_event-container-right-middle-row">
                  <div className="create_event-container-right-middle-row-question">
                    <label htmlFor="title">Event Name</label>
                    <input
                      name="title"
                      type="text"
                      maxLength="50"
                      onChange={props.handleCreateEventData('eventName')}
                      placeholder="What is this event title?"
                      value={props.data.eventName}
                    />
                  </div>
                  <div className="create_event-container-right-middle-row-question">
                    <label htmlFor="category">Event Category</label>
                    <Select
                      styles={selectStyles}
                      className="selectInput"
                      name="category"
                      placeholder="Type of your event"
                      onChange={props.handleCreateEventData('catName')}
                      value={props.data.catNameOptions}
                      options={[
                        { label: 'Lecture', value: 'Lecture' },
                        { label: 'Webinar', value: 'Webinar' },
                        { label: 'Workshop', value: 'Workshop' },
                        { label: 'Conference', value: 'Conference' },
                        { label: 'Hackathon', value: 'Hackathon' },
                        { label: 'Incubator', value: 'Incubator' },
                        { label: 'Accelerator', value: 'Accelerator' },
                      ]}
                      isSearchable={false}
                    />
                  </div>
                </div>
                {props.data.step > 0 && pop2()}
                {props.data.step > 1 && pop3()}
              </div>
              <div className="create_event-container-right-bottom">
                {props.data.step === 2 && (
                  <button
                    type="button"
                    id="preview_event"
                    onClick={() => {
                      handlePreview();
                    }}
                    className="previewbu"
                  >
                    Preview Event
                  </button>
                )}
                {props.data.step < 2 && (
                  <button
                    type="button"
                    className="eventpopupcontinue"
                    id="continue_submit"
                    onClick={props.handleCreateEventData('step')}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
            {props.data.step === 3 && popSubmitted()}
          </div>
        </div>
      ) : (
        <div className="create_event">
          <div
            className="create_event-shadow"
            onClick={() => {
              props.handleCreateEvent();
            }}
          />
          <div id="create_event-container" className="create_event-container">
            <Card />
          </div>
          <i
            className="close_icon fas fa-times close-icon tw-text-white"
            onClick={() => {
              props.handleCreateEvent();
            }}
          />
        </div>
      )}
    </>
  );
};

export default CreateEvent;

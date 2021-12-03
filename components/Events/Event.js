import React, { Component } from "react";

import axios from "axios";
import CreateEvent from "../CreateEvent";
import EventCard from "./EventCard";
import EventCardFeatured from "./EventCardFeatured";
import Swiper from 'swiper';
import EventCardSkeleton from "./EventCardSkeleton";
import EventCardFeaturedSkeleton from "./EventCardFeaturedSkeleton";
import Select from "react-select";

import "swiper/css/swiper.min.css";
import 'swiper/css/swiper.css'
import EventMoreInfo from "./EventMoreInfo";
import Card from '../login-signup/card/index'
import EventCategoryFilterButton from "./EventCategoryFilterButton";
import { BiJoystickButton } from "react-icons/bi";

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Swiperdata: [],
      AllEvent: [],
      PastEvent: [],
      moreInfoData: [],
      allsavedEvents: [],
      userSavedEvents: [],
      userEvents: [],
      showMoreInfo: false,
      createEventData: {
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
      },
      showCreateEvent: false,
      showMyEvent: false,
      eventDateTime: "",
      myEvent: false,
      categoryButtons: [
        { category: "Lectures/Webinars", description: "On The Hottest Topic", activebtn: false },
        { category: "Workshops/Conferences", description: "Hands on Training", activebtn: false },
        { category: "Hackathons", description: "Compete For Prizes", activebtn: false },
        { category: "Incubators/Accelerators", description: "Start Your Tech Business", activebtn: false }
      ],
      categoryButtonsActiveIndex: -1,
      catergoryFilterLoading: false,
      filter: {
        event_time: '',
        catName: '',
        Virtual: '',
        Featured: ''
      },
      categories: []
    }
  }

  // fetch events when page loaded
  async componentDidMount() {

    Promise.all([
      this.getEvents(),
      this.getSavedEvents(),
      this.findSavedEvents(),
      this.getUserSavedEvents()
    ]).then(([response1]) => {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 1500);
    }).catch(err => console.error(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.Swiperdata !== this.state.Swiperdata) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        centeredSlides: false,
        spaceBetween: 50,
        loop: false,
        reverseDirection: true,
        stopOnLastSlide: false,
        // loopAdditionalSlides: 1000,
        preloadImages: true,
        updateOnImagesReady: true,
        observeParents: true,
        observer: true,
        breakpoints: {
          // when window width is >= 640px
          1: {
            slidesPerView: 1,
          },
          // when window width is >= 918px
          918: {
            slidesPerView: 1.5,
          },
          // when window width is >= 1400px
          1400: {
            slidesPerView: 2.3,
          },
          // when window width is >= 2400px
          2400: {
            slidesPerView: 3,
          },
        }
      })
    }
  }

  //fetch Event data
  getEvents = async () => {
    let dateNow = Date.now();
    await axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/event')
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          AllEvent: response.data.data.filter(function (event) {
            let eventTime = new Date(event.time).getTime();
            if (dateNow < eventTime && event.approved !== null && event.approved === true) {
              return event
            }
          })
        })

        this.setState({
          Swiperdata: response.data.data.filter(function (event) {
            let eventTime = new Date(event.time).getTime();
            if (event.approved !== null && event.approved === true) {
              return event.Featured == true;
            }
          })
        })

        this.setState({
          PastEvent: response.data.data.filter(function (event) {
            let eventTime = new Date(event.time).getTime();
            if (dateNow > eventTime && event.approved !== null && event.approved === true) {
              return event
            }
          }).sort((a, b) => new Date(a.time) - new Date(b.time))
        })
      })
  }

  // fetch SavedEvents data from a user
  getSavedEvents = async () => {
    const token = window.localStorage.getItem('jwtToken')



    return axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent/', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      this.setState({
        allsavedEvents: res.data.data
      })
    })

  }

  getUserSavedEvents = async () => {
    const token = window.localStorage.getItem('jwtToken')



    if (token != null) {
      return axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent/userEvents`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        this.setState({
          userEvents: res.data.data,
          userSavedEvents: res.data.data
        })
      })
    }

  }


  setEventState = (response) => {
    let dateNow = Date.now();
    this.setState({
      AllEvent: response.data.filter(function (event) {
        let eventTime = new Date(event.time).getTime();
        if (dateNow < eventTime && event.approved !== null && event.approved === true) {
          return event
        }
      })
    })
    this.setState({
      Swiperdata: response.data.filter(function (event) {
        let eventTime = new Date(event.time).getTime();
        if (event.approved !== null && event.approved === true) {
          return event.Featured == true;
        }
      })
    })
    this.setState({
      PastEvent: response.data.filter(function (event) {
        let eventTime = new Date(event.time).getTime();
        if (dateNow > eventTime && event.approved !== null && event.approved === true) {
          return event
        }
      }).sort((a, b) => new Date(a.time) - new Date(b.time))
    })
    this.setState({ catergoryFilterLoading: false })
  }

  filterEvents = () => {
    const { filter } = this.state
    this.setState({ catergoryFilterLoading: true })
    fetch(`https://koinstreet-learn-api.herokuapp.com/api/v1/event/?Virtual=${filter.Virtual}&event_time=${filter.event_time}&catName=${filter.catName}`)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        setTimeout(() => {

          this.setEventState(response)
        }, 1500);
      })
  }

  findSavedEvents = () => {
    if (this.props.userData !== null) {
      // console.log(this.state.userEvents)
      this.state.userEvents.map((all) => {
        if (all.event_id !== null) {
          if (all.user_id._id === this.props.userData._id && all.event_id.approved !== null && all.event_id.approved === true) {
            this.setState({ userSavedEvents: [...this.state.userSavedEvents, all] })
          }
        }
      })
      this.setState({ userSavedEvents: this.state.allsavedEvents.filter(event => event.user_id._id == this.props.userData._id) })

      return this.state.userSavedEvents
    } else {
      return false
    }
  }

  render() {
    const { userData, active, clickRegister, setClickRegister, token } = this.props;
    const { userSavedEvents, allsavedEvents, eventDateTime, myEvent } = this.state


    const options = [
      {
        label: "Event Location",
        options: [
          { label: "Virtual Event", value: "Virtual Event" },
          { label: "In-person Event", value: "In-person Event" }
        ]
      },
      {
        label: "happening in",
        options: [
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" }
        ]
      },
      {
        label: "Cost",
        options: [
          { label: "Free", value: "Free" },
          { label: "Paid", value: "Paid" }
        ]
      }
    ];


    const handleSubmit = async (e) => {
      e.preventDefault();

      let dateNow = Date.now();

      if (e.target.childNodes[0].value) {
        let searchValue = e.target.childNodes[0].value
        this.setState({ AllEvent: [...this.state.AllEvent].filter(event => event.eventName.toLowerCase().includes(searchValue.toLowerCase())) })
        this.setState({ PastEvent: [...this.state.PastEvent].filter(event => event.eventName.toLowerCase().includes(searchValue.toLowerCase())) })
        this.setState({ Swiperdata: [...this.state.Swiperdata].filter(event => event.eventName.toLowerCase().includes(searchValue.toLowerCase())) })
      } else {
        this.filterEvents()
      }
    };
    // Handle showMoreInfo change
    const handleMoreInfo = (item) => {
      if (this.state.showCreateEvent == true) {
        if (this.state.showMoreInfo == true) {
          this.setState({ moreInfoData: [], showMoreInfo: false })

        }
        else {
          const data = this.state.createEventData
          this.setState({ moreInfoData: data, showMoreInfo: true })

        }
      }
      else if (this.state.showMoreInfo == false) {
        this.setState({ moreInfoData: item, showMoreInfo: true })
      }
      else {
        this.setState({ moreInfoData: [], showMoreInfo: false })
      }
    }
    const handleCreateEvent = () => {

      if (this.state.showCreateEvent == false) {
        this.setState({ showCreateEvent: true })
      }
      else {
        this.setState({ showCreateEvent: false })
        const changedState = { ...this.state.createEventData, step: 0, EventPicture: "" };
        this.setState({ createEventData: changedState })
      }
    }


    const handleError = (input) => {
      if (input == "isError") {
        console.log("if input is Error passed")
        if (this.state.createEventData.isError == false) {
          console.log("if error is false")
          var changedState = { ...this.state.createEventData, [input]: true };
        }
        else {
          console.log("if error is true or else")
          var changedState = { ...this.state.createEventData, [input]: false };
        }
        this.setState({ createEventData: changedState })

      }
    }

    const handleEventDateTime = (inputDateTime) => {
      this.setState({
        eventDateTime: inputDateTime.toISOString()
      })
      const changedState = [this.state.createEventData]
      changedState[0].time = inputDateTime.toISOString()
      this.setState({ changedState })
      console.log("habdleEventDateTime", this.state.changedState)
    }

    const handleCreateEventData = input => e => {
      console.log("input", this.state.createEventData)

      if (input == "step") {
        const { step } = this.state.createEventData;
        const changedState = { ...this.state.createEventData, [input]: step + 1 };
        this.setState({ createEventData: changedState })
        if (step == 2) {
          handleMoreInfo()
        }
      }

      else if (input == "catName" || input == "Virtual") {
        const changedState = { ...this.state.createEventData, [input]: e.value, [input + "Options"]: e };
        this.setState({ createEventData: changedState })
      }
      else if (input == "eventDate" || input == "eventTime") {
        if (input == "eventDate") {
          if (this.state.createEventData.eventTime.length == 0) {
            const changedState = { ...this.state.createEventData, [input]: e.target.value, time: e.target.value + "T" + "00:00" + ":00.000Z" };
            this.setState({ createEventData: changedState })
          }
          else {
            const changedState = { ...this.state.createEventData, [input]: e.target.value, time: e.target.value + "T" + this.state.createEventData.eventTime + ":00.000Z" };
            this.setState({ createEventData: changedState })
          }
        }
        else if (input == "eventTime") {
          if (this.state.createEventData.eventDate.length == 0) {
            const changedState = { ...this.state.createEventData, [input]: e.target.value, time: "2021-01-01" + "T" + e.target.value + ":00.000Z" };
            this.setState({ createEventData: changedState })
          }
          else {
            const changedState = { ...this.state.createEventData, [input]: e.target.value, time: this.state.createEventData.eventDate + "T" + e.target.value + ":00.000Z" };
            this.setState({ createEventData: changedState })
          }
        }
      }
      else {
        const changedState = { ...this.state.createEventData, [input]: e.target.value };
        this.setState({ createEventData: changedState })
      }
    }

    // const updateTime = () => {
    //   const changedState = { ...this.state.createEventData, time: this.state.createEventData.eventDate + "T" + this.state.createEventData.eventTime + ":00.000Z" };
    //   this.setState({ createEventData: changedState })
    // }

    const handleCreateEventPicture = input => {
      const changedState = { ...this.state.createEventData, EventPicture: input };
      this.setState({ createEventData: changedState })
    }

    const selectStyles = {
      menu: (provided) => ({
        ...provided,
        padding: 10,
        cursor: 'pointer',
      }),
      input: (provided) => ({
        ...provided,
        padding: 0,
        height: 50,
        minHeight: 50
      }),
      container: (provided) => ({
        ...provided,
        padding: 0,
        height: 50,
        minHeight: 50,
        width: 200,
        minWidth: 200,
        '@media only screen and (max-width: 666px)': { width: '80%', minWidth: '80%' },
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        padding: 0,
        height: 50,
        minHeight: 50
      }),
      valueContainer: (provided) => ({
        ...provided,
        height: 50,
        minHeight: 50
      }),
      control: (base, state) => ({
        ...base,
        '&:hover': { borderColor: 'gray' }, // border style on hover
        border: '1px solid lightgray', // default border color
        boxShadow: 'none', // no box-shadow
        padding: 0,
        height: 50,
        minHeight: 50
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#fff1bd' : 'none',
        '&:hover': { backgroundColor: '#fff1bd' },
        '&:focused': { backgroundColor: 'none' },
        color: '#222222',
        cursor: 'pointer',
        padding: 10,
      }),
      placeholder: base => ({
        ...base,
        fontSize: '1em',
        color: '#151371',
        fontWeight: 500,
      }),
      indicatorSeparator: base => ({
        ...base,
        display: "none",
      }),
      groupHeading: base => ({
        ...base,
        fontSize: '1.02em',
        color: '#888',
        fontWeight: 700,
      }),
    }

    const fetchEvents = async () => {
      let dateNow = Date.now();
      const response = await axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/event', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
      this.setState({
        Swiperdata: response.data.data.filter(function (event) {
          let eventTime = new Date(event.time).getTime();
          if (dateNow < eventTime && event.approved !== null && event.approved === true) {
            return event.Featured == true;
          }
        })
      })
      this.setState({
        AllEvent: response.data.data.filter(function (event) {
          let eventTime = new Date(event.time).getTime();
          if (dateNow < eventTime && event.approved !== null && event.approved === true) {
            return event
          }
        })
      })
      this.setState({
        PastEvent: response.data.data.filter(function (event) {
          let eventTime = new Date(event.time).getTime();
          if (dateNow > eventTime && event.approved !== null && event.approved === true) {
            return event
          }
        })
      })
      console.log(response)
    }

    const onChangeInput = async (value) => {
      // await fetchEvents()
      // let filterValue = value.value

      if (await value != null) {
        console.log(value.value)
        if (value.value == 'Virtual Event') this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            Virtual: true
          }
        }))
        if (value.value == 'In-person Event') this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            Virtual: false
          }
        }))
        if (value.value == 'Week') this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            event_time: 'week'
          }
        }))
        if (value.value == 'Month') this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            event_time: 'month'
          }
        }))


      } else {
        fetchEvents()
      }

      this.filterEvents()
    }

    const { categoryButtons, categoryButtonsActiveIndex, catergoryFilterLoading, AllEvent, PastEvent, Swiperdata } = this.state

    const categoryFilter = async (idx) => {
      this.setState({ catergoryFilterLoading: true })
      await this.setState({ categoryButtonsActiveIndex: idx })

      if (idx == categoryButtonsActiveIndex) {
        await this.setState({ categoryButtonsActiveIndex: -1 })
      }

      if (idx != -1) {
        if (idx == 0) {

          if (await this.state.categories.includes('Webinar') || this.state.categories.includes('Lecture')) {
            this.setState({ categories: [...this.state.categories].filter(category => category != 'Webinar' && category != 'Lecture') })
          } else {
            await this.setState({ categories: [...this.state.categories, 'Webinar', 'Lecture'] })
          }
        }
        await this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            catName: this.state.categories
          }
        }))
        if (idx == 1) {
          if (this.state.categories.includes('Workshop') || this.state.categories.includes('Conference')) {
            this.setState({ categories: [...this.state.categories].filter(category => category != 'Workshop' && category != 'Conference') })
          } else {
            await this.setState({ categories: [...this.state.categories, 'Workshop', 'Conference'] })
          }
        }
        await this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            catName: this.state.categories
          }
        }))
        if (idx == 2) {
          if (this.state.categories.includes('Hackathon')) {
            this.setState({ categories: [...this.state.categories].filter(category => category != 'Hackathon') })
          } else {
            await this.setState({ categories: [...this.state.categories, 'Hackathon'] })
          }
        }
        await this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            catName: this.state.categories
          }
        }))
        if (idx == 3) {
          if (this.state.categories.includes('Incubator') || this.state.categories.includes('Accelerator')) {
            this.setState({ categories: [...this.state.categories].filter(category => category != 'Incubator' && category != 'Accelerator') })
          } else {
            await this.setState({ categories: [...this.state.categories, 'Incubator', 'Accelerator'] })
          }
        }
        await this.setState(prevState => ({
          filter: {
            ...prevState.filter,
            catName: this.state.categories
          }
        }))

      } else {

      }
      this.filterEvents()
    }

    const searchNoValue = (e) => {
      if (!e.target.value) fetchEvents()
    }

    const resetFilter = async () => {
      await this.setState({ categories: [] })
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          catName: this.state.categories
        }
      }))

      this.setState({ categoryButtonsActiveIndex: -1 })

      this.state.categoryButtons.map(button => {
        button.activebtn = false
      })
      this.filterEvents()
    }

    console.log(this.state.userEvents)

    return (

      <div className="event_wrapper" >
        <div className="event_container">
          <div className="event_search">
            <form className="input" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" className="events_search" placeholder="What event are you looking for?" onChange={(e) => searchNoValue(e)} />
              <button>
                <i className="fas fa-search tw-text-xl tw-h-auto"></i>
              </button>

            </form>
            <Select
              id="form-filter"
              instanceId="form-filter"
              options={options}
              className="event_Select tw-select-none"
              placeholder={'Filter Search'}
              styles={selectStyles}
              closeMenuOnSelect={true}
              isSearchable={false}
              isClearable={true}
              onChange={onChangeInput}
            />
          </div>

          <div className="event_title_button">

            {categoryButtons.map((button, idx) => (
              <EventCategoryFilterButton
                key={idx}
                category={button.category}
                description={button.description}
                categoryFilter={categoryFilter}
                idx={idx}
                filter={this.state.filter}
                activebtn={button.activebtn}
                onClickActive={() => button.activebtn = !button.activebtn}
              />
            ))}


            {([...categoryButtons].filter(button => button.activebtn == true)).length > 0 ? <button onClick={() => resetFilter()}>Reset</button> : ''}

          </div>


          <div className="event_divide">
            <h1>Featured&nbsp;Events</h1>
            <div />
          </div>


          {/* LOADING SKELETON HERE */}
          <div className='swiper-container'>
            {this.state.loading
              ?
              <div className='swiper-wrapper' style={{ width: '100%' }}>
                <div className='swiper-slide'>
                  <EventCardFeaturedSkeleton />
                </div>
                <div className='swiper-slide'>
                  <EventCardFeaturedSkeleton />
                </div>
                <div className='swiper-slide'>
                  <EventCardFeaturedSkeleton />
                </div>
                <div className='swiper-slide'>
                  <EventCardFeaturedSkeleton />
                </div>
              </div>

              : catergoryFilterLoading
                ?
                <div className='swiper-wrapper' style={{ width: '100%' }}>
                  <div className='swiper-slide'>
                    <EventCardFeaturedSkeleton />
                  </div>
                  <div className='swiper-slide'>
                    <EventCardFeaturedSkeleton />
                  </div>
                  <div className='swiper-slide'>
                    <EventCardFeaturedSkeleton />
                  </div>
                  <div className='swiper-slide'>
                    <EventCardFeaturedSkeleton />
                  </div>
                </div>
                : Swiperdata.length < 1
                  ?
                  <div className='swiper-wrapper' style={{ width: '100%' }}>
                    <div className="text-center" style={{ width: '100%' }}>Sorry, no events match your filters</div>
                  </div>
                  :
                  <div className='swiper-wrapper'>

                    {this.state.Swiperdata.map((event, index) => (
                      <div className='swiper-slide' key={index}>
                        <EventCardFeatured
                          item={event}
                          attended={event}
                          userSavedEvents={userSavedEvents}
                          key={index}
                          handleMoreInfo={handleMoreInfo}
                          active={active}
                          setClickRegister={setClickRegister}
                          userEvent={this.state.userEvents}
                          clickRegister={clickRegister}
                          userData={userData}
                          token={token}
                          allsavedEvents={allsavedEvents}
                        />
                      </div>
                    ))}
                  </div>

            }

            <div className="swiper-navigation_container">
              <div className="swiper-navigation">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
            </div>
          </div>

          <div className="event_divide event_divide_second">
            <h1>Active&nbsp;Events</h1>
            <div />
          </div>
          {/* LOADING SKELETON HERE */}
          <div className="event_container_section">
            {this.state.loading
              ?
              <div className="cards">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
              : catergoryFilterLoading
                ?
                <div className="cards">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
                :
                <div className="cards">
                  {AllEvent.length < 1 && <div>Sorry, no events match your filters</div>}
                  {this.state.AllEvent.map((events, index) => (
                    <EventCard
                      item={events}
                      attended={userSavedEvents}
                      userSavedEvents={userSavedEvents}
                      userEvent={this.state.userEvents}
                      key={index}
                      handleMoreInfo={handleMoreInfo}
                      active={active}
                      setClickRegister={setClickRegister}
                      clickRegister={clickRegister}
                      userData={userData}
                      token={token}
                      allsavedEvents={allsavedEvents}
                      getUserSavedEvents={this.getUserSavedEvents}
                    />
                  ))}
                </div>
            }
          </div>

          <div className="event_divide">
            <h1>Past&nbsp;Events</h1>
            <div />
          </div>
          {/* LOADING SKELETON HERE */}
          <div className="event_container_section">
            {this.state.loading
              ?
              <div className="cards">
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </div>
              : catergoryFilterLoading
                ?
                <div className="cards">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
                :
                <div className="cards">
                  {PastEvent.length < 1 && <div>Sorry, no events match your filters</div>}
                  {this.state.PastEvent.map((events, index) => (
                    <EventCard
                      item={events}
                      attended={userSavedEvents}
                      userSavedEvents={userSavedEvents}
                      userEvent={this.state.userEvents}
                      key={index}
                      handleMoreInfo={handleMoreInfo}
                      active={active}
                      setClickRegister={setClickRegister}
                      clickRegister={clickRegister}
                      userData={userData}
                      token={token}
                      allsavedEvents={allsavedEvents}
                      getUserSavedEvents={this.getUserSavedEvents}
                    />
                  ))}
                </div>}

          </div>

          <div className="event_myevent">
            <div className="event_divide">
              <h1>My&nbsp;Events</h1>
              <div />
            </div>


            {userData !== null ? (
              <div className='swiper-container'>

                {
                  this.state.loading
                    ?
                    <div className='swiper-wrapper' style={{ width: '100%' }}>
                      <div className='swiper-slide'>
                        <EventCardFeaturedSkeleton />
                      </div>
                      <div className='swiper-slide'>
                        <EventCardFeaturedSkeleton />
                      </div>
                      <div className='swiper-slide'>
                        <EventCardFeaturedSkeleton />
                      </div>
                      <div className='swiper-slide'>
                        <EventCardFeaturedSkeleton />
                      </div>
                    </div>

                    : catergoryFilterLoading
                      ?
                      <div className='swiper-wrapper' style={{ width: '100%' }}>
                        <div className='swiper-slide'>
                          <EventCardSkeleton />
                        </div>
                        <div className='swiper-slide'>
                          <EventCardSkeleton />
                        </div>
                        <div className='swiper-slide'>
                          <EventCardSkeleton />
                        </div>
                        <div className='swiper-slide'>
                          <EventCardSkeleton />
                        </div>
                      </div>
                      : this.state.userEvents.length === 0
                        ? <div className="container d-flex justify-content-center">
                          <h1>You have not registered to any events yet.</h1>
                        </div>
                        :
                        <>
                          <div className='swiper-wrapper'>
                            {this.state.userEvents.filter(e => ((e.attending === "yes" || e.attending === "maybe") && e.event_id !== null)).map((events, index) => (
                              <div className='swiper-slide' key={index}>
                                <EventCard
                                  item={events.event_id}
                                  attended={events}
                                  userEvent={this.state.userEvents}
                                  key={index}
                                  handleMoreInfo={handleMoreInfo}
                                  active={active}
                                  setClickRegister={setClickRegister}
                                  clickRegister={clickRegister}
                                  userData={userData}
                                  token={token}
                                  userSavedEvents={userSavedEvents}
                                  allsavedEvents={allsavedEvents}
                                  getUserSavedEvents={this.getUserSavedEvents}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="swiper-navigation_container">
                            <div className="swiper-navigation">
                              <div className="swiper-button-prev"></div>
                              <div className="swiper-button-next"></div>
                            </div>
                          </div>
                        </>
                }
              </div>

            ) :
              <div className="event_login">
                <h1>Participating in events you enjoy</h1>
                <h2>There are many activities for you to help improve yourself.</h2>

                <div className="event_login_button">
                  <button className="event_login_gradient-button" onClick={() => {
                    this.setState({ showMyEvent: true })
                  }}>
                    Log In
                  </button>
                </div>
              </div>
            }
            {this.state.showMyEvent ?
              <div className="create_event">
                <div className="create_event-shadow" onClick={() => { this.setState({ showMyEvent: false }) }}>
                </div>
                <div id="create_event-container" className="create_event-container">
                  <Card />
                </div>
                <i className="close_icon fas fa-times close-icon" onClick={() => { this.setState({ showMyEvent: false }) }}></i>
              </div> :
              ""
            }
          </div>

          <div className="event_create_own_event">

            <div className="event_end_text">
              <h1>Create your own event</h1>
              <h6>It could be a virtual party, workshop, meetup or seminar. Host any event you want and share for people to join.</h6>
              <div className="event_submit_button">
                <button className="gradient-button gradient-button-1" onClick={() => { this.setState({ showCreateEvent: true }) }}>
                  + Submit an Event
                </button>
              </div>
            </div>
            <div className="images-box">
              <div className="image">
                <img className="event_img1" src="/assets/images/event1.png" />
              </div>
              <div className="image_two_three_four">
                <div className="image">
                  <img className="event_img2" src="/assets/images/event2.png" />
                </div>
                <div className="image_three_four">
                  <div className="image">
                    <img className="event_img3" src="/assets/images/event3.png" />
                  </div>
                  <div className="image">
                    <img className="event_img4" src="/assets/images/event4.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showCreateEvent &&
            <CreateEvent
              data={this.state.createEventData}
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
              eventDateTime={this.state.eventDateTime}
            />
          }
          {this.state.showMoreInfo &&
            <EventMoreInfo
              data={this.state.moreInfoData}
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
              createEventData={this.state.createEventData}
              handleEventDateTime={handleEventDateTime}
              eventDateTime={this.state.eventDateTime}
              allEvent={this.state.AllEvent}
              myEvent={this.state.myEvent}
              userEvent={this.state.userEvents}
              getUserSavedEvents={this.getUserSavedEvents}
            />
          }
          {this.props.clickRegister && !this.props.active ?
            <div className="create_event">
              <div className="create_event-shadow" onClick={() => {
                setClickRegister(false)
              }}>
              </div>
              <div id="create_event-container" className="create_event-container">
                <Card />
              </div>
              <i className="close_icon fas fa-times close-icon" onClick={() => { setClickRegister(false) }}></i>
            </div> :
            ""
          }
        </div>
      </div>
    );
  }
}

export default Event;

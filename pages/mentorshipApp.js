/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import MentorshipAppSideBar from '../components/mentorship/MentorshipAppSideBar';
import MentorshipAppSwipeCards from '../components/mentorship/MentorshipAppSwipeCards';
import { successToast, errorToast } from '../contexts/utils/toasts';

export class mentorshipApp extends Component {
  state = {
    step: 1,
    likedList: [],
    openedChatCharacter: {},
    show: false,
    mentorshipInfo: {},
    is_mentor: '',
    swipeCards: [],
    matchedPeople: [
      {
        id: 5,
        url: 'https://i.pinimg.com/originals/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
        name: 'Shot Code',
        company: 'MPA',
        occupation: 'Frontend Developer',
        country: 'USA',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero eum corrupti quasi, quas libero eos!',
        matchedTimestamp: '2:10 PM 4/20/2021',
        messages: [
          {
            id: 1,
            read: true,

            message: 'Good Morning!',
            messageTimeStamp: '9:32 AM EST 4/20/2021',
          },
          {
            id: 2,
            read: false,

            message: 'I will be your Mentor!😊',
            messageTimeStamp: '9:34 AM EST 4/20/2021',
          },
          {
            id: 3,
            read: true,

            message: "Let's start coding👩‍💻",
            messageTimeStamp: '9:59 AM EST 4/20/2021',
          },
        ],
        toDo: [],
      },
      {
        id: 7,
        url: 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg',
        name: 'Oleg N',
        company: 'MPA',
        occupation: 'Data Science',
        country: 'USA',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero eum corrupti quasi, quas libero eos!',
        matchedTimestamp: '5:10 PM 4/20/2021',
        messages: [
          {
            id: 1,
            fromId: 7,
            new: false,
            message: 'Good Morning!',
            messageTimeStamp: '9:32 AM EST 4/20/2021',
          },
          {
            id: 2,
            fromId: 7,
            new: false,
            message: 'Are you ready to code?',
            messageTimeStamp: '9:34 AM EST 4/20/2021',
          },
        ],
        toDo: [
          {
            id: 2,
            fromId: 7,
            message: 'Code the mentor page',
            messageTimeStamp: '9:32 AM EST 4/20/2021',
          },
        ],
      },
    ],
  };

  componentDidMount() {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo')).user;

    if (token == null || userInfo == {}) {
      this.redirect();
    }
    let url;
    if (userInfo.is_mentee) {
      url = `${process.env.BASE_URI}/suggestions/mentors/${userInfo._id}`;
    } else if (userInfo.is_mentor) {
      url = `${process.env.BASE_URI}/suggestions/mentes/${userInfo._id}`;
    }
    console.log(url);
    axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.message.mentorshipInfo);
        const sugggestions = res.data.message.sgs.map((mentorship) => ({
          id: mentorship._id,
          url: mentorship.user_id.profilePicture,
          name: `${mentorship.user_id.firstName} ${mentorship.user_id.lastName}`,
          occupation: mentorship.occupation,
          company: mentorship.work_place,
          description: mentorship.user_id.bio,
          country: mentorship.user_id.location,
        }));
        // console.log(sugggestions);
        this.setState({
          swipeCards: sugggestions,
          show: true,
          mentorshipInfo: res.data.message.mentorshipInfo,
          is_mentor: !!userInfo.is_mentor,
        });
      })
      .catch((err) => {
        errorToast('Something went wrong, please contact us.');
      });
  }

  messagesStep = () => {
    const { step } = this.state;
    this.setState({
      step: 1,
    });
  };

  todoStep = () => {
    const { step } = this.state;
    this.setState({
      step: 2,
    });
  };

  chatRedirectStep = (character) => {
    const { step } = this.state;
    this.setState({
      openedChatCharacter: character,
      step: 3,
    });
  };

  handleSwipeRight = (character) => {
    const { likedList } = this.state;
    if (!likedList.includes(character)) {
      this.setState((prevState) => ({
        likedList: [...prevState.likedList, character],
      }));
    }
    let mentorship;
    const token = window.localStorage.getItem('jwtToken');
    let user = JSON.parse(localStorage.getItem('userInfo'));
    user = user.user;
    if (this.state.is_mentor) {
      mentorship = {
        mentor_id: this.state.mentorshipInfo._id,
        mentee_id: character.id,
      };
    } else {
      mentorship = {
        mentee_id: this.state.mentorshipInfo._id,
        mentor_id: character.id,
      };
    }
    console.log(mentorship);
    const updateUser = () => {
      const userUpdate = {
        has_mentorship: true,
      };
      axios
        .patch(
          `${process.env.BASE_URI}/user/updateProfile/${user._id}`,
          userUpdate,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          successToast('User Updated!');
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ token, user: res.data.data }),
          );
          console.log(res.data.data);
        })
        .catch((err) => {
          errorToast('Something went wrong, please contact us.');
        });
    };
    axios
      .post('${process.env.BASE_URI}/mentorship/', mentorship, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        successToast('Mentorship Added!');
        updateUser();
        window.location.href = this.state.is_mentor
          ? 'mentorship/mentor'
          : 'mentorship/mentee';
      })
      .catch((err) => {
        errorToast('Something went wrong, please contact us.');
      });
  };

  updateSwipeCards = (character) => {
    const { swipeCards } = this.state;
    const copyswipeCards = swipeCards.filter((person) => person !== character);
    this.setState({
      swipeCards: copyswipeCards,
    });
  };

  undoLastSwipe = (character) => {
    const { swipeCards, likedList } = this.state;
    if (likedList.includes(character)) {
      likedList.pop();
    }
    swipeCards.push(character);

    this.setState({
      swipeCards,
      likedList,
    });
  };

  redirect = () => {
    window.location.href = '/auth';
  };

  render() {
    const {
      likedList, swipeCards, matchedPeople, step, openedChatCharacter,
    } = this.state;

    const values = {
      likedList,
      swipeCards,
      matchedPeople,
      step,
      openedChatCharacter,
    };
    return (
      <div>
        <Layout pageTitle="MPA - Mentorship App">
          <HomepageNav />
          <section className="home-section">
            <div className="tw-flex lg:tw-hidden tw-font-redhat tw-bg-white tw-bg-opacity-0 tw-h-600px md:tw-h-auto tw-w-1300px tw-rounded-3xl tw-shadow-mentor tw-relative tw-text-black">
              {this.state.show && (
                <MentorshipAppSwipeCards
                  handleSwipeRight={this.handleSwipeRight}
                  updateSwipeCards={this.updateSwipeCards}
                  undoLastSwipe={this.undoLastSwipe}
                  values={values.swipeCards}
                />
              )}

              <MentorshipAppSideBar
                values={values.matchedPeople}
                step={values.step}
                openedChatCharacter={values.openedChatCharacter}
                messagesStep={this.messagesStep}
                todoStep={this.todoStep}
                chatRedirectStep={this.chatRedirectStep}
              />
            </div>
            <div className="tw-hidden lg:tw-block">
              <p>
                The Swiping Application is only available on screens wider than
                911px
              </p>
            </div>
          </section>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default mentorshipApp;

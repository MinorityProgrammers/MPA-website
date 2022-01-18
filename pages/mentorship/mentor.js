import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import MentorDashboard from '../../components/mentorship-dashboard/MentorDashboard';
import MenteeDetail from '../../components/mentorship-dashboard/MenteeDetail';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import ComingSoon from '../../components/ComingSoon';

const Mentor = () => {
  const [update, setUpdate] = useState(false);
  const [currentMentor, setCurrentMentor] = useState();
  const [mentorshipData, setMentorshipData] = useState();
  const [active, setActive] = useState([true, false]);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [actionActive, setActionActive] = useState({
    sprintsViewActive: true,
    calendarActive: false,
    evaluationActive: false,
    resourceActive: false,
  });
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }
  const handleClick = () => {
    setHide(!hide);
  };
  // console.log(mentorshipData.mentorship);
  // Get User Data
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    const token = window.localStorage.getItem('jwtToken');
    // you can use this user_id for testing 6112814512ba1a43bd29c7ec or
    //  create a new mentee and mentorship with the user_id you want to use. || user.user._id

    if (token != null) {
      axios
        .get(`${process.env.BASE_URI}/mentorship/user/${user.user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          setMentorshipData(res.data.data);
        });
    }
  }, [update]);
  return (
    <div>
      <Layout>
        <>
          <HomepageNav open={open} setOpen={setOpen} />
          <SidebarTwo
            open={open}
            setOpen={setOpen}
            links={links}
            active="Home"
            handleClick={handleClick}
          />
          {hide === false && <ComingSoon closeClick={handleClick} />}
          <section className="home-section">
            <div className={styles.mentorSection}>
              {active[1] && (
                <MenteeDetail
                  menteeData={data}
                  mentorshipData={mentorshipData}
                  sprints={mentorshipData.sprint}
                  setData={setData}
                  setActive={setActive}
                  actionActive={actionActive}
                  setActionActive={setActionActive}
                  currentMentor={currentMentor}
                  setCurrentMentor={setCurrentMentor}
                />
              )}
              {active[0] && mentorshipData && (
                <MentorDashboard
                  update={update}
                  setUpdate={setUpdate}
                  menteeData={data}
                  mentorshipData={mentorshipData}
                  actionActive={actionActive}
                  setActionActive={setActionActive}
                  setData={setData}
                  setActive={setActive}
                  currentMentor={currentMentor}
                  setCurrentMentor={setCurrentMentor}
                />
              )}
            </div>
          </section>
          <Footer />
        </>
      </Layout>
    </div>
  );
};

export default Mentor;

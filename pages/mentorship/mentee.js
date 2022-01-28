import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import MenteeDashboard from '../../components/mentorship-dashboard/MenteeDashboard';
import MentorDetail from '../../components/mentorship-dashboard/MentorDetail';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import ComingSoon from '../../components/ComingSoon';

const Mentee = () => {
  const [currentMentee, setCurrentMentee] = useState();
  const [mentorshipData, setMentorshipData] = useState();
  const [update, setUpdate] = useState(false);
  const [active, setActive] = useState([true, false]);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [actionActive, setActionActive] = useState({
    sprintsViewActive: true,
    calendarActive: false,
    eventActive: false,
    resourceActive: false,
    evaluations: false,
  });
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }
  const handleClick = () => {
    setHide(!hide);
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    const token = window.localStorage.getItem('jwtToken');

    if (token != null) {
      axios
        .get(`${process.env.BASE_URI}/mentorship/user/${user.user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
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
                <MentorDetail
                  mentee={mentorshipData.mentorship.mentee_id}
                  menteeData={data}
                  setData={setData}
                  setActive={setActive}
                  actionActive={actionActive}
                  setActionActive={setActionActive}
                  currentMentee={currentMentee}
                  setCurrentMentee={setCurrentMentee}
                />
              )}
              {active[0] && mentorshipData && (
                <MenteeDashboard
                  mentorshipData={mentorshipData}
                  actionActive={actionActive}
                  setActionActive={setActionActive}
                  setData={setData}
                  setActive={setActive}
                  currentMentee={currentMentee}
                  setCurrentMentee={setCurrentMentee}
                  setUpdate={setUpdate}
                  update={update}
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

export default Mentee;

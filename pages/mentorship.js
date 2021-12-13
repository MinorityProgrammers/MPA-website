import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SidebarTwo from '../components/SidebarTwo';
import { MentorshipRegister } from '../components/mentorship/MentorshipRegister';
import links from '../contexts/utils/links';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';

function mentorship() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const router = useRouter();

  const goback = () => {
    if (data === null) {
      setTimeout(() => {
        router.push('/mentorshipProgram');
      }, 200);
    }
  };

  return (
    <div>
      <Layout pageTitle="MPA - Mentorship">
        {data === null && goback()}
        {data && (
          <>
            <HomepageNav
              open={open}
              setOpen={setOpen}
              setData={setData}
              page="MentorshipProgram"
            />
            <SidebarTwo
              open={open}
              setOpen={setOpen}
              links={links}
              active="Home"
              handleClick={handleClick}
            />
            {hide == false && <ComingSoon closeClick={handleClick} />}
            <section className="home-section">
              <MentorshipRegister />
            </section>
            <Footer />
          </>
        )}
      </Layout>
    </div>
  );
}

export default mentorship;

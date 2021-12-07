import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/provider";
import HomepageNav from "../components/homepage/HomepageNav";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Event from "../components/Events/Event";
import SidebarTwo from "../components/SidebarTwo";
import links from "../contexts/utils/links";
import { useDetectOutsideClick } from "../components/UseDetectOutsideClick";

const events = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [token, setToken] = useState("");
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = window.localStorage.getItem("jwtToken");
    const userInfo = window.localStorage.getItem("userInfo");

    if (token == null || userInfo == {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
  }, [data]);

  return (
    <div>
      <Layout pageTitle="MPA - Events">
        <div className="section__styles__events">
          <HomepageNav
            open={open}
            setOpen={setOpen}
            page="Events"
            setToken={setToken}
          />
          <SidebarTwo
            open={open}
            setOpen={setOpen}
            links={links}
            active="Home"
            handleClick={handleClick}
          />
          <Event
            userData={userData}
            active={active}
            setClickRegister={setClickRegister}
            clickRegister={clickRegister}
            token={token}
          />
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default events;

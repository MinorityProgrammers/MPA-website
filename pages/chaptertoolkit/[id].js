import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import HomepageNav from '../../components/homepage/HomepageNav';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import NavOne from '../../components/NavOne';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import ComingSoon from '../../components/ComingSoon';
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';
import ToolkitContent from '../../components/chapter/chapter-toolkit-content/toolkitContent.component';
import ToolkitHeader from '../../components/chapter/chapter-toolkit-header/toolkitHeader.component';
import ChapterWrapper from '../../components/chapter/chapter-wrapper/ChapterWrapper.component';

const ChapterPage = function () {
  const [toolkits, setToolkits] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URI}/ChapterToolKit`)
      .then((res) => res.data)
      .then((msg) => msg.data)
      .then((data) => {
        setToolkits(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    setHide(!hide);
  };

  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const router = useRouter();
  const { id } = router.query;
  const toolkitsArrayToObj = {};
  const navlinks = toolkits.map((toolkit) => {
    toolkitsArrayToObj[toolkit.slug] = toolkit;
    return { link: toolkit.slug, name: toolkit.name };
  });

  const data = toolkitsArrayToObj[id];

  return (
    <Layout pageTitle="Chapter Toolkit">
      <HomepageNav open={open} setOpen={setOpen} page="Chapter-toolkit" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide == false && <ComingSoon closeClick={handleClick} />}
      <ChapterWrapper>
        <ToolkitHeader />

        {data ? (
          <ToolkitContent links={navlinks} data={data} />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 400, fontSize: 54 }}
          >
            <h1 style={{ color: 'white' }}>Loading...</h1>
          </div>
        )}
      </ChapterWrapper>

      <Footer />
    </Layout>
  );
};

export default ChapterPage;

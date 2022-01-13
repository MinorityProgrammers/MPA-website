import React from 'react';
import { BiNews } from 'react-icons/bi';
import { FaChalkboardTeacher, FaDiscord, FaGlobeAmericas } from 'react-icons/fa';
import { IoMdRocket, IoMdSchool } from 'react-icons/io';

const MpaPrograms = function () {
  return (
    <div className="col-md-11 d-flex justify-content-center">
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2"><FaGlobeAmericas /></div>
        <h5>Chapter</h5>
      </div>
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2">
          <IoMdRocket />
          {' '}
        </div>
        <h5>Startups</h5>
      </div>
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2"><IoMdSchool /></div>
        <h5>Internships</h5>
      </div>
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2"><FaChalkboardTeacher /></div>
        <h5>Mentorships</h5>
      </div>
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2"><BiNews /></div>
        <h5>Meet</h5>
      </div>
      <div className="join-head-container tw-cursor-pointer">
        <div className="join-head-icon tw-my-2"><FaDiscord /></div>
        <h5>Discord</h5>
      </div>
    </div>
  );
};

export default MpaPrograms;

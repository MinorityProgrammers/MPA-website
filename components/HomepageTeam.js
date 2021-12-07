import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import HomepageTeamCard from './HomepageTeamCard';
import HomepageMemberModal from './HomepageMemberModal';

const HomepageTeam = function () {
  const Departments = [
    {
      id: 1,
      teamName: 'Development',
      description:
        "MPA's team of developers get applications that scale delivered to the people.",
    },
    {
      id: 2,
      teamName: 'Crypto',
      description:
        'MPA crypto team are specialist in the latest blockchain solutions.',
    },
    {
      id: 3,
      teamName: 'Business',
      description:
        'MPA Business team improves business functions, prioritizing revenue, strategic partnerships, and corporate social responsibility.',
    },
    {
      id: 4,
      teamName: 'Operations',
      description:
        'MPA Operations teams deals with the day-day nontechnical tasks. ',
    },
  ];

  const [team, setTeam] = useState('ALL');
  const [allMembers, setAllMembers] = useState(true);
  const [selectedMember, setSelectedMember] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMembers, setCurrentMembers] = useState([]);

  // get data from csv file
  function getData(data) {
    // Split Department and trim string
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].Department !== null) {
        data[i].Department = data[i].Department.split(',');
        for (let j = 0; j < data[i].Department.length; j++) {
          if (data[i].Department[j] !== undefined) {
            data[i].Department[j] = data[i].Department[j].trim();
          }
          if (data[i].Department[j] !== undefined) {
            data[i].Department[j] = data[i].Department[j].trim();
          }
        }
      } else {
        data[i].Department = ['undefined'];
      }
    }

    // Check if still an internship
    data.map((d) => {
      const result = getDates(d.StartDate, d.EndDate);
      if (!d.EndDate) {
        setCurrentMembers((prevArr) => {
          prevArr.splice(0, currentMembers.length);
          return [
            ...prevArr.filter((p) => p.Employee !== currentMembers.Employee),
            d,
          ];
        });
      }
      if (result === true) {
        setCurrentMembers((prevArr) => {
          prevArr.splice(0, currentMembers.length);
          return [
            ...prevArr.filter((p) => p.Employee !== currentMembers.Employee),
            d,
          ];
        });
      }
    });
  }

  function parseData(url, callBack) {
    Papa.parse(url, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete(results) {
        callBack(results.data);
      },
    });
  }

  function getDates(startDate, stopDate) {
    const today = new Date();
    const from = new Date(startDate);
    const to = new Date(stopDate);

    if (today >= from && today <= to) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    parseData('/assets/csv/mpa.csv', getData);
  }, []);

  const handleTeam = (t) => {
    setTeam(t.teamName);
    setAllMembers(false);
  };

  const openModal = (name) => {
    setShowModal((prev) => !prev);
    setSelectedMember(name);
  };

  const getAllMembers = () => {
    setAllMembers(true);
    return (
      currentMembers
      && currentMembers
        .filter((data) => data.Employee !== null)
        .map((t) => (
          <>
            <div
              className="team__member p-2"
              key={t.Employee}
              onClick={() => openModal(t)}
            >
              <p>t.Employee</p>
              <HomepageTeamCard member={t} />
            </div>
            <HomepageMemberModal
              showModal={showModal}
              setShowModal={setShowModal}
              setSelectedMember={setSelectedMember}
              selectedMember={selectedMember}
              key={Math.random() * 3}
            />
          </>
        ))
    );
  };

  return (
    <section className="homepage__team">
      <div className="heading__number">
        <h3 className="text_white">05</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 text_white">
          &lsaquo;Team/&rsaquo;
        </h2>
        <div className="container team__homepage-container">
          <div className="team__item-text pt-3">
            <h2>
              <button className="btn btn-light" onClick={getAllMembers}>
                All
                </button>
            </h2>
          </div>
          <div className="row team__items">
            {Departments
                && Departments.map((d) => (
                  <div className="team__item-top" key={d.id}>
                    <div className="team__item-bg">
                      <div className="team__item-icon">
                        <img src="/assets/images/mpicon.svg" />
                      </div>
                    </div>
                    <div className="team__item-text">
                      <h2>
                        <button
                          className="btn btn-light"
                          onClick={() => handleTeam(d, d.id)}
                        >
                          {d.teamName}
                        </button>
                      </h2>
                      <p>{d.description}</p>
                    </div>
                  </div>
                ))}
          </div>

          <div className="row team__all-container">
            <h2>{allMembers ? 'ALL' : team}</h2>
          </div>

          <div className="row team__homepage-members">
            <div className="container text-center">
              {allMembers
                ? currentMembers
                  .filter((data) => data.Employee !== null)
                  .map((t) => (
                      <span key={t.Employee}>
                        <div
                          className="team__member p-2"
                          onClick={() => openModal(t)}
                        >
                          <HomepageTeamCard member={t} />
                        </div>
                        <HomepageMemberModal
                          showModal={showModal}
                          setShowModal={setShowModal}
                          setSelectedMember={setSelectedMember}
                          selectedMember={selectedMember}
                        />
                      </span>
                  ))
                : currentMembers
                    && currentMembers
                      .filter(
                        (data) => (data.Department !== undefined
                            && data.Department[0] === team)
                          || (data.Department !== undefined
                            && data.Department[1] === team
                            && team !== 'ALL'),
                      )
                      .map((t) => (
                        <span key={t.Employee}>
                          <div
                            className="team__member p-2"
                            onClick={() => openModal(t)}
                          >
                            <HomepageTeamCard member={t} />
                          </div>
                          <HomepageMemberModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            setSelectedMember={setSelectedMember}
                            selectedMember={selectedMember}
                          />
                        </span>
                      ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageTeam;

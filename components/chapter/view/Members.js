import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './chapter.module.scss';
import { errorToast } from '../../../contexts/utils/toasts';

const Members = ({ token, location }) => {
  const [members, setMembers] = useState([]);

  const searchHandler = () => {
    // const filterLocation = data.filter(
    //   (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
    //   || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
    //   ,
    // );
    // setLocations(filterLocation);
  };
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const dataFormat = (member) => {
    const date = new Date(member.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    return `Member Since ${month} ${year}`;
  };
  useEffect(() => {
    if (token && location._id) {
      console.log(location._id);
      axios
        .get(`http://localhost:5000/api/v1/joinChapter/location/${location._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const arr = [];
          res.data.data.forEach((member) => {
            if (member.user_id) {
              const newMember = {
                name: `${member.user_id.firstName} ${member.user_id.lastName}`,
                id: member.user_id._id,
                role: member.role,
                date: dataFormat(member),
                facebook: member.user_id.FacebookLink,
                profilePicture: member.user_id.profilePicture,
                linkedin: member.user_id.LinkedinLink,
              };
              arr.push(newMember);
            }
          });
          // const results = users.filter((element) => element !== null);
          const unique = getUniqueListBy(arr, '_id');
          setMembers(unique);
        })
        .catch(() => {
          errorToast('Network Error');
        });
    } else {
      errorToast('Please login to continue');
    }
  }, []);
  console.log(members);
  return (
    <div className={styles.members}>
      <div className={styles.titleContainer}>
        <h2>Chapter Members</h2>
        <h2 style={{ fontWeight: '500' }}>
          Total:
          {' '}
          {members.length}
        </h2>
      </div>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      <div className={styles.cardContainer}>

        {members.map((member) => (
          <div>
            <img src={member?.profilePicture} alt="profile-img" />
            <h2>{member?.name}</h2>
            <h3>{member?.role}</h3>
            <p>{member?.date}</p>
            <div className="">
              <a href={member?.linkedin}>
                {' '}
                <i className="fab fa-linkedin" />
              </a>
              {/* <i className="fab fa-twitter-square" /> */}
              <a href={member?.facebook}>
                <i className="fab fa-facebook-square" />
              </a>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Members;

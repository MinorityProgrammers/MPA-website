import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './chapter.module.scss';
import { errorToast } from '../../../contexts/utils/toasts';

const Members = ({ token, location, data }) => {
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState([]);
  const [update, setUpdate] = useState(false);

  const searchHandler = () => {
    // const filterLocation = data.filter(
    //   (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
    //   || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
    //   ,
    // );
    // setLocations(filterLocation);
  };
  const acceptReq = (id) => {
    axios
      .post(`http://localhost:5000/api/v1/joinChapter/accept/${id}`, { location: location._id }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUpdate(!update);
      })
      .catch(() => {
        errorToast('Network Error');
      });
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
                member_id: member._id,
                role: member.role,
                approved: member.approved,
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
          const approved = unique.filter((e) => (
            e.approved
          ));
          setApprovedMembers(approved);
          setTotalMembers(unique);
        })
        .catch(() => {
          errorToast('Network Error');
        });
    } else {
      errorToast('Please login to continue');
    }
  }, [update]);
  return (
    <div className={styles.approvedMembers}>
      <div className={styles.titleContainer}>
        <h2>Chapter Members</h2>
        <h2 style={{ fontWeight: '500' }}>
          Total:
          {' '}
          {approvedMembers.length}
        </h2>
      </div>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      <div className={styles.cardContainer}>

        {(location?.added_by._id === data?._id
          ? totalMembers : approvedMembers).map((member) => (
            <div key={member?.id}>
              {(location?.added_by._id === data?._id && !member.approved)
             && (
             <a
               onClick={() => acceptReq(member?.member_id)}
               className={styles.approveBtn}
             >
               approve
             </a>
             )}
              <img src={member?.profilePicture} alt="profile-img" />
              <h2>{member?.name}</h2>
              <h3>{member?.role}</h3>
              <p>{member?.date}</p>
              <div className={styles}>
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

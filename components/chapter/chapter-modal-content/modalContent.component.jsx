import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import React from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { VscGithubAlt } from 'react-icons/vsc';
import axios from 'axios';
import styles from './modalContent.module.css';
import { errorToast, successToast } from '../../../contexts/utils/toasts';

const ModalContent = ({
  token,
  location,
  description,
  chapter_leader,
  chapter_type,
  member_size,
  date_founded,
  _id,
  userJoinRequests,
}) => {
  const handleJoin = () => {
    if (token) {
      axios
        .post(
          `${process.env.BASE_URI}/joinChapter`,
          {
            chapterLocation_id: _id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          successToast('You have successfully joined a chapter');
          setTimeout(location.reload(true), 2000);
        })
        .catch((err) => {
          try {
            // errorToast(err.response.data.data.message.msg);
            console.log(err);
          } catch (error) {
            errorToast('Network Error');
          }
        });
    } else {
      errorToast('Please login to continue');
    }
  };

  return (
    <div
      onMouseOver={() => {}}
      onFocus={() => {}}
      onMouseOut={() => {}}
      onBlur={() => {}}
      className={styles.container}
    >
      <div className={styles.logo}>
        <img src="/assets/images/mp_gradient_rock.svg" alt="logo" />
      </div>
      <div className={styles.name}>{location}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.leaderAndSize}>
        <div>
          <div className={styles.title}>chapter leader</div>
          <div className={styles.content}>{chapter_leader}</div>
        </div>
        <div className={styles.end}>
          <div className={styles.title}>member size</div>
          <div className={styles.content}>{member_size}</div>
        </div>
      </div>
      <div className={styles.dateAndType}>
        <div>
          <div className={styles.title}>date founded</div>
          <div className={styles.content}>{date_founded}</div>
        </div>
        <div className={styles.end}>
          <div className={styles.title}>chapter type</div>
          <div className={styles.content}>{chapter_type}</div>
        </div>
      </div>
      {!userJoinRequests.includes(_id) ? (
        <div onClick={handleJoin} className={styles.joinButton}>
          Join
        </div>
      ) : (
        <div className={styles.joinButton}>Cancel Request</div>
      )}

      <div className={styles.icons}>
        <FiFacebook />
        <FiTwitter className={styles.icon} />
        <FiInstagram className={styles.icon} />
        <IoPaperPlaneOutline className={styles.icon} />
        <VscGithubAlt className={styles.icon} />
      </div>
    </div>
  );
};

export default ModalContent;

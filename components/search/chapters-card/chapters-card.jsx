import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { VscGithubAlt } from 'react-icons/vsc';
import axios from 'axios';
import Moment from 'moment';
import styles from './chapters-card.module.css';

import { errorToast, successToast } from '../../../contexts/utils/toasts';

Moment.locale('en');

const ChaptersCard = function ({ data, token, userJoinRequests }) {
  const {
    location, description, chapter_leader, chapter_type, member_size, date_founded, _id,
  } = data;

  const handleJoin = () => {
    if (token) {
      axios.post(`${process.env.BASE_URI}/joinChapter`, {
        chapterLocation_id: _id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          successToast('You have successfully joined a chapter');
          setTimeout('location.reload(true);', 2000);
        })
        .catch((err) => {
          try {
            errorToast(err.response.data.data.message.msg);
          } catch (error) {
            errorToast('Network Error');
          }
        });
    } else {
      errorToast('Please login to continue');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/assets/images/mp_gradient_rock.svg" alt="logo" />
      </div>
      <div className={styles.name}>{typeof (location) !== 'object' && location}</div>
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
          <div className={styles.content}>{Moment(date_founded).format('LL')}</div>
        </div>
        <div className={styles.end}>
          <div className={styles.title}>chapter type</div>
          <div className={styles.content}>{chapter_type}</div>
        </div>
      </div>
      {
        !userJoinRequests
          ? <div onClick={handleJoin} className={styles.joinButton}>Join</div>
          : !userJoinRequests.includes(_id) ? <div onClick={handleJoin} className={styles.joinButton}>Join</div> : <div className={styles.joinButton}>Cancel Request</div>
      }
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

export default ChaptersCard;

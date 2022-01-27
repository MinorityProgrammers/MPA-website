import Moment from 'moment';
import React, { useState, useEffect } from 'react';
import styles from './events-popup.module.css';
import ReviewAction from './review-action';

Moment.locale('en');

const ApproveAction = ({
  reveiwFeedback, value, setValue, popup,
}) => {
  const [changeStatus, setStatus] = useState(false);

  useEffect(() => {
    setStatus(false);
  }, [popup]);

  return (
    <div>
      {!changeStatus ? (
        <div className={styles.approveActionWrapper}>
          <div className={styles.approveActionContainer}>
            <div>Approved</div>
            <div> By: Shot</div>
            <div className={styles.reviewedDate}>
              Date:
              {Moment(Date.now()).format('LL')}
            </div>
          </div>

          <div onClick={() => setStatus(true)} className={styles.actionButton}>
            Change Status
          </div>
        </div>
      ) : (
        <ReviewAction
          reveiwFeedback={reveiwFeedback}
          value={value}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default ApproveAction;

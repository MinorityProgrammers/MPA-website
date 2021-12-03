import styles from './events-popup.module.css';

const ReviewAction = ({ reveiwFeedback, value, setValue }) => {
  return (
    <div>
      <form className={styles.approvalContainer} onSubmit={e => { e.preventDefault(); reveiwFeedback(e, 'approved') }}>
        <div className={styles.statusAction}>
          <button type="submit" className={styles.approveButton}>Approve</button>
        </div>
      </form>

      <form className={styles.rejectionContainer} onSubmit={e => { e.preventDefault(); reveiwFeedback(e, 'rejected') }}>
        <label>
          <div className={styles.rejectionLabel}>Rejection:</div>
          <textarea className={styles.rejectionText} value={value} onChange={setValue} />
        </label>
        <div>
        </div>
        <div className={styles.statusAction}>
          <button type="submit" className={styles.rejectButton}>Reject</button>
        </div>
      </form>
    </div>
  )
}

export default ReviewAction;
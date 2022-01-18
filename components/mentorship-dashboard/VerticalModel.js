import { Modal } from 'react-bootstrap';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';

function VerticalModel({ menteeData, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={stylesE.modelContent}
    >
      <Modal.Body className={stylesE.model}>
        <h2>{menteeData.name}</h2>
        <h3>{menteeData.github}</h3>
        <img src={menteeData.qr_url} alt="QR" />
        <div className={stylesE.qrActions}>
          <img src="/assets/images/mentor/share.png" alt="share" />
          <img src="/assets/images/mentor/download.png" alt="download" />
          <img src="/assets/images/mentor/message.png" alt="message" />
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default VerticalModel;

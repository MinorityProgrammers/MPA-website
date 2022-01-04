import React from 'react';
import { timeago } from '../helpers/timeago';

// commented out copy and delete for now (still has inline css from developing/testing)
// const copyMessage = () => {
//   console.log('copied');
// }

const ChatMessage = ({ user, message, own, deleteMessage }) => {
  // const [isHovering, setIsHovering] = useState(false);
  return own ? (
    // <div className="own-message" onMouseOver={()=>setIsHovering(true)} onMouseOut={()=> setIsHovering(false)}>
    //   <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    //     {isHovering &&
    //     (<>
    //     <div style={{cursor:"pointer", borderRadius:'5px', backgroundColor:'lightgray', height:'25px', marginRight:'10px',display:'flex', justifyContent:'center', alignItems:'center'}} onClick={deleteMessage}>
    //       <span style={{color:'black'}}>Delete</span>
    //     </div>
    //     <div style={{cursor:"pointer", borderRadius:'5px', backgroundColor:'lightgray', height:'25px', marginRight:'10px',display:'flex', justifyContent:'center', alignItems:'center'}} onClick={copyMessage}>
    //       <span style={{color:'black'}}>Copy</span>
    //     </div>
    //     </>)}
    <div className="own-message">
      <div className="message-top">
        <p>{message.message}</p>
      </div>
      {/* </div> */}
      <div className="message-bottom">{timeago(message.createdAt)}</div>
    </div>
  ) : (
    // <div className="message"  onMouseOver={()=>setIsHovering(true)} onMouseOut={()=> setIsHovering(false)}>
    //   <div style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
    <div className="message">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <img
          className="message-icon"
          alt="profile picture"
          src={user.profilePicture || '../../assets/images/profile.png'}
        />
        <div className="message-top">
          {/* Image from sender?? */}
          {/* <p className='message-content'>{message.message}</p> */}
          {/* For now */}
          <p>{message.message}</p>
        </div>
      </div>
      {/* {isHovering &&
        <div style={{cursor:"pointer", borderRadius:'5px', backgroundColor:'lightgray', height:'25px', marginLeft:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={copyMessage}>
          <span style={{color:'black'}}>Copy</span>
        </div>}
      </div> */}

      <div className="message-bottom">{timeago(message.createdAt)}</div>
    </div>
  );
};

export default ChatMessage;

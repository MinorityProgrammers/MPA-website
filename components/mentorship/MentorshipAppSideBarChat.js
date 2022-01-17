import React from 'react';

const MentorshipAppSideBarChat = ({ character, messagesStep }) => (
  <div className="tw-w-1/2 tw-h-600px tw-bg-white tw-rounded-r-3xl tw-flex tw-flex-col tw-z-10 tw-relative">
    <div
      className="tw-absolute tw-top-4 tw-right-4 tw-cursor-pointer"
      onClick={messagesStep}
    >
      CLOSE
    </div>
    <div className="tw-flex tw-p-4 tw-pb-2 tw-shadow-md">
      <div className="img tw-w-14 tw-h-14">
        <img
          className="tw-object-cover tw-rounded-full tw-h-full tw-w-full"
          src={character.url}
          alt="avatar_image"
        />
      </div>
      <div className="text tw-flex-1 tw-px-6 tw-pb-4">
        <h4 className="tw-font-medium tw-text-2xl">{character.name}</h4>
        <p>
          {character.occupation}
          ,
          {' '}
          {character.country}
        </p>
      </div>
    </div>
    <hr />
    <div className="tw-flex-1 tw-bg-#F9F9F9 tw-px-4">
      <div className="tw-text-center tw-italic tw-text-textGray">
        You matched on
        {character.matchedTimestamp}
      </div>
      {character.messages.map((msg) => (
        <div className="tw-mt-4 tw-p-4 tw-bg-#EAEFF2 tw-w-max tw-max-w-280px tw-rounded-2xl">
          {msg.message}
        </div>
      ))}
    </div>
    <form className="tw-flex tw-shadow-md-top">
      <input
        className="tw-p-4 tw-outline-none tw-w-full"
        placeholder="Type your message.."
        type="text"
      />
      <button type="button" className="tw-p-2 tw-bg-activeOrange tw-rounded-br-3xl tw-font-bold tw-text-white">
        SEND
      </button>
    </form>
  </div>
);

export default MentorshipAppSideBarChat;

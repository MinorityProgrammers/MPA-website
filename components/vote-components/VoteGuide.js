import React, { useState } from 'react';
import VoteCard from './VoteCard';
import VoteModal from './VoteModal';

const cards = [
  {
    id: 1,
    title: 'How to vote',
    imgUrl: '/assets/images/vote/vote-logo.png',
    size: 'small',
    modalSubTitle:
      'You need to register for a MPA account, connect your Web3 wallet, and be holding $MPA governance token, to vote on the Minority Programmers governance platform.',
    btn1: 'You are Signed-In',
    btn2: 'Connect Wallet',
    btn3: 'Ready To Vote',
    detail: 'yes',
  },
  {
    id: 2,
    title: 'What you can vote for',
    imgUrl: '/assets/images/vote/vote-for.png',
    size: 'small',
    modalTitle: 'Here is what you can vote on',
    modalDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    btnGradient: 'View Proposals',
    detail: 'yes',
  },
  {
    id: 3,
    title: 'Voting process',
    imgUrl: '/assets/images/vote/vote-process.png',
    detail: 'no',
  },
  {
    id: 4,
    title: 'Earn $ minority by Voting',
    imgUrl: '/assets/images/vote/vote-money.png',
    size: 'small',
    detail: 'no',
  },
  {
    id: 5,
    title: 'Creating proposals',
    imgUrl: '/assets/images/vote/vote-proposal.png',
    detail: 'no',
  },
  {
    id: 6,
    title: 'How to get $MPA to Vote',
    imgUrl: '/assets/images/vote/vote-ecoin.png',
    size: 'small',
    modalTitle: 'How to get $MPA to vote',
    modalDescription:
      'Only $MINORITY token holders are eligible for $MPA, get some $MINORITY and head over to the Faucet page to request your $MPA token, each wallet is entitled to only one succesful request for $MPA',
    btnGradient: 'View Proposals',
    detail: 'yes',
  },
];

const VoteGuide = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  const openModal = (c) => {
    setSelectedCard(c);
    setShowModal(!showModal);
  };

  return (
    <div className="vote-section guide">
      <div className="container vote-header">
        <h2>Voting resource guide</h2>
        <p>
          Check out our valuable resources to get insight on how you could win
          $MINORITY by having your ecosystem proposals turn to features in thie
          app.
        </p>
      </div>
      <div className="container vote-info">
        {cards.map((card, index) => (
          <span key={`${index + 1}`}>
            <div onClick={() => openModal(card)}>
              <VoteCard card={card} />
            </div>
            <VoteModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedCard={selectedCard}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
export default VoteGuide;

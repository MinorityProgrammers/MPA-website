import React, {useState} from 'react'
import Binary from './Binary'

const ProposalBox = () => {

  const [myProposals, setMyProposals] = useState(92);
  const [otherActions, setOtherActions] = useState(60);
  const [spent, setSpent] = useState(12);
  const [total, setTotal] = useState(140);

  return (
    <div className="proposal__box__container">
      
      <div className="proposal">
        <Binary />
        <div className="back__to__proposals">
          <p className="proposal__text">Go Back to <span className="bold">My Proposals</span>.</p>
          <button className="go__back">
            <i className="fas fa-chevron-left mobile-arrow"></i>
            <p className="go__back__text">Back</p>
          </button>
        </div>

      </div>

      <div className="net">
        <div className="line"></div>


        <div className="earned">
          <p>$ Minority earned through <span className="light__purple">My Proposals</span> - <span className="light__purple">{myProposals}</span></p>
          <p>$ Minority earned through <span className="pink">Other Actions</span> - <span className="purple">{otherActions}</span></p>
          <p>$ Minority <span className="light__purple">Spent</span> over 2 months - <span className="light__purple">{spent}</span></p>
        </div>

        <div className="total__earned">
          <p>Total net $ Minority - <span>{total}</span></p>
        </div>


      </div>

    </div>
  )
}

export default ProposalBox

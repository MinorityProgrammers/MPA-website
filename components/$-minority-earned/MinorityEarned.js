import React from 'react'
import HomepageNav from '../HomepageNav'
import MinorityEarnedHeader from './MinorityEarnedHeader'
import MinorityEarnedActions from './MinorityEarnedActions'
import ProposalBox from './ProposalBox'

const MinorityEarned = () => {

  const styling = {
    background: "linear-gradient(90deg, #FF00B8 0%, #FF655B 50.8%, #FFC700 100%)",
    height: 'auto',
    display: 'flex'
  }

  return (
    <div style={styling}>
      <div className="minority__earned__page__wrapper">
        <MinorityEarnedHeader />
        <MinorityEarnedActions />
        <ProposalBox />
      </div>
    </div>
  )
}

export default MinorityEarned

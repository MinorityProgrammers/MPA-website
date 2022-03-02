import React from 'react';

const StartupRoadmap = ({
  index,
  item,
  setHoverRoadMap,
  hoverRoadMap,
  milestones,
}) => (
  <div
    onMouseEnter={() => {
      setHoverRoadMap(index);
    }}
    onMouseLeave={() => {
      setHoverRoadMap(-1);
    }}
    className="roadmap"
  >
    <div className="roadmap-header">
      {item.year}
    </div>
    <div className="roadmap-content">
      {item.target}
    </div>
    {hoverRoadMap === index && (
      <>
        {milestones[index] && (
          <div className="roadmap-hover">
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>
                  {milestones[index].milestoneName}
                </div>
                <div>Launch Day</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  {' '}
                  Description of milesone
                </div>
                <div>{milestones[index].milestoneDescription}</div>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Definition of Done</div>
              <div>{milestones[index].definitionOfDone}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  Est. Date of completion
                </div>
                <div>{milestones[index].completionDate}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>% of funding unlocked</div>
                <div>{milestones[index].fundingUnlocked}</div>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

export default StartupRoadmap;

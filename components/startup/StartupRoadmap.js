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
    style={{ marginRight: '10px', position: 'relative' }}
  >
    <div
      style={{
        textAlign: 'center',
        backgroundColor: 'var(--mpa-pink)',
        color: 'white',
      }}
    >
      {item.year}
    </div>
    <div
      style={{ border: '1px solid black', marginTop: '10px', padding: '5px' }}
    >
      {item.target}
    </div>
    {hoverRoadMap === index && (
      <>
        {milestones[index] && (
          <div
            style={{
              border: '1px solid black',
              marginTop: '10px',
              padding: '5px',
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: '100',
              width: '300px',
              fontSize: '12px',
            }}
          >
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

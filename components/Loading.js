import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';

const Loading = ({
  isRouteChanging,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  });

  return (
    <>
      <div className="container" style={{ opacity: `${isFinished ? 0 : 1}`, pointerEvents: 'none', transition: `opacity ${animationDuration}ms linear` }}>
        <div
          className="bar"
          style={{
            background: '#474BFD', height: '2px', left: 0, marginLeft: `${(-1 + progress) * 100}%`, position: 'fixed', top: 0, transition: `margin-left ${animationDuration}ms linear`, width: '100%', zIndex: 99999,
          }}
        >
          <div
            className="spinner"
            style={{
              boxShadow: '0 0 10px #474BFD, 0 0 5px #474BFD', display: 'block', height: '100%', opacity: 1, position: 'absolute', right: 0, transform: 'rotate(3deg) translate(0px, -4px)', width: '100px',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Loading;

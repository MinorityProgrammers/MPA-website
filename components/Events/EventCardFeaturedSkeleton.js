import React from 'react';
import ContentLoader from 'react-content-loader';

const EventCardFeaturedSkeleton = function () {
  return (

    <div className="eventcard_container">
      <div className="eventcard_image">
        <ContentLoader
          viewBox="0 0 720 510"
          speed={1}
          width={720}
          height={510}
          backgroundColor="#cbc8c8"
          foregroundColor="#ecebeb"
        >
          {/* LEFT IMAGE SKELETON */}
          <rect x="0" y="0" rx="6" ry="6" width="370" height="510" />
          {/* RIGHT TITLE SKELETON */}
          <rect x="380" y="0" rx="6" ry="6" width="330" height="210" />
          {/* RIGHT CONTENT SKELTON */}
          <rect x="380" y="220" rx="6" ry="6" width="330" height="140" />
          {/* RIGHT BUTTON SKELETON */}
          <rect x="380" y="370" rx="6" ry="6" width="330" height="140" />
        </ContentLoader>
      </div>
    </div>

  );
};

export default EventCardFeaturedSkeleton;

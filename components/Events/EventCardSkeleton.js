import react from "react";
import ContentLoader from "react-content-loader";

const EventCardSkeleton = () => {
  return (

    <div className="eventcard_container">
      <div className="eventcard_image">
        <ContentLoader
          viewBox="0 0 350 510"
          speed={1}
          width={350}
          height={510}
          backgroundColor="#cbc8c8"
          foregroundColor="#ecebeb"
        >
          {/* IMAGE SKELETON */}
          <rect x="0" y="0" rx="6" ry="6" width="350" height="256" />
          {/* TITLE SKELETON */}
          <rect x="0" y="267" rx="6" ry="6" width="350" height="48" />
          {/* CONTENT SKELETON */}
          <rect x="0" y="325" rx="6" ry="6" width="350" height="68" />
          {/* BUTTONS SKELETON */}
          <rect x="0" y="403" rx="6" ry="6" width="350" height="40" />
        </ContentLoader >
      </div>


    </div>

  )
};

export default EventCardSkeleton;
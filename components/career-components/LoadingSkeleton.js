import Skeleton from "react-loading-skeleton";
import JobStubSkeleton from "./JobStubSkeleton";
import CurrentJobSkeleton from "./CurrentJobSkeleton";

const LoadingSkeleton = (props) => {
  return (
    <div className="jobs-main-container">
      {/* LEFT HAND SIDE */}
      <div className="jobs-main-container-list">
        <JobStubSkeleton />
        <JobStubSkeleton />
        <JobStubSkeleton />
        <JobStubSkeleton />
      </div>

      {/* RIGHT HAND SIDE */}
      {props.showCurrent ? (
        <>
          <p>
            <Skeleton height={50} />
          </p>
          <div
            className="right-grid jobs-main-container-single"
            style={{ boxShadow: "0 0 7px rgb(162, 144, 147)" }}
          >
            <CurrentJobSkeleton />
          </div>
        </>
      ) : (
        <>
          <p>
            <Skeleton height={50} />
          </p>
          <div
            className="jobs-main-container-single"
            style={{ display: "none" }}
          ></div>
        </>
      )}
    </div>
  );
};

export default LoadingSkeleton;

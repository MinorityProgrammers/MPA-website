import EventsCard from '../events-card/events-card';
import StartupsCard from '../startups-card/startups-card';
import JobsCard from '../jobs-card/jobs-card';
import ChaptersCard from '../chapters-card/chapters-card';
import UsersCard from '../users-card/users-card';
import styles from './search.module.css';

const SearchResult = function ({
  result, token, userJoinRequests, category,
}) {
  return (
    <>
      {
        category === 'all'
          ? Object.keys(result).map((key) => (
            key === 'jobs'
              ? result[key].length ? result[key].map((data) => (
                <JobsCard key={data._id} data={data} />
              )) : <div className={styles.noResult} />
              : key === 'startups'
                ? result[key].length ? result[key].map((data) => (
                  <StartupsCard key={data._id} data={data} />
                )) : <div className={styles.noResult} />
                : key === 'events'
                  ? result[key].length ? result[key].map((data) => (
                    <EventsCard key={data._id} data={data} />
                  )) : <div className={styles.noResult} />
                  : key === 'users'
                    ? result[key].length ? result[key].map((data) => (
                      <UsersCard key={data._id} data={data} />
                    )) : <div className={styles.noResult} />
                    : key === 'chapter'
                      ? result[key].length ? result[key].map((data) => (
                        <ChaptersCard key={data._id} data={data} userJoinRequests={userJoinRequests} token={token} />
                      )) : <div className={styles.noResult} />
                      : null
          ))
          : category === 'jobs'
            ? result[category].length ? result[category].map((data) => (
              <JobsCard key={data._id} data={data} />
            )) : (
              <div className={styles.no_result}>
                No result found in
                {category}
              </div>
            )
            : category === 'events'
              ? result[category].length ? result[category].map((data) => (
                <EventsCard key={data._id} data={data} />
              )) : (
                <div className={styles.no_result}>
                  No result found in
                  {category}
                </div>
              )
              : category === 'startups'
                ? result[category].length ? result[category].map((data) => (
                  <StartupsCard key={data._id} data={data} />
                )) : (
                  <div className={styles.no_result}>
                    No result found in
                    {category}
                  </div>
                )
                : category === 'users'
                  ? result[category].length ? result[category].map((data) => (
                    <UsersCard key={data._id} data={data} />
                  )) : (
                    <div className={styles.no_result}>
                      No result found in
                      {category}
                    </div>
                  )
                  : category === 'chapter'
                    ? result[category].length ? result[category].map((data) => (
                      <ChaptersCard key={data._id} data={data} userJoinRequests={userJoinRequests} token={token} />
                    )) : (
                      <div className={styles.no_result}>
                        No result found in
                        {category}
                      </div>
                    )
                    : null
      }
    </>
  );
};

export default SearchResult;

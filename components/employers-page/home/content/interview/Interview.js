import styles from "./candidate_interview.module.css";
import InterviewCard from "../../Card/InterviewCard";

const interviewItem = [
  {
    name: "Michael Montgometry",
    description: "Front End Developer",
    date: "Mon, August 9",
    time: "11:30am EST"
  },
  {
    name: "Michael Montgometry",
    description: "Front End Developer",
    date: "Mon, August 9",
    time: "11:30am EST"
  },
  {
    name: "Michael Montgometry",
    description: "Front End Developer",
    date: "Mon, August 9",
    time: "11:30am EST"
  },
  {
    name: "Michael Montgometry",
    description: "Front End Developer",
    date: "Mon, August 9",
    time: "11:30am EST"
  }
];

const Interview = ({ scheduled }) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Interview schedule</h1>
        <span>({scheduled}) scheduled</span>
      </div>
      <div>
        <hr className={styles.horizontal} />
      </div>
      {/** INDIVIDUAL SCHEDULE CARDS */}
      {interviewItem.slice(0, 3).map((item, index) => (
        <div key={index}>
          <InterviewCard
            name={item.name}
            description={item.description}
            date={item.date}
            time={item.time}
          />
        </div>
      ))}
    </div>
  );
};

export default Interview;

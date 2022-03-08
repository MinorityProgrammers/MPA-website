import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '../chapter-select/select.component';
import styles from './leaderboard.module.css';
import ChapterStat from '../chapter-stat/chapterStat.component';
import LeadboardCards from './LeadboardCards';

const Leaderboard = () => {
  const [stats, setStats] = useState([]);
  const [filteredStats, setFilteredStats] = useState([]);
  const [selectItems, setItems] = useState([]);
  const [toggle, toggleDropdown] = useState(false);
  const [topChapter, setTopChapter] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URI}/chapter_stats`)
      .then((res) => res.data)
      .then((msg) => msg.data)
      .then((data) => {
        const newData = data.map((d, idx) => ({ ...d, number: idx + 1 }));
        const items = newData;
        items.sort((a, b) => b.amount - a.amount);
        setStats(items);
        setFilteredStats(items);
        const categories = new Set();
        newData.forEach((val) => {
          categories.add(val.category);
        });
        const arrayUniqueByKey = [...new Map(items.map(
          (item) => [item.name, item],
        )).values()];
        setTopChapter(arrayUniqueByKey.slice(0, 3));
        setItems([{ monthly: false }, { weekly: false }, { all: false }]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    toggleDropdown(!toggle);
  };

  const handleChange = (val) => {
    const newStats = stats
      .filter((stat) => (val === 'all' ? stat : stat.category === val))
      .map((stat, idx) => ({ ...stat, number: idx + 1 }));
    setFilteredStats(newStats);
    const items = newStats;
    items.sort((a, b) => b.amount - a.amount);
    const arrayUniqueByKey = [...new Map(items.map(
      (item) => [item.name, item],
    )).values()];
    setTopChapter(arrayUniqueByKey.slice(0, 3));
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} container`}>
        <div className={styles.heading}>
          <div className={styles.title}>CHAPTER LEADERBOARD</div>
          <div className={styles.text}>
            Top programs with the most points

          </div>
        </div>
        <div className={styles.navbar}>

          <Select
            onClick={handleClick}
            onChange={handleChange}
            toggle={toggle}
            items={selectItems}
            defaultValue="all"
            setItems={setItems}
          />
        </div>
        {topChapter.length > 0 && <LeadboardCards topChapter={topChapter} />}
        <div className={styles.stats}>
          {filteredStats.length > 0
            && filteredStats.slice(0, 4).map((stat, idx) => (
              <ChapterStat key={stat._id} {...stat} idx={idx} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

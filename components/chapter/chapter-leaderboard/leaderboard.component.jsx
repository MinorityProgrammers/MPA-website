import Select from '../chapter-select/select.component';
import styles from './leaderboard.module.css';
import ChapterStat from '../chapter-stat/chapterStat.component';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [stats, setStats] = useState([]);
  const [filteredStats, setFilteredStats] = useState([]);
  const [selectItems, setItems] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);
  const [toggle, toggleDropdown] = useState(false);
  const [pageToDisplay, setPageToDisplay] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumDisplay = 5;

  const [startView, setStartView] = useState();
  const [endView, setEndView] = useState();
  const [currentView, setCurrentView] = useState(0);
  const [viewToDisplay, setViewToDisplay] = useState([]);
  const [pageLink, setPageLink] = useState([]);
  const [pointer, setPointer] = useState(1);
  const view = 3;

  useEffect(() => {
    axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/chapter_stats')
      .then(res => res.data)
      .then(msg => msg.data)
      .then(data => {
        let newData = data
          .map((d, idx) => ({ ...d, number: idx + 1 }))
        setStats(newData);
        setFilteredStats(newData)
        let categories = new Set();
        for (let val of newData) {
          categories.add(val.category)
        }
        const select = [...categories].map(c => ({ [c]: false }))
        setItems([...select, { all: false }])
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const pLink = [];
    for (let i = 0; i < Math.ceil(filteredStats.length / pageNumDisplay); i++) {
      pLink.push(i + 1)
    }
    setPageLink(pLink)
    setStartView(currentView);
    setEndView(currentView + view);
    setViewToDisplay(pLink.slice(startView, endView));
  }, [currentView, startView, endView, filteredStats])

  useEffect(() => {
    setPageEnd(currentPage * pageNumDisplay)
    setPageStart((currentPage * pageNumDisplay) - pageNumDisplay)
    setPageToDisplay(filteredStats.slice(pageStart, pageEnd))
  }, [pageStart, pageEnd, currentPage, filteredStats]);

  const handlePage = num => {
    setCurrentPage(num);
    setPointer(num)
  }

  const handleClick = () => {
    toggleDropdown(!toggle)
  }

  const handlePrev = () => {
    if (currentPage === 1) return;
    setCurrentPage(c => c - 1);
    setPointer(p => p - 1)
    if (pointer === viewToDisplay[0]) {
      setCurrentView(c => c - 1)
    }
  }

  const handleNext = () => {
    if (currentPage === pageLink.length) return
    setCurrentPage(c => c + 1);
    setPointer(p => p + 1)
    if (pointer === viewToDisplay[viewToDisplay.length - 1]) {
      setCurrentView(c => c + 1)
    }
  }

  const handleChange = val => {
    const newStats = stats
      .filter(stat => (
        val === 'all' ? stat : stat.category === val
      ))
      .map((stat, idx) => (
        { ...stat, number: idx + 1 }
      ))
    setFilteredStats(newStats);
    setCurrentPage(1);
    setCurrentView(0);
    setPointer(1);
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.title}>CHAPTER LEADERBOARD</div>
          <div className={styles.text}>Total points from programs</div>
        </div>
        <div className={styles.tag}>03</div>
        <div className={styles.navbar}>
          <div className={styles.paginate}>
            <div onClick={handlePrev} className={styles.pageSelector}><i className="fas fa-chevron-left "></i></div>
            {
              viewToDisplay.map(link => (
                <div key={link}
                  onClick={() => handlePage(link)}
                  className={styles.pageSelector}
                  style={{ borderBottom: pointer === link ? '2px solid white' : '' }}
                >P{link}</div>
              ))
            }
            {pageLink.length !== viewToDisplay[viewToDisplay.length - 1] && <div className={styles.pageLengthInfo}>...P{pageLink.length}</div>}
            <div onClick={handleNext} className={styles.pageSelector}><i className="fas fa-chevron-right"></i></div>
          </div>

          <Select onClick={handleClick} onChange={handleChange} toggle={toggle} items={selectItems} defaultValue='category' setItems={setItems} />
        </div>

        <div className={styles.stats}>
          {
            pageToDisplay && pageToDisplay
              .map((stat, idx) => (
                <ChapterStat key={stat._id} {...stat} idx={idx} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;

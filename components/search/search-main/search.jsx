import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import styles from './search.module.css';

import SearchResult from './search-result';
import PopularSearch from './popular-search';
import SearchCategory from './search-category';

const Search = function ({ token }) {
  const { query: { _q } } = useRouter();

  const searchUrl = 'https://koinstreet-learn-api.herokuapp.com/api/v1/search';

  const popularSearches = ['bootstrap', 'technology', 'frontend']; // popular-searches keys should come from the database and not hard coded this way.
  const searchCategories = ['jobs', 'events', 'users', 'startups', 'chapter'];

  const [category, setCategory] = useState('all');
  const [searchValue, setValue] = useState('');
  const [activeSearch, setActiveSearch] = useState('all');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);

  const postSearch = async (url, input) => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await axios.post(url, { keyword: input });
      const { data } = res.data;
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleCategory = (category) => {
    setCategory(category);
    setActiveSearch(category);
  };

  const handleTags = (tag) => {
    setCategory('all');
    setActiveSearch(tag);
    setValue(tag[0].toUpperCase() + tag.substring(1));
    postSearch(searchUrl, tag);
  };

  const handleChange = (e) => {
    const regex = /\b\w+/;
    if (!(regex.test(e.target.value)) && e.target.value !== '') return;
    Router.push({
      pathname: '/search',
      query: { _q: e.target.value },
    });
  };

  useEffect(() => {
    setValue(_q);
    postSearch(searchUrl, decodeURI(_q));
  }, [_q]);

  const isResult = (res) => {
    const resArr = Object.keys(res);
    return resArr.some((el) => res[el].length > 0);
  };

  /*
the code below is for the chapter result to enable
users join chapter from the search page.
*/

  useEffect(() => {
    if (token) {
      axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/joinChapter/userJoinedRequests', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      })
        .then((data) => {
          setJoinRequests(data.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const findrequests = (requests) => {
    const allRequests = [];

    requests.map((all) => {
      allRequests.push(all.chapterLocation_id);
    });

    return allRequests;
  };

  const userJoinRequests = findrequests(joinRequests);

  /*
  the code above is for the chapter result to enable
  users join chapter from the search page.
  */

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <section className={styles.searchSection}>
          <div className={styles.searchCategories}>
            <ul className={styles.categoriesList}>
              <li
                onClick={() => handleCategory('all')}
                className={`${styles.categoriesItem} ${category === 'all' ? styles.clicked : null}`}
              >
                All
              </li>
              {
                searchCategories && searchCategories.map((category, idx) => (
                  <SearchCategory
                    key={idx}
                    category={category}
                    activeSearch={activeSearch}
                    handleCategory={handleCategory}
                  />
                ))
              }
            </ul>
          </div>

          <div className={styles.searchBox}>
            <label className={styles.searchLabel} htmlFor="search"><i className=" fas fa-search" /></label>
            <input className={styles.searchInput} type="text" value={searchValue} onChange={handleChange} placeholder="Events, Jobs, Etc..." />
          </div>

          <div className={styles.searchTags}>
            <h3 className={styles.tagTitle}>Popular Searches</h3>
            <ul className={styles.tagsList}>
              {
                popularSearches && popularSearches.map((tag, idx) => (
                  <PopularSearch
                    key={idx}
                    handleTags={handleTags}
                    tag={tag}
                    activeSearch={activeSearch}
                  />
                ))
              }
            </ul>
          </div>
        </section>
        <section className={styles.resultSection}>
          {
            loading
              ? (new Array(4).fill(null)).map((_, idx) => (
                <div key={idx} style={{ width: '100%' }}>
                  <Skeleton width={320} height={160} />
                  <br />
                  <br />
                  <Skeleton width={320} height={30} />
                  <br />
                  <Skeleton width={320} height={30} />
                </div>
              ))
              : isResult(result)
                ? <SearchResult result={result} category={category} token={token} userJoinRequests={userJoinRequests} />
                : <div className={styles.no_result}>No result found</div>
          }
        </section>
      </main>
    </div>
  );
};

export default Search;

import React, { useState } from 'react';
import Select from 'react-select';
import styles from './chapter.module.scss';
import Categories from './CategoriesIcons';

const Governance = ({ customStyles, DropdownIndicator }) => {
  const [active, setActice] = useState(true);
  const [currentCategory, setCatergory] = useState('');

  const searchHandler = (e) => {
    // const filterLocation = data.filter(
    //   (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
    //   || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
    //   ,
    // );
    // setLocations(filterLocation);
  };
  return (
    <div className={styles.proposal}>
      <div className={styles.titleContainer}>
        <h2>Proposal</h2>
        <div className={styles.topPartBtns}>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            closeMenuOnSelect={false}
            defaultValue={{ label: 'All', value: 'All' }}
            name="passion"
            // value={values.passion}
            options={[{ label: 'All', value: 'All' }]}
            // onChange={(e) => handleChange({ target: { name: 'passion', value: e } })}
          />
        </div>
      </div>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={!active ? styles.active : ''} onClick={() => setActice(false)}>New Proposal</div>
          <div className={active ? styles.active : ''} onClick={() => setActice(true)}>Proposals</div>
        </div>
        <div className={styles.right}>
          {active && (
          <div className={styles.proposalCard}>
            <div>
              <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
              <div className={styles.detail}>
                <h2>ThreeBox Integration </h2>
                <p>Type: Enhancement | Category: Incubator</p>
              </div>
              <div className={styles.approved}>Approved</div>
            </div>
            <p>Implement 3 box implementation into MPA platform.</p>
          </div>
          ) }
          {!active && (
          <div className={styles.newProposal}>
            <label> Title Of Proposal</label>
            <input type="text" />
            <label> Description Of Proposal</label>
            <input type="text" />
            <label> Choose a Category</label>
            <div className={styles.categoryContainer}>
              {Categories.map((category) => (

                <div onClick={() => setCatergory(category.text)} className={category.text === currentCategory ? styles.activeCard : ''} key={category.id}>
                  {category.icon}
                  <p>
                    {category.text}
                  </p>
                </div>
              ))}

            </div>
            <label> Proposal Type</label>
            <div style={{ height: '2px', marginBottom: '10px' }} className={styles.line} />
            <p>Would you like to add a poll to your proposal?</p>
            <p>
              {`Start Date - ${new Date().toDateString()}`}
            </p>
            <label> Pool Question</label>
            <input type="text" />
            <label>Choice 1</label>
            <input type="text" />
            <label className="tw-cursor-pointer">+ Add Choice</label>
            <div className={styles.buttons}>
              <a>Discard Changes</a>
              <p>Save & Continue </p>

            </div>
          </div>
          ) }

        </div>
      </div>
    </div>
  );
};

export default Governance;

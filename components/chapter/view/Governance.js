import React, { useState } from 'react';
import Select from 'react-select';
import styles from './chapter.module.scss';
import Categories from './CategoriesIcons';

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '25px', marginRight: '10px' }}
    src="/assets/images/settings/arrow-down.svg"
    alt="link"
  />
);

const Governance = () => {
  const [active, setActice] = useState(true);
  const [currentCategory, setCatergory] = useState('');

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      border: state.isSelected ? '2px solid #6938EF' : state.isFocused ? '2px solid #6938EF' : '2px solid transparent',
      background: '#1C1D37',
      borderRadius: '8px',
      padding: 20,
      marginTop: 8,
      width: '100%',
      cursor: 'pointer',
      fontWeight: 'bold',
      ':active': {
        // ...styles[':active'],
        background: '#1C1D37',
      },
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: ,
      display: 'flex',
      height: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      background: '#1C1D37',
      padding: 5,
      border: '1px solid #6938EF',
      width: '100px',
      textAlign: 'center',
      marginLeft: '-30px',
    }),
    container: (provided, state) => ({
      ...provided,
      height: '45px',
      margin: '0 !important',
      cursor: 'pointer',
      paddingLeft: '8px',
      border: `1px solid ${state.isFocused ? '#6938EF' : ''}`,
      borderRadius: '120px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      border: '1px solid #6938EF',
      borderRadius: '100px',
      background: 'transparent',
      padding: '5px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    singleValue: (provided) => {
      const opacity = 1;
      const color = '#fff';
      const transition = 'opacity 300ms';

      return {
        ...provided, opacity, transition, color,
      };
    },
  };
  const a = 3;
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

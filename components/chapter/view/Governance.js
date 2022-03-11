import React from 'react';
import Select from 'react-select';
import styles from './chapter.module.scss';

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '25px', marginRight: '10px' }}
    src="/assets/images/settings/arrow-down.svg"
    alt="link"
  />
);

const Governance = () => {
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
          <div>New Proposal</div>
          <div>Proposals</div>
        </div>
        <div className={styles.right}>
          <div>
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
          <div>
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
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default Governance;

import React from 'react';
import Select from 'react-select';
import Account from '../../Account';

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '20px', marginRight: '10px' }}
    src="/assets/images/settings/arrow-down.svg"
    alt="link"
  />
);

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'AUD', value: 'AUD' },
  { label: 'JPY', value: 'JPY' },
  { label: 'EUR', value: 'EUR' },
];

const TotalBalance = () => {
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
      width: '150px',
      textAlign: 'center',
      marginLeft: '-70px',

    }),
    container: (provided) => ({
      ...provided,
      height: '100%',
      margin: '0 !important',
      cursor: 'pointer',
      paddingLeft: '8px',
      border: '1px solid #6938EF',
      borderRadius: '100px',
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

  return (
    <div className="total-balance-card-dashboard-wallet">
      <div className="inner-total-balance-card-dashboard-wallet d-flex flex-column justify-content-between">
        {/* First Row */}
        <div className="d-flex flex-row justify-content-between" style={{}}>
          <p style={{
            fontSize: '20px', margin: 0, fontWeight: 700, color: 'white',
          }}
          >
            Total Balance
          </p>

          <Select
            name="fiat-currency"
            styles={customStyles}
            components={{ DropdownIndicator }}
            isClearable={false}
            isSearchable={false}
            options={currencies}
            defaultValue={currencies[0]}
          />
        </div>
        {/* Second Row */}
        <div style={{ marginBottom: '10px' }}>
          <p style={{
            fontSize: '34px', fontWeight: 700, margin: 0, color: 'white',
          }}
          >
            00,000
            <span style={{
              fontSize: '18px', fontWeight: 500, color: '#16A34A', marginLeft: 10,
            }}
            >
              (+ 0.00 )

            </span>
          </p>
          <p style={{
            fontSize: '18px', fontWeight: 500, color: '#8F95B2', margin: 0,
          }}
          >
            $00,000
          </p>
        </div>
        {/* Third Row */}
        <div className="d-flex flex-row justify-content-end">
          <div className="wallet-dashboard-connect">
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;

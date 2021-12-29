import React from 'react';
import countriesData from '../countries.json';
import { EmailInput, TextInput } from '../form-elements/inputs';

const SponsorshipCheckout = function ({
  organization,
  sponsorshipOption,
  email,
  countryOption,
  textarea,
  handleOrganizationInput,
  handleSponsorshipOption,
  handleEmailInput,
  handleCountryOption,
  handleTextarea,
  handleCheckoutSubmit,
}) {
  return (
    <div className="sponsor-checkout-wrapper">
      <div className="checkout-card-icons">
        <img
          src={
            sponsorshipOption === 'ally'
              ? 'assets/images/sponsorship/ally.svg'
              : sponsorshipOption === 'friend'
                ? 'assets/images/sponsorship/friend.svg'
                : sponsorshipOption === 'mafia'
                  ? 'assets/images/sponsorship/mafia.png'
                  : 'assets/images/sponsorship/ally.svg'
          }
          alt="ally icon"
        />
        <img
          className={sponsorshipOption === 'friend' ? 'mirror-img' : undefined}
          src={
            sponsorshipOption === 'ally'
              ? 'assets/images/sponsorship/ally.svg'
              : sponsorshipOption === 'friend'
                ? 'assets/images/sponsorship/friend.svg'
                : sponsorshipOption === 'mafia'
                  ? 'assets/images/sponsorship/mafia.png'
                  : 'assets/images/sponsorship/friend.svg'
          }
          alt="ally icon"
        />
      </div>
      <div className="checkout">
        <div className="checkout-head">
          <h1>
            {sponsorshipOption === 'ally'
              ? 'MINORITY ALLY'
              : sponsorshipOption === 'friend'
                ? 'MINORITY FRIEND'
                : sponsorshipOption === 'mafia'
                  ? 'MINORITY MAFIA'
                  : 'SPONSORSHIP'}
          </h1>
        </div>

        <form onSubmit={handleCheckoutSubmit}>
          <label htmlFor="name-of-organization">
            Name of Organization *
            <TextInput
              id="name-of-organization"
              required
              value={organization}
              onChange={handleOrganizationInput}
            />
          </label>

          <label htmlFor="sponsorship-option">
            Select the type of sponsorship tier you’re applying for. *
            <select
              id="sponsorship-option"
              required
              value={sponsorshipOption}
              onChange={handleSponsorshipOption}
            >
              <option value="" disabled hidden>
                Please select an option
              </option>
              <option value="ally">Ally</option>
              <option value="friend">Friend</option>
              <option value="mafia">Mafia</option>
            </select>
          </label>

          <label htmlFor="email">
            Email *
            <EmailInput id="email" value={email} onChange={handleEmailInput} />
          </label>

          <label htmlFor="country-option">
            Country *
            <select
              id="country-option"
              required
              value={countryOption}
              onChange={handleCountryOption}
            >
              <option value="" disabled hidden>
                Please select an option
              </option>
              {
                Object.keys(countriesData).map((key) => (
                  <option key={key} value={key}>
                    {countriesData[key]}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="other-details">
            Are there any other details you want to share with us?
            <textarea id="other-details" value={textarea} onChange={handleTextarea} />
          </label>

          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    </div>
  );
};

export default SponsorshipCheckout;

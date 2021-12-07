import { useState } from 'react';
import SponsorshipMain from '../../components/sponsorship/SponsorshipMain';
import SponsorshipCheckout from '../../components/sponsorship/SponsorshipCheckout';
import SponsorshipCard from '../../components/sponsorship/SponsorshipCard';
import Sponsorship from './Sponsorship';

const SponsorshipPage = function (props) {
  const [SponsorshipDisplay, setSponsorshipDisplay] = useState('sponsorship');

  const [organization, setOrganization] = useState('');
  const [sponsorshipOption, setSponsorshipOption] = useState('');
  const [email, setEmail] = useState('');
  const [countryOption, setCountryOption] = useState('');
  const [textarea, setTextarea] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [sponsorCardSaving, setSponsorCardSaving] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleMCardClick = (minorityCard) => {
    setSponsorshipOption(minorityCard);
    setSponsorshipDisplay('checkout');
  };

  const displaySponsorshipPage = () => {
    setSponsorshipDisplay('sponsorship');
  };
  const displayCheckout = () => {
    setSponsorshipDisplay('checkout');
  };
  const displayCard = () => {
    setSponsorshipDisplay('card');
  };

  const handleOrganizationInput = (event) => {
    setOrganization(event.target.value);
  };
  const handleSponsorshipOption = (event) => {
    setSponsorshipOption(event.target.value);
  };
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const handleCountryOption = (event) => {
    setCountryOption(event.target.value);
  };
  const handleTextarea = (event) => {
    setTextarea(event.target.value);
  };
  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    displayCard();
  };

  const handleCardNumberInput = (event) => {
    let CCNum = event.target.value.split('-').join('');

    if (!CCNum.length) {
      setCardNumber('');
    } else if (CCNum.length > 16) {
      CCNum = CCNum.slice(0, CCNum.length - 1)
        .match(new RegExp('.{1,4}', 'g'))
        ?.join('-');
      setCardNumber(CCNum);
    } else if (!/\D+/.test(CCNum)) {
      CCNum = CCNum.match(new RegExp('.{1,4}', 'g'))?.join('-');
      setCardNumber(CCNum);
    }
  };

  const handleExpMonthInput = (event) => {
    setExpMonth(event.target.value.slice(0, event.target.maxLength));
  };
  const handleExpYearInput = (event) => {
    setExpYear(event.target.value.slice(0, event.target.maxLength));
  };
  const handleCardCardCVCInput = (event) => {
    setCardCVC(event.target.value.slice(0, event.target.maxLength));
  };

  const handleSponsorCardSave = () => {
    setSponsorCardSaving(!sponsorCardSaving);
  };

  const handleTermsAgreed = (bool) => {
    setTermsAgreed(bool);
  };

  const handleSponsorCardSubmit = (event) => {
    event.preventDefault();

    setOrganization('');
    setSponsorshipOption('');
    setEmail('');
    setCountryOption('');
    setTextarea('');

    setCardNumber('');
    setExpMonth('');
    setExpYear('');
    setCardCVC('');
    setTermsAgreed(false);

    displaySponsorshipPage();
  };

  return (
    <SponsorshipMain>
      {SponsorshipDisplay === 'sponsorship' ? (
        <Sponsorship
          displayCheckout={displayCheckout}
          handleMCardClick={handleMCardClick}
        />
      ) : SponsorshipDisplay === 'checkout' ? (
        <SponsorshipCheckout
          organization={organization}
          sponsorshipOption={sponsorshipOption}
          email={email}
          countryOption={countryOption}
          textarea={textarea}
          handleOrganizationInput={handleOrganizationInput}
          handleSponsorshipOption={handleSponsorshipOption}
          handleEmailInput={handleEmailInput}
          handleCountryOption={handleCountryOption}
          handleTextarea={handleTextarea}
          handleCheckoutSubmit={handleCheckoutSubmit}
        />
      ) : SponsorshipDisplay === 'card' ? (
        <SponsorshipCard
          sponsorshipOption={sponsorshipOption}
          cardNumber={cardNumber}
          expMonth={expMonth}
          expYear={expYear}
          cardCVC={cardCVC}
          sponsorCardSaving={sponsorCardSaving}
          termsAgreed={termsAgreed}
          handleCardNumberInput={handleCardNumberInput}
          handleExpMonthInput={handleExpMonthInput}
          handleExpYearInput={handleExpYearInput}
          handleCardCardCVCInput={handleCardCardCVCInput}
          handleSponsorCardSave={handleSponsorCardSave}
          handleTermsAgreed={handleTermsAgreed}
          handleSponsorCardSubmit={handleSponsorCardSubmit}
          displaySponsorshipPage={displaySponsorshipPage}
        />
      ) : (
        <Sponsorship
          displayCheckout={displayCheckout}
          handleMCardClick={handleMCardClick}
        />
      )}
    </SponsorshipMain>
  );
};

export default SponsorshipPage;

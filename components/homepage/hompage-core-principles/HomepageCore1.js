import React from 'react';
import PrincipleCard from './PrincipleCard';

const HomepageCore1 = () => {
  return (
    <section className='tw-container tw-mx-auto tw-flex md:tw-flex-col tw-flex-col tw-gap-y-10 tw-justify-center tw-bg-[#14152A] tw-items-center tw-content-center'>
      <h2 className='top__part__title'>Our Core Principles</h2>
      <section className='tw-container tw-mx-auto tw-flex md:tw-flex-col tw-flex-row tw-justify-center tw-items-center tw-h-screen tw-gap-6 md:tw-gap-x-6 md:tw-gap-y-4'>
        <PrincipleCard />
        <PrincipleCard />
        <PrincipleCard />
      </section>
    </section>
  );
};

export default HomepageCore1;

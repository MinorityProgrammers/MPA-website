import React from 'react';
import PrincipleCard from './PrincipleCard';

const HomepageCore1 = () => {
  const principlesList = [
    {
      id: 1,
      image: "",
      title: "Culture",
      content: "We encourage inclusivity and motivate our students and employees to think outside the box, become excellent collaborators"
    }, {
      id: 2,
      image: "",
      title: "Code",
      content:"With our professional team driven experience, we focus on shipping industry grade products that solves real world problems"
    },
    {
      id: 3,
      image:"",
      title: "Community",
      content:"We strive to build a supportive community for developers to engage, share knowledge, motivate and grow into valuable assets."
    }
  ]
  return (
    <section className='core-principles tw-flex md:tw-flex-col tw-flex-col tw-justify-center tw-items-center tw-content-center tw-px-8'>
      <h2 className='top__part__title'>Our Core Principles</h2>
      <section className='tw-container tw-mx-auto tw-flex md:tw-flex-col tw-flex-row tw-justify-center tw-items-center tw-h-screen md:tw-h-11/12 md:tw-py-8 tw-gap-6 md:tw-gap-x-6 md:tw-gap-y-4'>
        {principlesList.map((principle)=>{
          return <PrincipleCard key={principle.id} title={principle.title} image={principle.image} content={principle.content} />
        })}
      </section>
    </section>
  );
};

export default HomepageCore1;

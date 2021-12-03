import React from 'react';
import Link from 'next/link';
import EventCard from "../components/EventCard";

function Events() {
   const PastEvents = [
        {imgSrc: "/assets/images/ch.png", catName: "Hackathon", eventName: "#ClimateHacks", time: "Sunday April 24 - Saturday April 25, 2021", eventLink: "https://climatehacks.dev/", actionLink: "https://climatehacks.devpost.com/", callToAction: "View Results"},          
        {imgSrc: "/assets/images/csvscis.png", catName: "Lecture", eventName: "CS vs CIS: JMU Grad Panel", time: "Monday, September 28 @ 6:30PM EST", eventLink: "https://youtu.be/g0xTzN_1Dzc", actionLink: "https://youtu.be/g0xTzN_1Dzc", callToAction: "Watch Webinar"},
        {imgSrc: "/assets/images/ElectionHackathonAnimation.gif", catName: "Hackathon", eventName: "#ElectionHackathon", time: "October 16 - November 2", eventLink: "https://election.devpost.com/", actionLink: "https://election.devpost.com/", callToAction: "See Results"},          
        {imgSrc: "/assets/images/fastenterprise.png", catName: "Workshop", eventName: "FAST Enterprises: Technical interview Workshop", time: "Tuesday, September 15 2020 at 7:00 PM EST", eventLink: "https://www.fastenterprises.com/careers", actionLink: "https://www.fastenterprises.com/careers", callToAction: "Join Fast"},      
        {imgSrc: "/assets/images/awscoffee.gif", catName: "Workshop", eventName: "Amazon Web Services (AWS) Virtual Coffee Chat", time: "Monday, September 14 2020 at 6:30 PM EST", eventLink: "https://aws.amazon.com/careers", actionLink: "https://aws.amazon.com/careers", callToAction: "Join AWS"},          
        {imgSrc: "/assets/images/kpmg.gif", catName: "Workshop", eventName: "Day in the Life of A KPMG Developer", time: "Wednesday, September 9 2020 at 6:00 PM EST", eventLink: "https://youtu.be/fMubRjk25fo", actionLink: "https://youtu.be/fMubRjk25fo", callToAction: "Watch"},         
        {imgSrc: "/assets/images/diversitycouncil.gif", catName: "Workshop", eventName: "JMU CISE Student Diversity Council & Mentorship Program", time: "Recurring", eventLink: "https://www.jmu.edu/cise/", actionLink: "https://www.jmu.edu/cise/", callToAction: "Join Today"},        
        {imgSrc: "/assets/images/jmustudentorg.gif", catName: "Conference", eventName: "JMU Student Org Night", time: "August 31, 2020 6:00PM - 9:00PM EST", eventLink: "https://beinvolved.jmu.edu/organization/MinorityProgrammers", actionLink: "https://beinvolved.jmu.edu/organization/MinorityProgrammers", callToAction: "Learn More"},          
        {imgSrc: "/assets/images/minorityea.gif", catName: "Conference", eventName: "Minority Entrepreneurs Conference", time: "Sunday, August 30, 2020", eventLink: "https://minorityea.org/", actionLink: "https://minorityea.org/", callToAction: "Learn"},          
        {imgSrc: "/assets/images/csclubmixer.gif", catName: "Conference", eventName: "JMU Computer Science Club Mixer", time: "Wednesday, September 2 2020 at 8:00 PM EST", eventLink: "https://wiki.cs.jmu.edu/student/clubs/start?", actionLink: "https://wiki.cs.jmu.edu/student/clubs/start?", callToAction: "JMU Clubs"},        
        {imgSrc: "/assets/images/blmhackathon.png", catName: "Hackathon", eventName: "Black Lives Matter Hackathon", time: "July 13 - August 2 2020", eventLink: "http://blacklivesmatter.devpost.com/", actionLink: "https://youtu.be/ekCO5lE46WU", callToAction: "Results"},          
        {imgSrc: "/assets/images/sapinternship.png", catName: "Webinar", eventName: "SAP Internship Programs", time: "Aug 18, 2020", eventLink: "https://youtu.be/nD43NFAo8mU", actionLink: "https://youtu.be/nD43NFAo8mU", callToAction: "Watch"},          
        {imgSrc: "/assets/images/blockchaincrypto.png", catName: "Webinar", eventName: "Blockchain Cryptocurrency 101 w/ Shadman Hossain", time: "Tuesday, June 30 2020 at 7:00 PM EDT", eventLink: "https://youtu.be/Y6oQA6Odu-g", actionLink: "https://youtu.be/Y6oQA6Odu-g", callToAction: "Watch"},          
        {imgSrc: "/assets/images/learningcodeinprison.png", catName: "Webinar", eventName: "Last Mile: Learning Code in Prison", time: "Wednesday, June 17 2020 at 1:00 PM EST", eventLink: "https://thelastmile.org", actionLink: "https://thelastmile.org", callToAction: "Learn"},          
        {imgSrc: "/assets/images/jmutechstartups.png", catName: "Webinar", eventName: "JMU Tech Startups Webinar + Q&A", time: "Wednesday, April 29 2020 at 6:00 PM EST", eventLink: "https://youtu.be/RI3WxJGz44c", actionLink: "https://youtu.be/RI3WxJGz44c", callToAction: "Watch"},          
        {imgSrc: "/assets/images/covidhackathon.png", catName: "Hackathon", eventName: "COVID-19 Hackathon", time: "April 5 - April 24 2020", eventLink: "https://youtu.be/A8TPYXAGReI", actionLink: "https://youtu.be/A8TPYXAGReI", callToAction: "Results"},          
        {imgSrc: "/assets/images/cyberdefense.png", catName: "Webinar", eventName: "MinorityProgrammers/ CyberDefenseClub: Implementing Software Security Principles", time: "April 1 2020", eventLink: "https://youtu.be/QJBh9qtoN7E", actionLink: "https://youtu.be/QJBh9qtoN7E", callToAction: "Watch"},          
        {imgSrc: "/assets/images/machinelearning.png", catName: "Workshop", eventName: "Machine Learning Basics", time: "Wednesday, February 26 2020 at 6:00 PM EST (ISAT 243)", eventLink: "https://docs.google.com/presentation/d/1mqVf3nUhhpsL5YXGH8JGuOUBoqYsNsQutyLZ_r-uw-Q/edit#slide: id.g700f82a971_1_160", actionLink: "https://docs.google.com/presentation/d/1mqVf3nUhhpsL5YXGH8JGuOUBoqYsNsQutyLZ_r-uw-Q/edit#slide: id.g700f82a971_1_160", callToAction: "Presentation"},          
        {imgSrc:"/assets/images/interestmeeting.png", catName: "Workshop", eventName: "Learn Agile SCRUM + Study Hall", time: "Wednesday, February 19 2020 at 6:00 PM EST", eventLink: "https://drive.google.com/file/d/16kcQlbpw6Bd7oN6VS7fTraYq-ROIpNDF/view", actionLink: "https://drive.google.com/file/d/16kcQlbpw6Bd7oN6VS7fTraYq-ROIpNDF/view", callToAction: "Presentation"},
        {imgSrc: "/assets/images/bootstrapbasics.png", catName: "Workshop", eventName: "Bootstrap Basics", time: "February 12, 2020 6:00PM EST (ISAT 243)", eventLink: "https://drive.google.com/file/d/1SjQwNqbtp1ud7kzvi_WG1V_EWissFiSN/view", actionLink: "https://drive.google.com/file/d/1SjQwNqbtp1ud7kzvi_WG1V_EWissFiSN/view", callToAction: "Presentation"},        
        {imgSrc: "/assets/images/interestmeeting.png", catName: "Workshop", eventName: "First Interest Meeting/Github Crash Course", time: "First Interest Meeting/Github Crash Course", eventLink: "https://drive.google.com/file/d/1tVt0n_t320Mb2WInwlf2xJGy9hCEApFN/view", actionLink: "https://drive.google.com/file/d/1tVt0n_t320Mb2WInwlf2xJGy9hCEApFN/view", callToAction: "Presentation"}       
      ];
  return (
<section className="course-one course-page">
            <div className="container">
                <div className="block-title">
                    <h2 className="block-title__title">Past Events</h2>
                </div> 
                <div className="row">
                {PastEvents.map((events, index) => ( 
                <EventCard  item={events} key={index}/>
                ))}
                </div>
            </div>
</section>

  );
}






export default Events;

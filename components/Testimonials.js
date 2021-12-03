import React from 'react';
import TestimonialsCard from './TestimonialsCard';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const Testimonials = () => {

    const params = {
        slidesPerView : 3,
        loop: true,
        speed: 1000,
        spaceBetween : 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        // Responsive breakpoints
        breakpoints: {
            1024:{
                slidesPerView : 3
            },
            768:{
                slidesPerView : 2
            },
            640:{
                slidesPerView : 2

            },
            320:{
                slidesPerView : 1
            }
        }
    }

    const TestimonialsMap = [
        {quote: "Minority Programmers is where I learned the skills I use in my job today and where I found family.", imgSrc: "/assets/images/kush.jpg", name: "Kush Gupta", position: "Chapter Head"},
        {quote: "Minority Programmers gave me hands-on experience organizing.", imgSrc:"https://se-infra-cdn-images.azureedge.net/documents/11/5adee849-9037-45e0-da87-08d850ce0b0e/1500.jpg", name: "Marc Duny", position: "Student Organizer"},
        {quote: "Minority Programmers encouraged me to be a tech entreprenuer.", imgSrc: "https://media-exp1.licdn.com/dms/image/C4D03AQGPiGQMw0aPwA/profile-displayphoto-shrink_800_800/0/1592918804007?e=1617840000&v=beta&t=a7IkDSp-cgW_1Vj8scERV06r5mUYalXns7H2s_epCgk", name: "Ozzy Omar", position: "IT Professional"},
        {quote: "Minority Programmers gave me diverse friends that felt cooler than any regular CS club.", imgSrc: "/assets/images/jack.jpg", name: "Jack V", position: "Software Engineer"}     
      ];

    return (
        <section className="testimonials-one testimonials-one__home-three">
            <div className="container">
                <div className="block-title text-center">
                    <h2 className="block-title__title">What our members<br />
                        are saying</h2>
                </div>
                <div className="testimonials-one__carousel">
                    <Swiper {...params}>
                    {TestimonialsMap.map((testimonials, index) =>(
                    <div className="swiper-slide" key={index}>
                <TestimonialsCard  item={testimonials} key={index}/>
                </div>
                  ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

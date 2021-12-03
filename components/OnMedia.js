import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const OnMedia = () => {

    const params = {
        slidesPerView : 5,
        loop: true,
        speed: 1000,
        spaceBetween : 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        // Responsive breakpoints
        breakpoints: {
            1024:{
                slidesPerView : 5
            },
            768:{
                slidesPerView : 4
            },
            640:{
                slidesPerView : 3

            },
            320:{
                slidesPerView : 2
            }
        }
    }

    return (
        <section className="brand-two ">
            <div className="container">
                <div className="block-title">
                    <h2 className="block-title__title">Featured On</h2>
                </div>
                <div className="brand-one__carousel">
                    <Swiper {...params}>
                        <div className="item">
                            <a href="https://youtu.be/Zeu4CUfZnps" target="_blank">
                                <img src="assets/images/ntv.png" width="123px" alt="" />
                            </a>
                        </div>
                        <div className="item">
                             <a href="https://youtu.be/Zeu4CUfZnps" target="_blank">
                                <img src="assets/images/voa.png"  width="123px" alt="" />
                            </a>
                        </div>
                        <div className="item" >
                           <a href="https://www.whsv.com/2020/06/28/jmu-club-takes-part-in-black-lives-matter-hackathon/" target="_blank" >
                                <img src="assets/images/whsv.png" width="123px" alt="" />
                            </a>
                        </div>
                        <div className="item">
                            <a href="https://www.nbc29.com/2020/06/29/jmu-club-sponsors-black-lives-matter-hackathon/" target="_blank">
                                <img src="assets/images/nbc29.png" width="123px" alt="" />
                            </a>
                        </div>

                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default OnMedia;

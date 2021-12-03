import React from 'react';
// import Head from 'next/head';
import Link from 'next/link';

const TestimonialsCard = (props) => {

    return (
           <div className="item">
                <div className="testimonials-one__single">
                    <div className="testimonials-one__qoute">
                    <img src="/assets/images/qoute-1-1.png" alt="" />
                    </div>
                    <p className="testimonials-one__text">{props.item.quote}</p>
                    <img src={props.item.imgSrc} alt="" className="testimonials-one__img" />
                    <h3 className="testimonials-one__name">{props.item.name}</h3>
                    <p className="testimonials-one__designation">{props.item.postion}</p>
                </div>
            </div>
    );
}

export default TestimonialsCard;
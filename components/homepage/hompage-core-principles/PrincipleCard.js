import React from 'react';
// import handShake from "../../../public/assets/images/home-page/principles/handshake.png";

const PrincipleCard = (props) => {
    return (
        <div className='tw-flex-[1_1_30%] tw-flex tw-rounded-3xl tw-border-2 tw-border-[#804D2] tw-justify-evenly tw-items-center tw-flex-col tw-content-evenly tw-gap-6 tw-px-6 tw-py-8 principle-card'>
            <div className='tw-rounded-full tw-border-1 tw-w-8 tw-h-8 tw-p-9 tw-border-[#804D2] principle-card__elipse'>
                <img src={props.image} alt="principle icon"/>
            </div>
            <div className='tw-flex tw-container tw-mx-auto tw-flex-col tw-justify-evenly tw-content-evenly tw-items-center tw-gap-6'>
                <h4 className='principle-card__heading'>{props.title}</h4>
                <p className="principle-card__main-text">{props.content}</p>
            </div>
        </div>
    );
};

export default PrincipleCard;

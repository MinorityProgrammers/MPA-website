import React from 'react';
import handShake from "../../../public/assets/images/home-page/principles/handshake.png";

const PrincipleCard = () => {
    return (
        <div className='tw-flex-[1_1_30%] tw-flex tw-rounded-3xl tw-border-2 tw-border-[#804D2] tw-justify-evenly tw-items-center tw-content-evenly tw-px-6 tw-py-8'>
            <div className='tw-rounded-full tw-border-4 tw-w-10 tw-h-10 tw-p-4 tw-border-[#804D2] tw-shadow-[0px_0px_3px_7px_#3E385D] '>
                <img src="" alt="principle icon"/>
            </div>
            <div className='tw-flex tw-container tw-mx-auto tw-flex-col tw-justify-evenly tw-content-evenly tw-items-center tw-gap-6'>
                <h4>Culture</h4>
                <p>We encourage inclusivity and motivate our students and employees to think outside the box, become excellent collaborators</p>
            </div>
        </div>
    );
};

export default PrincipleCard;

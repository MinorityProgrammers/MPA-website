import React from 'react';
// import Head from 'next/head';

const TeamCard = (props) => {

    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div className="team-one__single">
                <div className="team-one__image">
                    <img src={props.item.imgSrc} height="206px" width="206px" alt="" />

                </div>
                <div className="team-one__content">
                    <h2 className="team-one__name">{/*<Link href="/teacher-details"><a>Shadman Hossain</a></Link>*/}{props.item.name}</h2>
                    <p className="team-one__designation">{props.item.title}</p>
                    <p className="team-one__text"></p>
                </div>
                <div className="team-one__social">
                    {/* <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-facebook-square"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a> */}
                </div>
            </div>
        </div>
    );
}

export default TeamCard;
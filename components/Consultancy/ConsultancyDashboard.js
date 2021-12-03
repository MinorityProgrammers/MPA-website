import React, { useEffect, useContext, useState } from 'react';

const ConsultancyDashboard = ({ data }) => {
    return (
        <section>
            <div className="container">
                <div className="consultancy--registered__user">
                    <div className="consultancy--registered__header">
                        <div className="consultancy---user__image">
                            <img src={data.profilePicture ? data.profilePicture : "/assets/images/profile.png"} alt="" />
                        </div>
                        <div className="consultancy--user__detail">
                            <h1>Hey, ({data.firstName})</h1>
                            <p>Welcome back the Consultancy Program</p>
                        </div>
                    </div>
                    <div className="consultancy--registered__body">
                        <div className="consultancy--user__projects">
                            <div className="consultancy--logo">
                                <img src="/assets/images/consultancy/wlamp.png" alt="" />
                                <img className="consultancy--coolicon" src="/assets/images/consultancy/coolicon.png" alt="" />
                            </div>
                            <h1>Projects</h1>
                        </div>
                        <div className="consultancy--user__projects">
                            <div className="consultancy--logo">
                                <img src="/assets/images/consultancy/quote.png" alt="" />
                            </div>
                            <h1>Quotes</h1>
                        </div>
                        <div className="consultancy--user__projects">
                            <div className="consultancy--logo">
                                <img src="/assets/images/consultancy/checklist.png" alt="" />
                            </div>
                            <h1>Task</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultancyDashboard;

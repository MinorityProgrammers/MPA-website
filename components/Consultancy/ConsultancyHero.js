import React from 'react';

const ConsultancyHero = () => {

    const scrollTo = () => {
        const section = document.querySelector('#all-startups');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    return (
        <>
            <section className="incubator-wrapper">
                <div className="mentorshipP-header">
                    <div className='container '>
                            <div className="incubator__text mtb-mpa">
                                <div>
                                <h1 className="display-1 font-weight-bold  d-flex justify-content-center">
                                    Consultancy
                                </h1>
                                <p className="d-flex justify-content-center text-center h5">Get your idea turned into a complete web application ready for market with our transparent task-based escrow system that gives you as client, the control over how your product is being built. </p>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ConsultancyHero;
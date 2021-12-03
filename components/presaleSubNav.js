import React, { Fragment, useState } from 'react';


const PresalePage = () => {
    const [presale, setPresale] = useState('');

    return (
        <Fragment>
            <div className="presale-page-home">
                <div className="sub-nav">
                    <div className="pre-sale active">PRE-SALE</div>
                    <div className="presale">PRESALE</div>
                    <div className="live-on-index">LIVE ON INDEX</div>
                    <div className="live-platform">LIVE PLATFORM</div>
                    <div className="mpa-token">$MPA TOKEN</div>
                </div>
            </div>
        </Fragment>
    )
}

export default PresalePage;

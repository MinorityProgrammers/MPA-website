import React from "react";
import StartupLeftBar from "../components/StartupLeftBar";
import StartupRightBar from "../components/StartupRightBar";

const StartupMainBar = ({ data }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 leftbar">
                    <StartupLeftBar data={data} />
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 rightbar">
                    <StartupRightBar data={data} />
                </div>
            </div>
        </div>
    );
};
export default StartupMainBar;


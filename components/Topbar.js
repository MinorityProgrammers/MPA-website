import React, {Component} from 'react';

class Topbar extends Component {
    render() {
        return (
            <div className="topbar-one">
                <div className="container">
                    <div className="topbar-one__left">
                        <a href="https://defi.devpost.com/" target="_blank">Sign up for DefiSummer defi.devpost.com</a>

                    </div>
                    <div className="topbar-one__right">
                        <a href="https://discord.gg/TAmSpBvmR2" target="_blank">Discord</a>
                        <a href="https://defi.devpost.com/" target="_blank">Register</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;

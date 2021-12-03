import React, {Component} from 'react';
import ModalVideo from 'react-modal-video';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

class VideoThree extends Component {
    constructor(){
        super()
        this.state = {
            isOpen: false,
            startCounter: false
        }
    }

    openModal = () => {
        this.setState({isOpen: true})
    }

    onVisibilityChange = isVisible => {
        if (isVisible) {
            this.setState({startCounter: true});
        }
    }


    render() {
        return (
            <section className="video-three">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="video-three__fact thm-base-bg">
                                        <i className="kipso-icon-knowledge"></i>
                                        <p className="video-three__fact-count counter">
                                            <VisibilitySensor onChange={this.onVisibilityChange} delayedCall><CountUp end={this.state.startCounter ? 15 : 0} /></VisibilitySensor> </p>
                                        <p className="video-three__fact-text">Courses</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="video-three__fact thm-base-bg-2">
                                        <i className="kipso-icon-professor"></i>
                                        <p className="video-three__fact-count counter">
                                            <VisibilitySensor onChange={this.onVisibilityChange} delayedCall><CountUp end={this.state.startCounter ? 75 : 0} /></VisibilitySensor> </p>
                                        <p className="video-three__fact-text">Expert
                                            Instructors</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        );
    }
}

export default VideoThree;
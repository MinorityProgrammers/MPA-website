import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';

export default class VideoTwo extends Component {
    constructor(){
        super()
        this.state = {
            isOpen: false
        }
    }

    openModal = () => {
        this.setState({isOpen: true})
    }

    render() {
        return (
            <section className="video-two">
                <div className="container">
                    <img src="/assets/images/scratch-1-1.png" className="video-two__scratch" alt="" />
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="video-two__content">
                                    <h2 className="video-two__title">Minority Programmers  <br />
                                        mission is to bring diversity through STEM education and innovation.</h2>
                                    <a href="#" className="thm-btn">Learn More</a>
                                </div>
                            </div>
                            <div className="col-lg-5 d-flex justify-content-lg-end justify-content-sm-start">
                                <div className="my-auto">
                                    <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='aitb---aDYM' onClose={() => this.setState({isOpen: false})} />
                                    <div onClick={this.openModal} className="video-two__popup"><i className="fa fa-play"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        );
    }
}
import React, { useState, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa';
import { useRouter } from "next/router";
import { useDetectOutsideClick } from '../UseDetectOutsideClick';
import Card from '../login-signup/card'
import Link from 'next/link'
import Modal from 'react-modal';
import ApplyForm from './ApplyForm';

const InternshipModal = ({
    modalIsOpen,
    closeModal,
    customStyles,
    myData,
    toggle,
    show,
    showHandler,
    toggleHandler,
    data
}) => {

    const dropdownRef = useRef(null);
    const [clickRegister, setClickRegister] = useState(false)
    const [active, setActive] = useState(false)
    const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

    const redirectCareers = () => {
        window.location.href = '/careers'
    }

    useEffect(() => {
        if (data === null) {
            setActive(false)
        }
        else {
            setActive(true)
        }
    }, [])
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal--wrapper">
                    <div className="sidebar">
                        {
                            myData.interns.map(singleData => (
                                <div className="modal--body">
                                    <div className="single--side">
                                        <div className="title" onClick={() => showHandler(`${singleData.id}`)}>
                                            <h1>{singleData.title}</h1>
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                        <ul className={show === `${singleData.id}` ? 'positions active' : 'positions'}>
                                            {
                                                singleData.all.map(item => (
                                                    <>
                                                        <li className={toggle === `${item.id}` ? 'active-position' : ''} onClick={() => toggleHandler(`${item.id}`)}>{item.title}</li>
                                                        <div className="modal--content">
                                                            <div className={toggle === `${item.id}` ? 'content show-content' : 'content'}>
                                                                <h5>All intern works:</h5>
                                                                <ul>
                                                                    {
                                                                        item.requiredAll.map(reqAll => (
                                                                            <li key={reqAll.text}>{reqAll.text}</li>
                                                                        ))
                                                                    }

                                                                </ul>
                                                                <h5>{item.subTitle}</h5>
                                                                <ul>
                                                                    {
                                                                        item.requiredOwn.map((reqOwn, i) => (
                                                                            <li key={reqOwn.i}>{reqOwn.text}</li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                <div className="btn-center">
                                                                    {data ? <Link href="/careers"><button className="btn btn-orange mt-3 mb-3">Apply <i className="fas fa-angle-right"></i></button></Link> : <button onClick={() => { setClickRegister(true) }} className="btn btn-orange mt-3 mb-3">Apply <i className="fas fa-angle-right"></i></button>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))
                                            }


                                        </ul>
                                    </div>

                                </div>
                            ))
                        }
                        <button className="btn btn-back" onClick={closeModal}>Close <i className="fas fa-angle-right"></i></button>
                    </div>
                    <FaTimes onClick={closeModal} title="Close" className="close--modal__wrapper" />
                </div>



            </Modal>
            {clickRegister && active ?
                <div className="create_event">
                    <div className="create_event-shadow" onClick={() => {
                        setClickRegister(false)
                    }}>
                    </div>
                    <div id="create_event-container" className="create_event-container">
                        <Card />
                    </div>
                    <i className="close_icon fas fa-times close-icon" onClick={() => { setClickRegister(false) }}></i>
                </div> :
                ""
            }

        </>

    )
}

export default InternshipModal

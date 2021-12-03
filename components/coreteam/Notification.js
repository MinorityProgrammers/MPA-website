
import React from 'react';
import { MdArrowDropUp, MdArrowDropDown, } from 'react-icons/md';
import { BiCheckCircle } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { RiFlag2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
// import coreteamInfo from './coreteamInfo.json';
// import Pagination from './Pagination';
import Link from "next/link"
import coreteamInfo from "../ProjectManager/createtask.json"
import { useState } from 'react';
import { useEffect } from 'react';
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import axios from 'axios';
import Moment from "react-moment";
import Pagination from '../Moderator/ElectProposals/Pagination';
import Loader from '../Loader';
import ApprovedProposal from './ApprovedProposal';




const Notification = () => {

    const [infomations, setInformations] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [approvedProposals, setApprovedProposals] = useState([]);
    const [borderColor, setBorderColor] = useState("pink");
    // new add for feach
    const [actions, setActions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [actionsPerPage] = useState(4)
    const [sortType, setSortType] = useState('Sort By')
    const [filter, setFilter] = useState('all')
    const [categories, setCategories] = useState([])
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        filterArray()
    }, [filter])

    useEffect(() => {
        sortArray(sortType)
    }, [sortType])

    useEffect(() => {

        let uniqueCategories = []
        const allCategories = []

        // Fetch the action data. Set loading state to true before fetch, back to false after the fetch is complete
        const fetchData = () => {

            setLoading(true)
            fetch("https://koinstreet-learn-api.herokuapp.com/api/v1/proposal/")
                .then(response => response.json())
                .then((response) => {
                    setProposals(response.data)
                    setAllData(response.data.reverse())
                    setActions(response.data)
                    setLoading(false)


                    // Set unique categories for filter dropdown
                    response.data.map((action) => {
                        allCategories.push(action.category)
                    })
                    uniqueCategories = [...new Set(allCategories)]
                    setCategories(uniqueCategories)
                })
        }

        fetchData()

    }, [])

    // Function to sort the actions by amount or date
    const sortArray = type => {
        const types = {
            amountAsc: 'amount',
            amountDesc: 'amount',
            date: 'date'
        }

        const sortProperty = types[type]

        if (sortType == 'amountAsc') {
            const sorted = [...actions].sort((a, b) => a[sortProperty] - b[sortProperty])
            setActions(sorted)
        } else if (sortType == 'amountDesc') {
            const sorted = [...actions].sort((a, b) => b[sortProperty] - a[sortProperty])
            setActions(sorted)
        } else if (sortType == 'date') {
            const sorted = [...actions].sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]))
            setActions(sorted)
        } else {
            setActions(allData)
        }
    }

    // Filter the array, sets current page back to 1 after filtering
    const filterArray = () => {
        setCurrentPage(1)
        if (filter != 'all') {
            for (let i = 0; i < categories.length; i++) {
                if (filter == categories[i]) {
                    const filtered = [...allData].filter(action => action.category == categories[i])
                    setActions(filtered)
                }
            }
        } else {
            setActions(allData)
        }
    }

    // Get current actions
    const indexOfLastAction = currentPage * actionsPerPage;
    const indexOfFirstAction = indexOfLastAction - actionsPerPage;
    const currentActions = actions.slice(indexOfFirstAction, indexOfLastAction)
    // Change page

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = (currentPage) => {
        if (currentPage === Math.ceil(actions.length / actionsPerPage)) {
            return
        }
        setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        if (currentPage === 1) {
            return
        }
        setCurrentPage(currentPage - 1)
    }
    console.log("proposal Data", proposals)
    console.log("all data", allData)
    console.log("actions", actions)

    // if (loading) {
    //     return (
    //         <div className='minority__earned__actions'>
    //             <Loader />
    //         </div>
    //     )
    // }

    
    // This useEffect is used for render api data from backend 
    useEffect(() => {
        const url = 'https://koinstreet-learn-api.herokuapp.com/api/v1/proposal/';
        axios(url)
            .then(data => setProposals(data.data.data))

    }, [])
    // console.log("notification proposals", proposals);
    useEffect(() => {
        setInformations(coreteamInfo);

    }, [])
    const approvedProposalsFunction = (approved) => {
        const newApprovedProposals = [...approvedProposals, approved];
        setApprovedProposals(newApprovedProposals)

    }
    console.log("apporoved", approvedProposals);


    return (
        <div className=" page-gradient" >

            {/* Banner ----------------part */}
            <section className="  tw-w-100 tw-mt-20 ">
                <div className="banner  tw-flex tw-items-center  ">
                    <div className="banner-left  tw-self-center tw-w-1/2">
                        <img src="/assets/images/coreteamimg/star.png" alt="star" />
                        <h2 className="text-center tw-uppercase ">Notifications</h2>
                        <h4 className="text-center tw-text-white"><small>You have 13 new notifications.</small></h4>
                    </div>
                    <div className=" tw-w-1/2  tw-ml-64">
                        <img className="tw-h-48" src="/assets/images/coreteamimg/notifi.png" alt="bg" />
                    </div>
                </div>

            </section>

            {/* New element */}


            <div className="tw-flex new  tw-my-4 align-items-center container tw-py-3 my-5 tw-pb-10">
                <h3 className="text-uppercase tw-text-2xl">new </h3> <div className="tw-bg-indigo-900 hr-line  tw-ml-3"></div>

            </div>
            {/* Proposals to be voted / revoted.-----page */}
            {
                currentActions.length ?
                    <div className="tw-container tw-mx-auto voted tw-rounded-lg">
                        <div className=" tw-rounded-lg voted" >
                            <div className="tw-p-4 tw-text-white tw-m-4">
                                <h1 className="tw-uppercase tw-text-2xl">Proposals to be voted / revoted.</h1>
                                <p><small>Please Approve or disapprove proposals</small></p>
                            </div>



                            <div>

                                {
                                    currentActions.map(info =>
                                        <div className={`tw-p-4 tw-m-8   tw-bg-white tw-text-dark tw-border-t-8  tw-border-${info.borderColor}-500`}>
                                            <div className="">
                                                <div className=" tw-flex tw-justify-between ">
                                                    <div className="">
                                                        <h1 className="parsonal-title ">{info.title ? info.title : "comming proposal test"}</h1>
                                                        <p> <small>Type : {info.type}</small> <small>Catergory : {info.category ? info.category : "Incubator"}</small></p>

                                                    </div>
                                                    <h3 className="day-left "> 1 days left to vote</h3>
                                                </div>
                                                <hr />
                                                <div className="tw-flex tw-justify-between tw-items-center tw-my-3">
                                                    <div className="tw-flex">
                                                        <img width="30" height="25" className="tw-mr-2" src={info.userId.profilePicture ? info.userId.profilePicture : `/assets/images/coreteamimg/user.png`} alt="user" />
                                                        <div className="tw-mr-3">
                                                            <p className="tw-text-muted"><small>Created by</small> </p>
                                                            <h4 className="tw-text-black">{info.userId.userName ? info.userId.userName : "Shot Khan"}</h4>
                                                        </div>
                                                        <div>
                                                            <p className="tw-text-muted"><small>Created on</small> </p>
                                                            <Moment format="MMM D" withTitle>
                                                                {info.createdAt ? info.createdAt : "Mar 25"}
                                                            </Moment>
                                                            {/* <h4 className="tw-text-black">{info.createdOn ? info.createdOn : "Mar 25"}</h4> */}
                                                        </div>
                                                    </div>
                                                    <div className="tw-flex tw-items-center">
                                                        <div className="tw-mr-3 tw-text-center">
                                                            <h3>{info.replies ? info.replies : "58"}</h3>
                                                            <p className="text-muted">Replies</p>
                                                        </div>
                                                        {/* <div className="tw-text-center">

                                                <MdArrowDropUp size="40px" />

                                                <span className="mutaed">{info.count} </span>
                                                < MdArrowDropDown size="40px" />
                                            </div> */}
                                                        <p className="tw-flex tw-flex-col tw-items-center">
                                                            <FaSortUp size="27px" />
                                                            <strong className="tw--my-3">{info.voteCount ? info.voteCount : "74"}</strong>

                                                            <FaSortDown size="27px" />
                                                        </p>
                                                        <div className="tw-ml-3 tw-text-center">
                                                            <h3>{info.views ? info.views : "102"}</h3>
                                                            <p className="text-muted">Views</p>
                                                        </div>

                                                    </div>
                                                    <div className="tw-flex">
                                                        <button class=" ml-3 tw-text-center tw-p-2 green-btn tw-text-white"
                                                            onClick={() => approvedProposalsFunction(info)}
                                                        >Approve</button>
                                                        <h3 class="tw-border-2  tw-border-black tw-ml-3 text-center tw-p-2 tw-text-green-900">Disapprove</h3>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="s-p-description tw-flex tw-justify-between tw-items-center">
                                                    <div className="description tw-w-4/5">
                                                        <p>{info.description} </p>

                                                    </div>
                                                    <div className="s-p-view tw-w-1/5 tw-text-center ">
                                                        <p>
                                                            <Link href={`/proposal-info/${info._id}`}>
                                                                <a className="grdient-btn tw-rounded tw-p-2 tw-text-white">View Proposal</a>
                                                            </Link>
                                                        </p>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }
                                <Pagination
                                    actionsPerPage={actionsPerPage}
                                    totalActions={actions.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                    nextPage={nextPage}
                                    previousPage={previousPage}
                                />
                            </div>


                        </div>
                    </div>
                    : <div className='minority__earned__actions'>
                        <Loader />
                    </div>
            }
            {/* approved Proposals.------########### */}
            <ApprovedProposal />
            {/* rejected Proposals.-------------page */}
            <div className="tw-container tw-mx-auto ">
                <div className=" tw-rounded-lg rejected" >
                    <div className="tw-p-4 tw-text-white tw-m-4">
                        <h1 className="tw-uppercase tw-text-2xl">rejected Proposals.</h1>
                        <p><small>The following proposals you voted got rejected.</small></p>
                    </div>
                    {/* mapping--------- */}
                    {
                        infomations.slice(0, 1).map(info =>
                            <div className={`tw-p-4 tw-m-8   tw-bg-white tw-text-dark tw-mb-6 tw-border-t-8  tw-border-${info.borderColor}-500`}>
                                <div className="pl-5 pr-5">
                                    <div className=" tw-flex tw-justify-between ">
                                        <div className="">
                                            <h1 className="parsonal-title ">Proposal Title</h1>
                                            <p> <small>Type : Enhancement</small> <small>Catergory : Incubator</small></p>

                                        </div>
                                        <div className="tw-flex tw-items-center">
                                            <ImCross style={{ background: "#FF03B5" }} className="text-white p-1 rounded" />
                                            <h3 className="tw-ml-2"><strong>Rejected</strong></h3>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="tw-flex tw-justify-between tw-items-center ">
                                        <div className="tw-flex">
                                            <img src="/assets/images/coreteamimg/user.png" alt="user" />
                                            <div className="tw-mr-3">
                                                <p className="tw-text-muted">Created by </p>
                                                <h4 className="tw-text-black">{info.createdBy}</h4>
                                            </div>
                                            <div>
                                                <p className="tw-text-muted">Created on </p>
                                                <h4 className="tw-text-black">{info.createdOn}</h4>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-items-center">
                                            <div className="tw-mr-3 tw-text-center">
                                                <h3>{info.replies}</h3>
                                                <p className="text-muted">Replies</p>
                                            </div>
                                            {/* <div className="tw-text-center">

                                                <MdArrowDropUp size="40px" />

                                                <span className="mutaed">{info.count} </span>
                                                < MdArrowDropDown size="40px" />
                                            </div> */}

                                            <div className="tw-ml-3 tw-text-center">
                                                <h3>{info.views}</h3>
                                                <p className="text-muted">Views</p>
                                            </div>
                                            <p className="tw-flex tw-flex-col tw-items-center tw-ml-3">
                                                <FaSortUp size="27px" />
                                                <strong className="tw--my-3">{info.voteCount}</strong>

                                                <FaSortDown size="27px" />
                                            </p>
                                        </div>

                                    </div>
                                    <hr />
                                    <div className="s-p-description tw-flex tw-justify-between tw-items-center">
                                        <div className="description tw-w-4/5">
                                            <p>{info.description} </p>
                                        </div>
                                        <div className="s-p-view tw-w-1/5 tw-text-center">
                                            <p>

                                                <button className="green-btn tw-p-2 tw-rounded tw-text-white">View Proposal</button>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }

                </div>
            </div>




            {/* task-card-----------part */}
            <div className="tw-flex tw-my-20 tw-container tw-mx-auto">
                <div className="customCard tw-w-1/2 tw-mr-10">
                    <div className="customCard-title tw-flex  tw-justify-center ">
                        <p className="tw-mr-4">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z" stroke="#FFC700" />
                            </svg>

                        </p>
                        <h3>4 Tasks Require Revision</h3>
                    </div>

                    {infomations.slice(0, 2).map((proposal) => (
                        <div class="tw-mx-8 tw-flex    gap-10  ">
                            <div className="task-card tw-w-1/2 tw-my-6 tw-rounded-bl-lg tw-rounded-br-3xl tw-mr-6">
                                <div className="task-des tw-flex ">
                                    <svg className="tw-mr-2" width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FF00B8" />
                                    </svg>

                                    <h1 className="tw-mr-3 tw-text-md tw-text-indigo-900 tw-font-semibold">Lorem ipsum dolor sit amet, consecte tur adipiscing elit.</h1>

                                    <div className="tw-block">
                                        <img src="/assets/images/coreteamimg/user.png" alt="user" className="tw-h-6 tw-w-6  tw-block" />
                                        <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block"><span className="tw-purple-800 te-p-2">LA</span></div>
                                    </div>
                                </div>
                                <div className="task-date  tw-flex tw-items-center ">
                                    <p className="">
                                        <RiFlag2Fill className="tw-text-pink-600 tw-mr-2" />
                                    </p>
                                    <p className=" tw-text-center tw-text-sm tw-text-black">
                                        May 27
                                    </p>
                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center">
                                    <div className="design tw-mt-4">Design</div>
                                    <p className="tw-text-pink-500">21 hours ago</p>

                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center ">
                                    <div className="feature tw-w-8 tw-mt-4 ">Develop</div>
                                    <div className="tw-flex tw-items-center">
                                        <p className="tw-text-indigo-900">More Operations</p>
                                        <BsThreeDotsVertical className="tw-text-black" />
                                    </div>

                                </div>

                            </div>



                            <div className="task-card tw-w-1/2 tw-my-6 tw-rounded-bl-lg tw-rounded-br-3xl ">
                                <div className="task-des tw-flex ">
                                    <svg className="tw-mr-2" width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FF00B8" />
                                    </svg>

                                    <h1 className="tw-mr-3 tw-text-md tw-text-indigo-900 tw-font-semibold">Lorem ipsum dolor sit amet, consecte tur adipiscing elit.</h1>

                                    <div className="tw-block">
                                        <img src="/assets/images/coreteamimg/user.png" alt="user" className="tw-h-6 tw-w-6  tw-block" />
                                        <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block"><span className="tw-purple-800 te-p-2">LA</span></div>
                                    </div>
                                </div>
                                <div className="task-date  tw-flex tw-items-center ">
                                    <p className="">
                                        <RiFlag2Fill className="tw-text-pink-600 tw-mr-2" />
                                    </p>
                                    <p className=" tw-text-center tw-text-sm tw-text-black">
                                        May 27
                                    </p>
                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center">
                                    <div className="design tw-mt-4">Design</div>
                                    <p className="tw-text-pink-500">21 hours ago</p>

                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center ">
                                    <div className="feature tw-w-8 tw-mt-4 ">Develop</div>
                                    <div className="tw-flex tw-items-center">
                                        <p className="tw-text-indigo-900">More Operations</p>
                                        <BsThreeDotsVertical className="tw-text-black" />
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}


                </div>

                <div className="customCard tw-w-1/2 tw-mr-10">
                    <div className="customCard-title tw-flex  tw-justify-center ">
                        <p className="tw-mr-4">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z" stroke="#FFC700" />
                            </svg>

                        </p>
                        <h3>3 Tasks Changed Status To Completed.</h3>
                    </div>

                    {infomations.slice(0, 2).map((proposal) => (
                        <div class="tw-mx-8 tw-flex    gap-10  ">
                            <div className="task-card tw-w-1/2 tw-my-6 tw-rounded-bl-lg tw-rounded-br-3xl tw-mr-6">
                                <div className="task-des tw-flex ">
                                    <svg className="tw-mr-2" width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FF00B8" />
                                    </svg>

                                    <h1 className="tw-mr-3 tw-text-md tw-text-indigo-900 tw-font-semibold">Lorem ipsum dolor sit amet, consecte tur adipiscing elit.</h1>

                                    <div className="tw-block">
                                        <img src="/assets/images/coreteamimg/user.png" alt="user" className="tw-h-6 tw-w-6  tw-block" />
                                        <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block"><span className="tw-purple-800 te-p-2">LA</span></div>
                                    </div>
                                </div>
                                <div className="task-date  tw-flex tw-items-center ">
                                    <p className="flag pink">
                                        <RiFlag2Fill className="tw-text-pink-600 tw-mr-2" />
                                    </p>
                                    <p className=" tw-text-center tw-text-sm tw-text-black">
                                        May 27
                                    </p>
                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center">
                                    <div className="design tw-mt-4">Design</div>
                                    <p className="tw-text-pink-500">21 hours ago</p>

                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center ">
                                    <div className="feature tw-w-8 tw-mt-4 ">Develop</div>
                                    <div className="tw-flex tw-items-center">
                                        <p className="tw-text-indigo-900">More Operations</p>
                                        <BsThreeDotsVertical className="tw-text-black" />
                                    </div>

                                </div>

                            </div>



                            <div className="task-card tw-w-1/2 tw-my-6 tw-rounded-bl-lg tw-rounded-br-3xl ">
                                <div className="task-des tw-flex ">
                                    <svg className="tw-mr-2" width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4.5" cy="4.5" r="4.5" fill="#FF00B8" />
                                    </svg>

                                    <h1 className="tw-mr-3 tw-text-md tw-text-indigo-900 tw-font-semibold">Lorem ipsum dolor sit amet, consecte tur adipiscing elit.</h1>

                                    <div className="tw-block">
                                        <img src="/assets/images/coreteamimg/user.png" alt="user" className="tw-h-6 tw-w-6  tw-block" />
                                        <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block"><span className="tw-purple-800 te-p-2">LA</span></div>
                                    </div>
                                </div>
                                <div className="task-date  tw-flex tw-items-center ">
                                    <p className="flag pink">
                                        <RiFlag2Fill className="tw-text-pink-600 tw-mr-2" />
                                    </p>
                                    <p className=" tw-text-center tw-text-sm tw-text-black">
                                        May 27
                                    </p>
                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center">
                                    <div className="design tw-mt-4">Design</div>
                                    <p className="tw-text-pink-500">21 hours ago</p>

                                </div>
                                <div className="tw-flex tw-justify-between  tw-items-center ">
                                    <div className="feature tw-w-8 tw-mt-4 ">Develop</div>
                                    <div className="tw-flex tw-items-center">
                                        <p className="tw-text-indigo-900">More Operations</p>
                                        <BsThreeDotsVertical className="tw-text-black" />
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>


            </div>
            {/* earlier------------part */}
            <div className="tw-flex new  tw-my-4 align-items-center container tw-py-3 my-5">
                <h3 className="text-uppercase tw-text-2xl">earlier</h3> <div className="tw-bg-indigo-900 hr-line  tw-ml-3"></div>

            </div>
            {/* rejected Proposals.-------------page */}
            <div className="tw-container tw-mx-auto ">
                <div className=" tw-rounded-lg rejected" >
                    <div className="tw-p-4 tw-text-white tw-m-4">
                        <h1 className="tw-uppercase tw-text-2xl">rejected Proposals.</h1>
                        <p><small>The following proposals you voted got rejected.</small></p>
                    </div>
                    {/* mapping--------- */}
                    {
                        infomations.slice(0, 1).map(info =>
                            <div className={`tw-p-4 tw-m-8   tw-bg-white tw-text-dark tw-mb-6 tw-border-t-8  tw-border-${info.borderColor}-500`}>
                                <div className="pl-5 pr-5">
                                    <div className=" tw-flex tw-justify-between ">
                                        <div className="">
                                            <h1 className="parsonal-title ">Proposal Title</h1>
                                            <p> <small>Type : Enhancement</small> <small>Catergory : Incubator</small></p>

                                        </div>
                                        <div className="tw-flex tw-items-center">
                                            <ImCross style={{ background: "#FF03B5" }} className="text-white p-1 rounded" />
                                            <h3 className="tw-ml-2"><strong>Rejected</strong></h3>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="tw-flex tw-justify-between tw-items-center ">
                                        <div className="tw-flex">
                                            <img src="/assets/images/coreteamimg/user.png" alt="user" />
                                            <div className="tw-mr-3">
                                                <p className="tw-text-muted">Created by </p>
                                                <h4 className="tw-text-black">{info.createdBy}</h4>
                                            </div>
                                            <div>
                                                <p className="tw-text-muted">Created on </p>
                                                <h4 className="tw-text-black">{info.createdOn}</h4>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-items-center">
                                            <div className="tw-mr-3 tw-text-center">
                                                <h3>{info.replies}</h3>
                                                <p className="text-muted">Replies</p>
                                            </div>

                                            <div className="tw-ml-3 tw-text-center">
                                                <h3>{info.views}</h3>
                                                <p className="text-muted">Replies</p>
                                            </div>
                                            <p className="tw-flex tw-flex-col tw-items-center tw-ml-3">
                                                <FaSortUp size="27px" />
                                                <strong className="tw--my-3">{info.voteCount}</strong>

                                                <FaSortDown size="27px" />
                                            </p>
                                        </div>

                                    </div>
                                    <hr />
                                    <div className="s-p-description tw-flex tw-justify-between tw-items-center">
                                        <div className="description tw-w-4/5">
                                            <p>{info.description} </p>
                                        </div>
                                        <div className="s-p-view tw-w-1/5 tw-text-center">
                                            <p>
                                                <button className="green-btn tw-p-2 tw-rounded tw-text-white">View Proposal</button>
                                            </p>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }

                </div>
            </div>



        </div>
    );
};



export default Notification;
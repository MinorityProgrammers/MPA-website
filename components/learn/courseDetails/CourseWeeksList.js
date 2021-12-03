import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CourseWeeksList = (props) => {
    const toastId = useRef(null);
    const router = useRouter();
    const {courseId, beginnerPercentage, intermediatePercentage, advancedPercentage, specificUBeginnerModules, specificUIntermediateModules, specificUAdvancedModules, beginnerLength, intermediateLength, advancedLength} = props;

    //Beginner level completion status
    let completedStatusBeginner = 0;
    let uncompletedStatusBeginner = 0;
    let completedBeginner = 0;
    specificUBeginnerModules.forEach(module => {
        completedBeginner += module.completed;
        if(module.completionStatus === "completed"){
            completedStatusBeginner++;
        }
        else if(module.completionStatus === "uncompleted"){
            uncompletedStatusBeginner++;
        }
    })

    //Intermediate level completion status
    let completedStatusIntermediate = 0;
    let uncompletedStatusIntermediate = 0;
    let completedIntermediate = 0;
    specificUIntermediateModules.forEach(module => {
        completedIntermediate += module.completed;
        if(module.completionStatus === "completed"){
            completedStatusIntermediate++;
        }
        else if(module.completionStatus === "uncompleted"){
            uncompletedStatusIntermediate++;
        }
    })

    //Advanced level completion status
    let completedStatusAdvanced = 0;
    let uncompletedStatusAdvanced = 0;
    specificUAdvancedModules.forEach(module => {
        if(module.completionStatus === "completed"){
            completedStatusAdvanced++;
        }
        else if(module.completionStatus === "uncompleted"){
            uncompletedStatusAdvanced++;
        }
    })

    const goToIntermediateModules = () => {
        if(beginnerLength === completedBeginner && completedBeginner !== 0) {
            const intermediateModules = `/courses/${courseId}/modules/intermediate`;
            router.push(intermediateModules);
        }
        else {
            toast.dismiss(toastId.current);
            toast.error("Please complete the previous level!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }
    }
    const goToAdvancedModules = () => {
        if(intermediateLength === completedIntermediate && completedIntermediate !== 0) {
            const advancedModules = `/courses/${courseId}/modules/advanced`;
            router.push(advancedModules);
        }
        else{
            toast.dismiss(toastId.current);
            toast.error("Please complete the previous level!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }
    } 

    
    return (
        <>
            <Link href={`/courses/${courseId}/modules/beginner`} className="text-decoration-none">
                <div  className="px-md-3 mx-md-5 mt-4 pt-2 all-weeks">
                    <div className="course-weeks mb-4 moduleInfo">

                        <div className="pt-3 pr-3">
                            {!isNaN(beginnerPercentage) &&
                                <>
                                    {
                                        completedStatusBeginner === beginnerLength ? <p className="green-status ml-auto"><span>completed</span></p>
                                        :
                                        uncompletedStatusBeginner > 0 || completedStatusBeginner > 0 ? <p className="red-status ml-auto"><span>uncompleted</span></p>
                                        :
                                        <p className="white-status ml-auto"><span>Start</span></p>
                                    }
                                </>
                            }
                        </div>
                        <div className="d-pb-1 text-center">
                            <h4 className="mt-2 mb-2 text-white text-capitalize">Beginner Level</h4>
                        </div>
                        <div className="d-flex justify-content-center mb-1" style={{padding: '0px 115px'}}>
                            <div className="progress mt-1">
                                 <div className="progress-bar" style={{width: beginnerPercentage + "%"}}  role="progressbar" aria-valuenow={beginnerPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <p className="text-center text-white pb-3">
                            {!isNaN(beginnerPercentage) && 
                                <span className="">{beginnerPercentage}% completed</span> 
                            }
                        </p>
                    </div>
                </div>  
            </Link> 

            <a onClick={goToIntermediateModules} className="text-decoration-none">
                <div  className="px-md-3 mx-md-5 mt-4 pt-2 all-weeks">
                    <div className="course-weeks mb-4 moduleInfo">
                        <div className="pt-3 pr-3">
                            {!isNaN(intermediatePercentage) &&
                                <>
                                    {
                                        completedStatusIntermediate === intermediateLength ? <p className="green-status ml-auto"><span>completed</span></p>
                                        :
                                        uncompletedStatusIntermediate > 0 || completedStatusIntermediate > 0 ? <p className="red-status ml-auto"><span>uncompleted</span></p>
                                        :
                                        <p className="white-status ml-auto"><span>Start</span></p>
                                    }
                                </>
                            }
                        </div>
                        <div className="d-pb-1 text-center">
                            <h4 className="mt-2 mb-2 text-white text-capitalize">Intermediate Level</h4>
                        </div>
                        <div className="d-flex justify-content-center mb-1" style={{padding: '0px 115px'}}>
                            <div className="progress mt-1">
                                <div className="progress-bar" style={{width: intermediatePercentage + "%"}}  role="progressbar" aria-valuenow={intermediatePercentage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <p className="text-center text-white pb-3">
                            {!isNaN(intermediatePercentage) &&
                                <span className="">{intermediatePercentage}% completed</span> 
                            }
                        </p>
                    </div>
                </div>  
            </a>

            <a onClick={goToAdvancedModules} className="text-decoration-none">
                <div  className="px-md-3 mx-md-5 mt-4 pt-2 all-weeks">
                    <div className="course-weeks mb-4 moduleInfo">
                        <div className="pt-3 pr-3">
                            {!isNaN(advancedPercentage) &&
                                <>
                                    {
                                        completedStatusAdvanced === advancedLength ? <p className="green-status ml-auto"><span>completed</span></p>
                                        :
                                        uncompletedStatusAdvanced > 0 || completedStatusAdvanced > 0 ? <p className="red-status ml-auto"><span>uncompleted</span></p>
                                        :
                                        <p className="white-status ml-auto"><span>Start</span></p>
                                    }
                                </>
                            }
                        </div>
                        <div className="d-pb-1 text-center">
                            <h4 className="mt-2 mb-2 text-white text-capitalize">Advanced Level</h4>
                        </div>
                        <div className="d-flex justify-content-center mb-1" style={{padding: '0px 115px'}}>
                            <div className="progress mt-1">
                                <div className="progress-bar" style={{width: advancedPercentage + "%"}}  role="progressbar" aria-valuenow={advancedPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <p className="text-center text-white pb-3">
                            {!isNaN(advancedPercentage) &&
                                <span className="">{advancedPercentage}% completed</span> 
                            }
                        </p>
                    </div>
                </div>  
            </a>
            <ToastContainer />
        </>
    );
};

export default CourseWeeksList;
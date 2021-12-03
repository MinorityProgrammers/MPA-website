import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const UserCoursesList = ({enrolledCourse}) => {
    const [modules, setModules] = useState([]);
    const [userModules, setUserModules] = useState([]);
    const {name, description, earn, _id} = enrolledCourse.courseId;

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userInfo'))['token'];
        axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/course/${_id}/module`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        .then(res => {
            setModules(res.data.data);
        })
    }, [_id])

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userInfo'))['token'];
        axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/learn/${_id}/userModules`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        .then(res => {
            setUserModules(res.data.data);
        })
    }, [_id])
    
    const totalUserModules = userModules.filter(eModule => modules.some(module => eModule.moduleId._id === module._id));
    const totalModulesLength = modules.length;

    //user progress
    let completionRate = 0;
    let completedModules = 0;
    totalUserModules.forEach(module => {
        completionRate += module.completionRate;
        if (module.completed) {
            completedModules++;
        }
    })
    const userPercentages = Math.round(completionRate / totalModulesLength);
    

    return (
        <div className="courses-items px-3 mb-4 mx-2">
            <div className="pt-3">
                <div className="earn-rate ml-auto d-flex align-items-center">
                    <img src="https://i.ibb.co/Yjpy6PN/dot.png" className="img-fluid ml-2" alt="" />
                    <span className="pl-4">Earn {earn}</span>
                </div>
            </div>
            <div className="d-pb-1 ml-2">
                <h3 className="course-name mt-3 mb-0">{name}</h3>
            </div>
            <p className="course-des ml-2">{description}</p>

            <div className="text-center pb-4">
                <Link href={`/courses/${_id}`}>
                    <button className="btn px-5 banner-btn mt-3">
                        Learn
                    </button>
                </Link>
            </div>

            <div>
                <div className="module-rate d-flex justify-content-center">
                    <span>{completedModules}/{totalModulesLength} Modules</span>
                </div>
                <div className="progress mt-1 mb-1 mx-4">
                    <div className="progress-bar" style={{width: userPercentages + "%"}}  role="progressbar" aria-valuenow={userPercentages} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                {!isNaN(userPercentages) &&
                    <p className="text-center pb-3" style={{fontSize: '14px', fontWeight: '300'}}>{userPercentages}% Completed</p>
                }
            </div>
        </div>
    );
};

export default UserCoursesList;
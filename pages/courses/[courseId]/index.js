import React, { useState, useEffect } from 'react';
import Course from '../../../components/learn/courseDetails/Course';
import Layout from '../../../components/Layout';
import HomepageNav from '../../../components/HomepageNav';
import Footer from "../../../components/Footer";
import axios from 'axios';
import SkeletonElement from '../../../components/learn/SkeletonElement';

export async function getServerSideProps(context) {

    return {
        props:{
            params: context.params,
        }
    }
}

const CoursePage = ({params}) => {
    const [data, setData] = useState([]);
    const {courseId} = params;
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [course, setCourse] = useState({});
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    const redirect = () => {
        window.location.href = '/learn-page'; 
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userInfo = localStorage.getItem('userInfo');
  
        if (token === null || userInfo === {}) {
            redirect(); 
        }
        if(modules.length == 0){
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, []); 

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userInfo'));
        if(userToken !== null){
            axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/learn/userCourses`, {
                headers: {
                    'Authorization': `Bearer ${userToken['token']}`
                }
            })
            .then(res => {
                if(res.data.data.length > 0){
                    setEnrolledCourses(res.data.data);
                }
                else{
                    redirect(); 
                }
            })
        }
    }, [])

    const singleCourse = enrolledCourses?.filter(course => course.courseId._id === courseId);
    useEffect(() => {
        singleCourse.forEach(course => {
            setCourse(course?.courseId);
        })
    }, [singleCourse])

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userInfo'));
        if(userToken !== null){
            axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/course/${courseId}/module`, {
                headers: {
                    'Authorization': `Bearer ${userToken['token']}`
                }
            })
            .then(res => {
                setModules(res.data.data);
            })
        }
    }, [courseId])


    return (
        <Layout pageTitle="Course - Minority Programmers Association">
            {loading === true ?
                <>
                    <HomepageNav page={'learn-page'} setData={setData} />
                    <SkeletonElement />
                </>
                :
                <>
                    <HomepageNav page={'learn-page'} setData={setData} />
                    <Course userInfo={data} course={course} modules={modules} />
                    <Footer />
                </>
            }
        </Layout>
    );
};

export default CoursePage;
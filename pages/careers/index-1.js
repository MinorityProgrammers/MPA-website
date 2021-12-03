import CareersMainComponent from '../../components/career-components/CareersMainComponent.js';
import React, {Component} from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const CareersPage = () => {
    let router = useRouter();
    useEffect(()=>{
            router.push('/careers/jobs')
        },
        [])
    return (
        <div className="careers">
            Redirecting to Companies Section
        </div>
    );
};

export default CareersPage;

import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router';
import CareersMainComponent from '../../components/career-components/CareersMainComponent.js';

const CareersPage = function () {
  const router = useRouter();
  useEffect(
    () => {
      router.push('/careers/jobs');
    },
    [],
  );
  return (
    <div className="careers">
      Redirecting to Companies Section
    </div>
  );
};

export default CareersPage;

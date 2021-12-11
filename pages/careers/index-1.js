import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CareersPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/careers/jobs');
  }, []);
  return <div className="careers">Redirecting to Companies Section</div>;
};

export default CareersPage;

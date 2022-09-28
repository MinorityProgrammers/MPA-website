import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const Redirect = () => {
  useEffect(() => {
    window.location.href = 'https://lu.ma/ef6ksupx';
  }, []);
  return (
    <Layout pageTitle="MPA - Workshop" />
  );
};
export default Redirect;

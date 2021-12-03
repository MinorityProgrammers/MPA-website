import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/HomepageNav';
import Layout from '../../components/Layout';




const ProposalInfoPage = () => {
    const [open, setOpen] = useState(false);
    return (
        <Layout>
            <HomepageNav open={open} setOpen={setOpen} />
            <div className="page-gradient">
                <h1 className="tw-mt-20 ">Details Page</h1>
            </div>
            <Footer />
        </Layout>
    );
};

export default ProposalInfoPage;
import React, { useState } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import Chats from '../components/Chats';

const Chat = function () {
  const [data, setData] = useState([]);

  return (
    <Layout pageTitle="MPA - Chats">
      <HomepageNav setData={setData} page="Chat" />
      <Chats data={data} />
    </Layout>
  );
};

export default Chat;

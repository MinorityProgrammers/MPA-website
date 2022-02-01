import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function UserDatas() {
  return (
    <div className="tw-py-5 profileTopSection tw-relative tw-z-10">
      <section className="tw-max-w-7xl tw-mx-auto tw-shadow-md tw-overflow-hidden ">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </section>
    </div>
  );
}

export default UserDatas;

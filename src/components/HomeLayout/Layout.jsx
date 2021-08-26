import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./Layout.css";
import { NavLink } from "react-router-dom";
const { Header, Sider } = Layout;
const HomeLayout = ({ header, children }) => {
  return (
    <Layout className="w-screen h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="select-none text-2xl font-extralight text-white p-4">
          Road Rakshak
        </div>
        <div className="my-4 flex flex-col" theme="dark">
          <NavLink
            activeClassName="bg-green-400 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/myaccount"
          >
            <UserOutlined />
            &nbsp;My Account
          </NavLink>
          <NavLink
            activeClassName="bg-green-400 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/travel"
          >
            <EnvironmentOutlined />
            &nbsp;Travel
          </NavLink>
          <NavLink
            activeClassName="bg-green-400 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/fileacomplaint"
          >
            <UploadOutlined />
            &nbsp;File a complaint
          </NavLink>
          <NavLink
            activeClassName="bg-green-400 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/news"
          >
            <BankOutlined />
            &nbsp;News
          </NavLink>
        </div>
      </Sider>
      <Layout>
        <Header className="select-none site-layout-sub-header-background flex justify-center items-center text-lg font-bold">
          {header}
        </Header>
        <div className="overflow-y-auto mx-8 my-6">
          <div className="site-layout-background p-6">{children}</div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;

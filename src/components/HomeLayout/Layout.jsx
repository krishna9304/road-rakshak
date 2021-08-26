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
const { Header, Content, Footer, Sider } = Layout;
const HomeLayout = ({ header, children }) => {
  return (
    <Layout className="w-screen h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="text-2xl font-extralight text-white p-4">
          Road Rakshak
        </div>
        <div className="flex flex-col" theme="dark">
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
        <Header className="site-layout-sub-header-background flex justify-center items-center text-lg font-bold">
          {header}
        </Header>
        <Content className="overflow-y-auto" style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer className="font-light" style={{ textAlign: "center" }}>
          Road Rakshak ©2021 Created by{" "}
          <span className="font-bold">Code Crux</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;

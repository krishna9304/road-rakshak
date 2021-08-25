import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./dashboard.css";
const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            My Account
          </Menu.Item>
          <Menu.Item key="2" icon={<EnvironmentOutlined />}>
            Travel
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            File a complaint
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            News
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            content
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

export default Dashboard;

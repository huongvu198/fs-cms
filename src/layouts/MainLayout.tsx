import { Layout, theme } from "antd";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ flex: 1, height: "100vh" }}>
      <Layout
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sidebar />
        <Content
          style={{
            padding: "24px",
            flex: 1,
            background: "#f0f2f5",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <ToastContainer draggable draggableDirection="y" />
    </Layout>
  );
};

export default MainLayout;

import React from "react";
import { Layout, Menu } from "antd";
import menuItems from "../config/menuConfig";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Sider width={200} style={{ background: "#fff", maxHeight: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        My Logo
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/profile"]}
        // style={{ height: "100%" }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;

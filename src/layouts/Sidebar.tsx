import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import useMenuItems from "../config/menuConfig";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const menuItems = useMenuItems();
  const location = useLocation();
  const currentPath = location.pathname;
  // const { t, i18n } = useTranslation();

  // Hàm đổi ngôn ngữ
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <Sider width={250} style={{ background: "#fff", maxHeight: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          fontWeight: "bold",
        }}
      >
        <span
          className="brand-name"
          style={{
            marginLeft: "10px",
            fontSize: "28px",
            fontWeight: 600,
            fontFamily: "'Lobster', cursive",
            color: "#d1567c",
            cursor: "pointer",
            userSelect: "none",
            letterSpacing: "1.5px",
          }}
          onClick={() => navigate("/")}
        >
          Pinky
        </span>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        defaultOpenKeys={[currentPath]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />

      {/* <div style={{ textAlign: "center", padding: "16px" }}>
        <Button onClick={() => changeLanguage("en")}>English</Button>
        <Button onClick={() => changeLanguage("vi")} style={{ marginLeft: 8 }}>
          Tiếng Việt
        </Button>
      </div> */}
    </Sider>
  );
};

export default Sidebar;

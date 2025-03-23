import React from "react";
import { MenuProps } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { Dashboard } from "./routeConfig";

const menuItems: MenuProps["items"] = [
  {
    key: Dashboard,
    icon: React.createElement(LaptopOutlined),
    label: "Dashboard",
  },
  {
    key: "/profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
    children: [
      {
        key: "/profile/view",
        label: "View Profile",
      },
      {
        key: "/profile/edit",
        label: "Edit Profile",
      },
    ],
  },
];

export default menuItems;

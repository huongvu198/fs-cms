import React, { useMemo } from "react";
import { MenuProps } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Dashboard, Product } from "./routeConfig";
import { useTranslation } from "react-i18next";

const useMenuItems = () => {
  const { t, i18n } = useTranslation();

  const menuItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: Product,
        icon: React.createElement(ProductOutlined),
        label: t("product_management"),
      },
      {
        key: Dashboard,
        icon: React.createElement(LaptopOutlined),
        label: t("dashboard"),
      },
      {
        key: "/profile",
        icon: React.createElement(UserOutlined),
        label: t("profile"),
        children: [
          {
            key: "/profile/view",
            label: t("view_profile"),
          },
          {
            key: "/profile/edit",
            label: t("edit_profile"),
          },
        ],
      },
    ];
  }, [t, i18n.language]);

  return menuItems;
};

export default useMenuItems;

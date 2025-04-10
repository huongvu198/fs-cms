import React, { useMemo } from "react";
import { MenuProps } from "antd";
import {
  // UserOutlined,
  LaptopOutlined,
  ProductOutlined,
  FileProtectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Account,
  AccountAdmin,
  AccountUser,
  Dashboard,
  MasterData,
  Product,
} from "./routeConfig";
import { useTranslation } from "react-i18next";

const useMenuItems = () => {
  const { t, i18n } = useTranslation();

  const menuItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: Dashboard,
        icon: React.createElement(LaptopOutlined),
        label: t("dashboard"),
      },
      {
        key: Product,
        icon: React.createElement(ProductOutlined),
        label: t("product_management"),
      },
      {
        key: Account,
        icon: React.createElement(UserOutlined),
        label: t("manage_account"),
        children: [
          {
            key: AccountAdmin,
            label: t("account_admin"),
          },
          {
            key: AccountUser,
            label: t("account_user"),
          },
        ],
      },
      {
        key: MasterData,
        icon: React.createElement(FileProtectOutlined),
        label: t("master_data"),
      },
    ];
  }, [t, i18n.language]);

  return menuItems;
};

export default useMenuItems;

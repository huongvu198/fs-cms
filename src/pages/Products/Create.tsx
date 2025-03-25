import { useState } from "react";
import { Tabs, TabsProps } from "antd";
import PageContent from "../../components/common/PageContent";
import { useTranslation } from "react-i18next";
import BasicInfo from "../../components/Products/BasicInfo";
import SaleInfo from "../../components/Products/SaleInfo";

const AddProduct = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("1");

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const handleBack = () => {
    setActiveTab((prev) => (Number(prev) - 1).toString());
  };

  const handleNext = () => {
    setActiveTab((prev) => (Number(prev) + 1).toString());
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("product_info_basic"),
      children: <BasicInfo handleNext={handleNext} />,
    },
    {
      key: "2",
      label: t("product_info_sale"),
      children: <SaleInfo handleBack={handleBack} />,
    },
  ];

  return (
    <>
      <PageContent title={t("product_add")}>
        <Tabs activeKey={activeTab} onChange={onChange} items={items} />
      </PageContent>
    </>
  );
};

export default AddProduct;

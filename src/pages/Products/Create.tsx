import { Tabs, TabsProps } from "antd";
import PageContent from "../../components/common/PageContent";
import { useTranslation } from "react-i18next";
import BasicInfo from "../../components/Products/BasicInfo";
import SaleInfo from "../../components/Products/SaleInfo";
const AddProduct = () => {
  const { t } = useTranslation();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("product_info_basic"),
      children: <BasicInfo />,
    },
    {
      key: "2",
      label: t("product_info_sale"),
      children: <SaleInfo />,
    },
    {
      key: "3",
      label: t("product_other_info"),
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <PageContent title={t("product_add")}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </PageContent>
    </>
  );
};

export default AddProduct;

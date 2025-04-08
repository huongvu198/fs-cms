import { useState, useEffect, useRef } from "react";
import { Tabs, Collapse, Button, FormInstance } from "antd";
import PageContent from "../../components/common/PageContent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getSegments } from "../../redux/segmentSlice";
import TitleComponent from "../../components/common/Title";
import { createProduct, getLoading } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../config/routeConfig";
import Sale from "../../components/products/create/Sale";
import Basic from "../../components/products/create/Basic";

const AddProduct = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");
  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const refBasicInfo = useRef<HTMLDivElement>(null);
  const refSaleInfo = useRef<HTMLDivElement>(null);
  const isLoading = useSelector(getLoading);
  const basicInfoFormRef = useRef<FormInstance>(null);
  const saleInfoFormRef = useRef<FormInstance>(null);

  useEffect(() => {
    dispatch(getSegments());
  }, []);

  const handleSubmit = async () => {
    try {
      await basicInfoFormRef.current?.validateFields();
      await saleInfoFormRef.current?.validateFields();

      // Gọi getFieldsValue để lấy dữ liệu đã upload ảnh
      const saleInfoData = await saleInfoFormRef.current?.getFieldsValue();
      const basicInfoData = await basicInfoFormRef.current?.getFieldsValue();

      if (!basicInfoData || !saleInfoData) return;

      // Gửi dữ liệu lên server
      const finalData = { ...basicInfoData, ...saleInfoData };
      await dispatch(createProduct(finalData));
      navigate(Product);
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
    }
  };

  const onChangeTab = (key: string) => {
    if (key === "1") {
      setActiveTab("1");
      setActiveKeys(["1"]);
      refBasicInfo.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (key === "2") {
      setActiveTab("2");
      setActiveKeys(["1", "2"]);
      setTimeout(() => {
        refSaleInfo.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === refBasicInfo.current) {
              setActiveTab("1");
            } else if (entry.target === refSaleInfo.current) {
              setActiveTab("2");
            }
          }
        });
      },
      { threshold: 0.3 } // Kích hoạt khi 30% phần tử xuất hiện trong viewport
    );

    if (refBasicInfo.current) observer.observe(refBasicInfo.current);
    if (refSaleInfo.current) observer.observe(refSaleInfo.current);

    return () => {
      if (refBasicInfo.current) observer.unobserve(refBasicInfo.current);
      if (refSaleInfo.current) observer.unobserve(refSaleInfo.current);
    };
  }, []);

  return (
    <PageContent title={t("product_add")}>
      {/* Tabs giữ nguyên */}
      <Tabs activeKey={activeTab} onChange={onChangeTab}>
        <Tabs.TabPane tab={t("product_info_basic")} key="1" />
        <Tabs.TabPane tab={t("product_info_sale")} key="2" />
      </Tabs>

      {/* Nội dung hiển thị bằng Collapse */}
      <Collapse
        activeKey={activeKeys}
        onChange={(keys) => {
          setActiveKeys(keys as string[]);
        }}
      >
        <Collapse.Panel
          key="1"
          header={<TitleComponent text={t("product_info_basic")} level={5} />}
        >
          <div ref={refBasicInfo}>
            <Basic ref={basicInfoFormRef} />
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header={<TitleComponent text={t("product_info_sale")} level={5} />}
          key="2"
        >
          <div ref={refSaleInfo}>
            <Sale ref={saleInfoFormRef} />
          </div>
        </Collapse.Panel>
      </Collapse>
      <div style={{ textAlign: "right" }}>
        <Button
          type="default"
          style={{ marginTop: 10 }}
          onClick={() => navigate(Product)}
        >
          {t("cancel")}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ marginTop: 10, marginLeft: 8 }}
          onClick={handleSubmit}
        >
          {t("submit_step")}
        </Button>
      </div>
    </PageContent>
  );
};

export default AddProduct;

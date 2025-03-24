import { Button } from "antd";
import PageContent from "../../components/common/PageContent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProductNew } from "../../config/routeConfig";

const ProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContent title={t("product_list")}>
      <Button onClick={() => navigate(ProductNew)}>Create New</Button>
    </PageContent>
  );
};

export default ProductPage;

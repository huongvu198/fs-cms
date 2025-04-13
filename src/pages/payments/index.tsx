import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageContent from "src/components/common/PageContent";
import { AppDispatch } from "src/redux/store";
import ListBank from "./List";

const PaymentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <PageContent title={t("bank_list")}>
      <ListBank navigate={navigate} dispatch={dispatch} />
    </PageContent>
  );
};

export default PaymentPage;

import PageContent from "../../../components/common/PageContent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import ListUser from "../List";
import { UserType } from "../../../shared/enum";

const AdminPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <PageContent title={t("admin_list")}>
      <ListUser navigate={navigate} dispatch={dispatch} type={UserType.ADMIN} />
    </PageContent>
  );
};

export default AdminPage;

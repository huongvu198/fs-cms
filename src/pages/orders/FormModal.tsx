import {
  Form,
  Modal,
  Layout,
  Card,
  Tag,
  Row,
  Col,
  Table,
  TableProps,
} from "antd";
import { OrderModalProps } from "../../props/Orders/OrderModalProps";
import { useEffect } from "react";
import { FormattedNumber } from "react-intl";
import { formatDateToVietnamese } from "../../shared/common";
import { OrderItem } from "../../interfaces/order.interface";
const { Sider, Content } = Layout;

export const ModalOrderDetail = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  isLoadingAction = false,
}: OrderModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  const columns: TableProps<OrderItem>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Kích cỡ",
      dataIndex: "sizeValue",
      key: "sizeValue",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",

      render: (_, record) => (
        <FormattedNumber
          value={Number(record?.price)}
          style="currency"
          currency="VND"
        />
      ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
      render: (_, record) => (
        <FormattedNumber
          value={Number(record?.subtotal)}
          style="currency"
          currency="VND"
        />
      ),
    },
  ];

  console.log("initialValues", initialValues);

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", width: "100%" }}>
          Chi tiết đơn hàng
        </div>
      }
      visible={open}
      onCancel={onClose}
      width={1300}
      // bodyStyle={{
      //   minHeight: 600,
      // }}
      footer={<></>}
    >
      <Layout style={{ background: "white" }}>
        <Content style={{ marginRight: 16 }}>
          <Card
            type="inner"
            title={`Đơn hàng: ${initialValues?.id?.toUpperCase()}`}
            extra={<Tag>{initialValues?.status}</Tag>}
            bodyStyle={{ background: "rgba(0, 0, 0, 0.02)", padding: 12 }}
            headStyle={{ borderBottom: "none", padding: 12 }}
          >
            Thời gian đặt hàng:{" "}
            {initialValues?.createdAt &&
              formatDateToVietnamese(initialValues.createdAt)}
          </Card>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card
                  type="inner"
                  title="KHÁCH HÀNG"
                  headStyle={{ color: "rgba(0, 0, 0, 0.50)", padding: 12 }}
                  style={{ flex: 1 }}
                  bodyStyle={{ padding: 12 }}
                >
                  <h5
                    style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}
                  >
                    {initialValues?.user?.fullName}
                  </h5>
                  <p style={{ marginBottom: 8, fontSize: 14 }}>
                    {initialValues?.user?.email}
                  </p>
                </Card>
              </div>
            </Col>

            <Col span={12}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card
                  type="inner"
                  title="NGƯỜI NHẬN"
                  headStyle={{ color: "rgba(0, 0, 0, 0.50)", padding: 12 }}
                  style={{ flex: 1 }}
                  bodyStyle={{ padding: 12 }}
                >
                  <h5
                    style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}
                  >
                    {initialValues?.address?.fullName}
                  </h5>
                  <p style={{ marginBottom: 8, fontSize: 14 }}>
                    {initialValues?.address?.phone}
                  </p>
                  <p style={{ marginBottom: 0, fontSize: 14 }}>
                    {[
                      initialValues?.address?.street,
                      initialValues?.address?.ward,
                      initialValues?.address?.district,
                      initialValues?.address?.city,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </Card>
              </div>
            </Col>
          </Row>
          <Table
            bordered={true}
            columns={columns}
            dataSource={initialValues?.items}
            style={{ marginTop: 16 }}
            pagination={false}
          />
        </Content>
        <Sider width="25%" style={{ background: "white" }}>
          <Card
            type="inner"
            title="THANH TOÁN"
            headStyle={{ color: "rgba(0, 0, 0, 0.50)", padding: 12 }}
            bodyStyle={{ padding: 12 }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "rgba(0, 0, 0, 0.50)" }}>Thanh toán</span>
                <span>{initialValues?.paymentMethod}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "rgba(0, 0, 0, 0.50)" }}>Trạng thái</span>
                <span>{initialValues?.paymentStatus}</span>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "rgba(0, 0, 0, 0.50)" }}>Trạng thái</span>
                <span>{initialValues?.paymentStatus}</span>
              </div> */}
            </div>
          </Card>
        </Sider>
      </Layout>
    </Modal>
  );
};

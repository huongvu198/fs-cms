import { Button, Input, Space, Table, TableProps, Tooltip } from "antd";
import { ListOrderProps } from "../../props/Orders/ListOrderProps";
import { useSelector } from "react-redux";
import {
  getListOrder,
  getLoading,
  getLoadingAction,
  getOrders,
  getPagination,
} from "../../redux/orderSlice";
import { useEffect, useState } from "react";
import { getDefaultPerPage } from "../../redux/appSlice";
import { Order } from "../../interfaces/order.interface";
import DateTag from "src/components/common/DateTagProps";
import { FormattedNumber } from "react-intl";
import { EyeOutlined } from "@ant-design/icons";
import { ModalOrderDetail } from "./FormModal";

const ListOrder = ({ dispatch }: ListOrderProps) => {
  const orders = useSelector(getOrders);
  const pagination = useSelector(getPagination);
  const isLoading = useSelector(getLoading);
  const isLoadingAction = useSelector(getLoadingAction);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(useSelector(getDefaultPerPage));
  const [searchText, setSearchText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchData(currentPage, perPage, searchText);
  }, [currentPage, perPage]);

  const fetchData = (page: number, perPage: number, search?: string) => {
    dispatch(getListOrder({ page, perPage, search }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, perPage, searchText);
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPerPage(pagination.pageSize);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleUpdateOrder = () => {};

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "TT Đơn hàng",
      dataIndex: "status",
      key: "status",
      align: "center",
      // render: (value: string) => renderTag(value, ORDER_STATUS_LABELS),
    },
    {
      title: "HT Thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      // render: (value: string) => renderTag(value, PAYMENT_METHOD_LABELS),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (value: string) => (
        <FormattedNumber
          value={Number(value)}
          style="currency"
          currency="VND"
        />
      ),
    },
    {
      title: "TG Đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => <DateTag date={value} />,
    },
    {
      title: "Tiện ích",
      key: "action",
      align: "center",
      render: (_, record: Order) => (
        <EyeOutlined onClick={() => handleViewDetail(record)} size={28} />
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Space>
          <Input
            placeholder={`Tìm kiếm tài khoản`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Space>

        {/* <Tooltip title="Thêm mới">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          />
        </Tooltip> */}
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: perPage,
          total: pagination.totalItems,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
      <ModalOrderDetail
        open={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleUpdateOrder}
        initialValues={selectedOrder || undefined}
        isLoadingAction={isLoadingAction}
      />
    </>
  );
};

export default ListOrder;

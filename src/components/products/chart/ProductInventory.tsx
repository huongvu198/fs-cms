import { Table, TableProps } from "antd";
import { FormattedNumber } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { IProductInventory } from "../../../interfaces/analytic.interface";
import {
  getInventory,
  getInventorySelector,
} from "../../../redux/analyticSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { getDefaultPerPage } from "../../../redux/appSlice";

type DataType = IProductInventory;

const ProductInventory = () => {
  const { data, loading, pagination } = useSelector(getInventorySelector);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(useSelector(getDefaultPerPage));

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage, perPage]);

  const fetchData = (page: number, perPage: number) => {
    dispatch(getInventory({ page, perPage }));
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPerPage(pagination.pageSize);
  };

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const columns: TableProps<IProductInventory>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      render: (_, record: IProductInventory) => (
        <FormattedNumber
          value={Number(record.price)}
          style="currency"
          currency="VND"
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      align: "center",
    },
    {
      title: "Đã bán",
      dataIndex: "totalSoldQuantity",
      key: "totalSoldQuantity",
      align: "center",
    },
    {
      title: "Tồn kho",
      dataIndex: "totalInventory",
      key: "totalInventory",
      align: "center",
    },
  ];
  return (
    <Table
      rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        size: "small",
        current: currentPage,
        pageSize: perPage,
        total: pagination.totalItems,
        showSizeChanger: false,
      }}
      onChange={handleTableChange}
    />
  );
};

export default ProductInventory;

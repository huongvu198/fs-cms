import { useState } from "react";
import { TableProps, Tag, Space } from "antd";
import DataTable from "../../components/DataTable";
import PageContent from "../../components/PageContent";
import SearchFilter from "../../components/SearchFilter";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const DashboardPage = () => {
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContent title="Dashboard">
      <SearchFilter onFilter={setData} />
      <DataTable columns={columns} data={data} pageSize={10} />
    </PageContent>
  );
};

export default DashboardPage;

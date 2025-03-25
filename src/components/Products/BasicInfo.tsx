import { Form, Input, Select, InputNumber, Switch, Button, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import TitleComponent from "../common/Title";
import { useTranslation } from "react-i18next";
import { BasicInfoProps } from "../../props/Products/BasicInfoProps";

const BasicInfo = ({ handleNext }: BasicInfoProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm(); // Khởi tạo form

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log("Dữ liệu gửi đi:", values);
  };

  return (
    <>
      <TitleComponent text={t("product_info_basic")} level={5} />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        style={{
          maxWidth: "100%",
          width: "100%",
          margin: "0 auto",
          marginTop: "20px",
        }}
        onFinish={onFinish}
      >
        <Form.Item label={t("product_name")} name="product_name" required>
          <Input style={{ width: "100%" }} placeholder={t("product_name")} />
        </Form.Item>

        <Form.Item label={t("product_price")} name="product_price" required>
          <InputNumber style={{ width: "20%" }} />
        </Form.Item>

        <Form.Item label={t("product_category")} required>
          <Flex gap="small">
            <Form.Item name="gender" noStyle>
              <Select placeholder={t("product_sex")} style={{ width: "100%" }}>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="category" noStyle>
              <Select
                placeholder={t("product_category")}
                style={{ width: "100%" }}
              >
                <Select.Option value="pants">Quần</Select.Option>
                <Select.Option value="shirt">Áo</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="subcategory" noStyle>
              <Select
                placeholder={t("product_sub_category")}
                style={{ width: "100%" }}
              >
                <Select.Option value="long-pants">Quần Dài</Select.Option>
                <Select.Option value="shorts">Quần Đùi</Select.Option>
              </Select>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item
          label={t("product_description")}
          name="product_description"
          required
        >
          <TextArea rows={11} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={t("product_display")}
          name="product_display"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" onClick={() => handleNext()}>
            {t("next_step")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicInfo;

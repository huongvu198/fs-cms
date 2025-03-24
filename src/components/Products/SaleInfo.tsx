import { Form, Input, Select, InputNumber, Switch, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import TitleComponent from "../common/Title";
import { useTranslation } from "react-i18next";

const SaleInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <TitleComponent text={t("product_info_sale")} level={5} />

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        style={{
          maxWidth: "100%",
          width: "100%",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <Form.Item label={t("product_name")} required>
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={t("product_price")} required>
          <InputNumber style={{ width: "20%" }} />
        </Form.Item>
        <Form.Item label={t("product_category")} required>
          <Select style={{ width: "50%" }}>
            <Select.Option value="demo">T-Shirts</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={t("product_sex")} required>
          <Select style={{ width: "50%" }}>
            <Select.Option value="demo">Nam</Select.Option>
            <Select.Option value="demo">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={t("product_description")} required>
          <TextArea rows={12} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={t("product_display")}
          valuePropName="checked"
          required
        >
          <Switch />
        </Form.Item>
        {/* <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                color: "inherit",
                cursor: "inherit",
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item> */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
          <Button type="primary">{t("next_step")}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SaleInfo;

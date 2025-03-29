/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Button,
  Space,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
  InputNumber,
  Flex,
  Input,
} from "antd";
import TitleComponent from "../common/Title";
import { useTranslation } from "react-i18next";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import clothingColors from "../../shared/constants";
import { t } from "i18next";
import { FileType, getBase64 } from "../../shared/file";
import { SaleInfoProps } from "../../props/Products/SaleInfoProps";
import { uploadMultipleImages } from "../../services/cloundinary";

const UploadImage = ({ field }: { field: any }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const form = Form.useFormInstance(); // Lấy instance của Form để cập nhật dữ liệu
  const { t } = useTranslation();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Giữ lại 1 ảnh duy nhất

    // Cập nhật giá trị vào `Form` để tránh lỗi validate
    form.setFieldValue(
      ["variants", field.name, "image"],
      newFileList.length > 0 ? newFileList : undefined
    );
    form.validateFields([["variants", field.name, "image"]]); // Re-validate ngay khi chọn ảnh
  };

  return (
    <Form.Item
      label={t("image")}
      name={[field.name, "image"]}
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      rules={[{ required: true, message: "Please upload an image!" }]}
    >
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length < 1 && (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t("upload")}</div>
          </button>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Form.Item>
  );
};

const ColorPickerField = ({ field }: { field: any }) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("color")}
      name={[field.name, "color"]}
      rules={[{ required: true, message: "Please select a color!" }]}
    >
      <Select placeholder={t("color")} style={{ width: "50%" }}>
        {clothingColors.map((color) => (
          <Select.Option
            key={color.code}
            value={color.code}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                display: "inline-block",
                width: 16,
                height: 16,
                backgroundColor: color.code,
                marginRight: 8,
                borderRadius: "50%",
                border: "1px solid #ccc",
                position: "relative",
                top: "2px",
              }}
            />
            {color.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

const SizeQuantityFields = ({ field }: { field: any }) => {
  const { t } = useTranslation();

  return (
    <Form.List
      name={[field.name, "sizes"]}
      initialValue={[{ size: undefined, quantity: undefined }]}
    >
      {(sizeFields, { add, remove }) => (
        <>
          <Form.Item label={t("size&quantity")} required>
            {sizeFields.map((sizeField) => (
              <Flex
                key={sizeField.key}
                align="center"
                gap="small"
                style={{ paddingBottom: 10 }}
              >
                <Form.Item
                  name={[sizeField.name, "size"]}
                  noStyle
                  rules={[{ required: true, message: "Select size" }]}
                >
                  <Select placeholder={t("size")} style={{ width: 120 }}>
                    <Select.Option value="XL">XL</Select.Option>
                    <Select.Option value="XXL">XXL</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name={[sizeField.name, "quantity"]}
                  noStyle
                  rules={[{ required: true, message: "Enter quantity" }]}
                >
                  <InputNumber
                    placeholder={t("quantity")}
                    min={1}
                    style={{ width: 120 }}
                  />
                </Form.Item>

                <Button
                  type="link"
                  danger
                  onClick={() => remove(sizeField.name)}
                  style={{ marginLeft: 8 }}
                >
                  <MinusCircleOutlined />
                </Button>
              </Flex>
            ))}
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 21, offset: 4 }}
            style={{ textAlign: "left" }}
          >
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              {t("add_size&quantity")}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

const VariantFields = () => {
  return (
    <Form.List
      name="variants"
      initialValue={[
        {
          color: undefined,
          image: undefined,
        },
      ]}
    >
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space
              key={field.key}
              direction="vertical"
              style={{
                display: "flex",
                width: "100%",
                paddingTop: 12,
                paddingBottom: 12,
                border: "1px solid #d9d9d9",
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              <ColorPickerField field={field} />
              <UploadImage field={field} />
              <SizeQuantityFields field={field} />
              <Button
                type="link"
                danger
                onClick={() => remove(field.name)}
                style={{ float: "right" }}
              >
                {t("remove_variants")}
              </Button>
            </Space>
          ))}
          <Button
            type="dashed"
            onClick={() => add()}
            block
            icon={<PlusOutlined />}
          >
            {t("add_variants")}
          </Button>
        </>
      )}
    </Form.List>
  );
};

const SaleInfo = ({ handleBack }: SaleInfoProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const filesToUpload = values.variants
        .map((variant: any) => variant.image?.[0]?.originFileObj)
        .filter((file: File | undefined) => file !== undefined);

      const uploadedUrls = await uploadMultipleImages(filesToUpload);

      const updatedVariants = values.variants.map(
        (variant: any, index: number) => ({
          ...variant,
          image: uploadedUrls[index] || variant.image,
        })
      );

      const updatedValues = { ...values, variants: updatedVariants };

      console.log("Dữ liệu gửi đi:", updatedValues);
      // Gửi updatedValues lên server
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    }
  };

  return (
    <>
      <TitleComponent text={t("product_info_sale")} level={5} />

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
        <Form.Item
          label={t("discount")}
          name="discount"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 21 }}
        >
          <Input style={{ width: "100%" }} placeholder={t("discount")} />
        </Form.Item>

        <VariantFields />

        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ textAlign: "right", marginTop: 10 }}
        >
          <Button type="dashed" onClick={() => handleBack()}>
            {t("back_step")}
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            {t("submit_step")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SaleInfo;

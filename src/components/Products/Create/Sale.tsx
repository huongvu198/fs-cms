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
  Switch,
} from "antd";
import { useTranslation } from "react-i18next";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { t } from "i18next";
import { FileType, getBase64 } from "../../../shared/file";
import { SaleInfoRef } from "../../../props/Products/SaleInfoProps";
import { uploadMultipleImages } from "../../../services/cloundinary";
import { colors, shirtSizes } from "../../../shared/constants";

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
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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

const ColorPickerField = ({
  field,
  allFields,
}: {
  field: any;
  allFields: any;
}) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  // Lấy danh sách màu đã chọn
  const selectedColors = allFields
    .filter((f: any) => f.name !== field.name) // Loại bỏ biến thể hiện tại
    .map((f: any) => form.getFieldValue(["variants", f.name, "color"]))
    .filter(Boolean);

  return (
    <Form.Item
      label={t("color")}
      name={[field.name, "color"]}
      rules={[{ required: true, message: "Please select a color!" }]}
    >
      <Select placeholder={t("color")} style={{ width: "50%" }} allowClear>
        {colors.map((color) => (
          <Select.Option
            key={color.code}
            value={color.code}
            disabled={selectedColors.includes(color.code)} // Disable nếu màu đã được chọn
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
  const form = Form.useFormInstance();

  return (
    <Form.List
      name={[field.name, "sizes"]}
      initialValue={[{ size: undefined, quantity: 1 }]}
    >
      {(sizeFields, { add, remove }) => {
        // Lấy danh sách size đã chọn trong biến thể hiện tại
        const selectedSizes = sizeFields
          .map((sf) =>
            form.getFieldValue([
              "variants",
              field.name,
              "sizes",
              sf.name,
              "size",
            ])
          )
          .filter(Boolean);

        return (
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
                    <Select
                      placeholder={t("size")}
                      style={{ width: "25%" }}
                      allowClear
                    >
                      {shirtSizes.map((size) => (
                        <Select.Option
                          key={size.key}
                          value={size.key}
                          disabled={selectedSizes.includes(size.key)}
                        >
                          {size.value}
                        </Select.Option>
                      ))}
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
                      style={{ width: "25%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name={[sizeField.name, "isActive"]}
                    noStyle
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Switch size="small" />
                  </Form.Item>

                  <Button
                    type="link"
                    danger
                    onClick={() => remove(sizeField.name)}
                  >
                    <MinusCircleOutlined style={{ fontSize: 16 }} />
                  </Button>
                </Flex>
              ))}
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 21, offset: 4 }}
              style={{ textAlign: "left" }}
            >
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                disabled={selectedSizes.length >= shirtSizes.length}
              >
                {t("add_size&quantity")}
              </Button>
            </Form.Item>
          </>
        );
      }}
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
                position: "relative",
              }}
            >
              <ColorPickerField field={field} allFields={fields} />
              <UploadImage field={field} />
              <SizeQuantityFields field={field} />

              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <Form.Item
                  name={[field.name, "isActive"]}
                  noStyle
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch size="small" />
                </Form.Item>
              </div>

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

const Sale = forwardRef<SaleInfoRef>((_, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),

    getFieldsValue: async () => {
      const values = form.getFieldsValue();

      // Tìm ảnh cần upload (chỉ upload nếu chưa có URL)
      const filesToUpload = values.variants
        .map((variant: any) => {
          if (!variant.image || typeof variant.image === "string") return null;
          return variant.image[0]?.originFileObj;
        })
        .filter(Boolean);

      try {
        const uploadedUrls =
          filesToUpload.length > 0
            ? await uploadMultipleImages(filesToUpload)
            : [];

        values.variants = values.variants.map(
          (variant: any, index: number) => ({
            ...variant,
            image: uploadedUrls[index] || variant.image, // Giữ nguyên ảnh nếu đã có URL
          })
        );
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
      }

      return values;
    },
  }));

  return (
    <>
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
        initialValues={{ discount: 0 }}
      >
        <Form.Item
          label={t("discount")}
          name="discount"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 21 }}
          rules={[{ required: true, message: t("product_discount_required") }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder={t("discount")}
            min={0}
          />
        </Form.Item>

        <VariantFields />
      </Form>
    </>
  );
});

export default Sale;

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
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FileType, getBase64 } from "../../../shared/file";
import { SaleInfoUpdateRef } from "../../../props/Products/SaleInfoProps";
import { uploadMultipleImages } from "../../../services/cloundinary";
import {
  getColors,
  getPantsSizes,
  getShirtSizes,
} from "../../../redux/appSlice";

const UploadImage = ({ field }: { field: any }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const form = Form.useFormInstance();
  const { t } = useTranslation();

  useEffect(() => {
    const image = form.getFieldValue(["variants", field.name, "image"]);
    if (image && typeof image === "string") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: image, // Hiển thị ảnh từ DB
        },
      ]);
    }
  }, [form, field.name]);

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
  const colors = useSelector(getColors);

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
      <Select
        placeholder={t("color")}
        style={{ width: "50%" }}
        allowClear
        showSearch
        optionFilterProp="children"
      >
        {colors.map((color: any) => (
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
  const pantsSizes = useSelector(getPantsSizes);
  const shirtSizes = useSelector(getShirtSizes);

  return (
    <Form.List name={[field.name, "sizes"]}>
      {(sizeFields, { add, remove }) => {
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
                    initialValue={undefined}
                  >
                    <Select
                      placeholder={t("size")}
                      style={{ width: "25%" }}
                      allowClear
                      showSearch
                      optionFilterProp="children"
                    >
                      <Select.OptGroup label={t("shirt_sizes")}>
                        {shirtSizes.map((size: any) => (
                          <Select.Option
                            key={size.key}
                            value={size.key}
                            disabled={selectedSizes.includes(size.key)}
                          >
                            {size.value}
                          </Select.Option>
                        ))}
                      </Select.OptGroup>

                      {/* Chọn size quần */}
                      <Select.OptGroup label={t("pants_sizes")}>
                        {pantsSizes.map((size: any) => (
                          <Select.Option
                            key={size.key}
                            value={size.key}
                            disabled={selectedSizes.includes(size.key)}
                          >
                            {size.value}
                          </Select.Option>
                        ))}
                      </Select.OptGroup>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={[sizeField.name, "quantity"]}
                    noStyle
                    rules={[{ required: true, message: "Enter quantity" }]}
                    initialValue={1}
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
                onClick={() => {
                  add({ id: uuidv4(), isActive: false });
                }}
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
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  return (
    <Form.List name="variants">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => {
            const variant = form.getFieldValue(["variants", field.name]);
            return (
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
                  >
                    <Switch size="small" />
                  </Form.Item>
                </div>

                {!variant?.color && (
                  <Button
                    type="link"
                    danger
                    onClick={() => remove(field.name)}
                    style={{ float: "right" }}
                  >
                    {t("remove_variants")}
                  </Button>
                )}
              </Space>
            );
          })}

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

const Sale = forwardRef<SaleInfoUpdateRef>((_, ref) => {
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
        values.variants = values.variants.map((variant: any) => {
          return {
            ...variant,
            image:
              typeof variant.image === "string"
                ? variant.image
                : uploadedUrls.shift(),
          };
        });
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
      }
      return values;
    },
    setFieldsValue: (values) => {
      form.setFieldsValue(values);
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

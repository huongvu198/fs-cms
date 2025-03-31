import { Form, Input, Select, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
import { BasicInfoUpdateRef } from "../../../props/Products/BasicInfoProps";
import { useSelector } from "react-redux";
import { getListSegment } from "../../../redux/segmentSlice";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { ICategory, ISubcategory } from "../../../interfaces/segment.interface";

const Basic = forwardRef<BasicInfoUpdateRef>((_, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const segmentList = useSelector(getListSegment);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    getFieldsValue: () => form.getFieldsValue(),
    setFieldsValue: (values) => {
      form.setFieldsValue(values);
      if (values.segmentId)
        handleSegmentChange(
          values.segmentId,
          values.categoryId,
          values.subCategoryId
        );
    },
  }));

  useEffect(() => {
    const segmentId = form.getFieldValue("segmentId");
    if (segmentId) {
      handleSegmentChange(
        segmentId,
        form.getFieldValue("categoryId"),
        form.getFieldValue("subCategoryId")
      );
    }
  }, [segmentList]);

  const handleSegmentChange = (
    segmentId: string,
    categoryId?: string,
    subCategoryId?: string
  ) => {
    const selectedSegment = segmentList.find((seg) => seg._id === segmentId);
    const newCategories = selectedSegment?.categories || [];
    setCategories(newCategories);

    if (categoryId) {
      handleCategoryChange(categoryId, subCategoryId);
    } else {
      setSubcategories([]);
      form.setFieldsValue({ categoryId: undefined, subCategoryId: undefined });
    }
  };

  const handleCategoryChange = (categoryId: string, subCategoryId?: string) => {
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    const newSubcategories = selectedCategory?.subcategories || [];
    setSubcategories(newSubcategories);

    if (
      !subCategoryId ||
      !newSubcategories.some((sub) => sub._id === subCategoryId)
    ) {
      form.setFieldsValue({ subCategoryId: undefined });
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 21 }}
      layout="horizontal"
      style={{ maxWidth: "100%", width: "100%", marginTop: "20px" }}
    >
      <Form.Item
        label={t("product_name")}
        name="name"
        rules={[{ required: true, message: t("product_name_required") }]}
        validateTrigger="onBlur"
      >
        <Input placeholder={t("product_name")} />
      </Form.Item>

      <Form.Item
        label={t("product_price")}
        name="price"
        rules={[{ required: true, message: t("product_price_required") }]}
      >
        <InputNumber style={{ width: "20%" }} min={1} />
      </Form.Item>

      <Form.Item
        label={t("product_sex")}
        name="segmentId"
        rules={[{ required: true, message: t("product_sex_required") }]}
      >
        <Select
          onChange={(value) => handleSegmentChange(value)}
          style={{ width: "50%" }}
        >
          {segmentList.map((seg) => (
            <Select.Option key={seg._id} value={seg._id}>
              {seg.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={t("product_category")} name="categoryId" required>
        <Select
          onChange={(value) => handleCategoryChange(value)}
          style={{ width: "50%" }}
          disabled={!categories.length}
        >
          {categories.map((cat) => (
            <Select.Option key={cat._id} value={cat._id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t("product_sub_category")}
        name="subCategoryId"
        required
      >
        <Select
          style={{ width: "50%" }}
          disabled={!subcategories.length}
          allowClear
        >
          {subcategories.map((sub) => (
            <Select.Option key={sub._id} value={sub._id}>
              {sub.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t("product_description")}
        name="description"
        validateTrigger="onBlur"
        required
        rules={[{ required: true, message: "Description is required" }]}
      >
        <TextArea placeholder={t("product_description")} rows={4} />
      </Form.Item>

      <Form.Item
        label={t("product_display")}
        name="isActive"
        valuePropName="checked"
      >
        <Switch size="small" />
      </Form.Item>
    </Form>
  );
});

export default Basic;

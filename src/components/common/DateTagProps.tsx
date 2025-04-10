import React from "react";
import { Tag } from "antd";
import { formatDateToVietnamese } from "../../shared/common";

interface DateTagProps {
  date: string | Date;
}

const DateTag: React.FC<DateTagProps> = ({ date }) => {
  return <Tag color="blue">{formatDateToVietnamese(date)}</Tag>;
};

export default DateTag;

import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const MiniCalendar = (props) => {
  const { RangePicker } = DatePicker;

  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  return (
    <React.Fragment>
      <Space direction="vertical" size={12}>
        <DatePicker showTime={{ format: "HH:mm" }} onChange={onChange} onOk={onOk} />
      </Space>
      ,
    </React.Fragment>
  );
};

export default MiniCalendar;

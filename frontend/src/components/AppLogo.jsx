// src/components/AppLogo.jsx
import React from "react";
import { CheckSquareFilled } from "@ant-design/icons";

const AppLogo = ({ size = "2.5rem" }) => {
  return (
    <div
      className="flex items-center justify-center bg-blue-600 rounded-full"
      style={{ width: size, height: size }}
    >
      <CheckSquareFilled
        style={{ fontSize: `calc(${size} * 0.55)`, color: "white" }}
      />
    </div>
  );
};

export default AppLogo;

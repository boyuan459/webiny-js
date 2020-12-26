import React from "react";
import styled from "@emotion/styled";
import { AdminLayoutComponentPlugin } from "@webiny/app-admin/types";

const AdminLayoutRoot = styled("div")({
  flex: "1"
});

const plugins: AdminLayoutComponentPlugin[] = [
  {
    name: "admin-layout-component-content",
    type: "admin-layout-component",
    render({ content }) {
    return <AdminLayoutRoot>{content}</AdminLayoutRoot>
    }
  }
];

export default plugins;

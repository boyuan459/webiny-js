import React from "react";
import { AdminLayoutComponentPlugin } from "@webiny/app-admin/types";

const plugin: AdminLayoutComponentPlugin = {
  name: "admin-layout-component-header",
  type: "admin-layout-component",
  render() {
    return <div>AppBar</div>;
  }
};

export default plugin;

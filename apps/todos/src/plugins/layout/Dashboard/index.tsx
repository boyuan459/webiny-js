import React from "react";
import styled from "@emotion/styled";
import { AdminAppBarTopPlugin } from "types"
import Dashboard from "./Dashboard";

const Wrapper = styled("div")({
  margin: "10px 0",
  ".todos-logo": {
    color: "var(--mdc-theme-surface)"
  }
});

export default [
  {
    name: "admin-appbar-dashboard",
    type: "admin-appbar-top",
    render() {
      return (
        <Wrapper>
          <Dashboard />
        </Wrapper>
      );
    }
  } as AdminAppBarTopPlugin
];

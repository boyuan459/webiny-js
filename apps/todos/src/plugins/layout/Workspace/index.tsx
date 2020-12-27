import React from "react";
import styled from "@emotion/styled";
import { AdminAppBarTopPlugin } from "types"
import Workspace from "./Workspace";

const Wrapper = styled("div")({
  margin: "10px 0",
  ".todos-logo": {
    color: "var(--mdc-theme-surface)"
  }
});

export default [
  {
    name: "admin-appbar-workspace",
    type: "admin-appbar-top",
    render() {
      return (
        <Wrapper>
          <Workspace />
        </Wrapper>
      );
    }
  } as AdminAppBarTopPlugin
];

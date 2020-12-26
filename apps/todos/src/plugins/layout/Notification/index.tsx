import React from "react";
import styled from "@emotion/styled";
import { AdminAppBarTopPlugin } from "types"
import Notification from "./Notification";

const Wrapper = styled("div")({
  margin: "10px 0",
  ".todos-logo": {
    color: "var(--mdc-theme-surface)"
  }
});

export default [
  {
    name: "admin-appbar-notification",
    type: "admin-appbar-top",
    render() {
      return (
        <Wrapper>
          <Notification />
        </Wrapper>
      );
    }
  } as AdminAppBarTopPlugin
];

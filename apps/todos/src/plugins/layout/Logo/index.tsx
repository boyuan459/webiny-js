import React from "react";
import styled from "@emotion/styled";
import { AdminAppBarTopPlugin } from "types"
import Logo from "./Logo";

const Wrapper = styled("div")({
  margin: "10px 0",
  ".todos-logo": {
    color: "var(--mdc-theme-surface)"
  }
});

export default [
  {
    name: "admin-appbar-logo",
    type: "admin-appbar-top",
    render() {
      return (
        <Wrapper>
          <Logo />
        </Wrapper>
      );
    }
  } as AdminAppBarTopPlugin
];

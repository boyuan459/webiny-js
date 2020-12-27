import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";
import { AdminLayoutComponentPlugin } from "@webiny/app-admin/types";
import { renderPlugins } from "@webiny/app/plugins";
import {
  AdminAppBarTopPlugin,
  AdminAppBarMiddlePlugin,
  AdminAppBarBottomPlugin
} from "types";
import AppBarSection from "./AppBarSection";

const middleBar = css({
  width: "100%",
  height: "30%",
  boxSizing: "border-box",
  "&.mdc-top-app-bar__section": {
    padding: "0",
    flexDirection: "column",
  }
});

const edgeBars = css({
  width: "100%",
  height: "40%",
  boxSizing: "border-box",
  "&.mdc-top-app-bar__section": {
    padding: "0",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "var(--mdc-theme-surface)"
  }
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "55px",
  height: "100vh",
  color: "var(--mdc-theme-surface)",
  backgroundColor: "var(--mdc-theme-primary)"
})

const plugin: AdminLayoutComponentPlugin = {
  name: "admin-layout-component-header",
  type: "admin-layout-component",
  render() {
    return (
      <Wrapper>
        <AppBarSection className={edgeBars}>
          {renderPlugins<AdminAppBarTopPlugin>("admin-appbar-top")}
        </AppBarSection>
        <AppBarSection className={middleBar}>
          {renderPlugins<AdminAppBarMiddlePlugin>("admin-appbar-middle")}
        </AppBarSection>
        <AppBarSection className={edgeBars}>
          {renderPlugins<AdminAppBarBottomPlugin>("admin-appbar-bottom")}
        </AppBarSection>
      </Wrapper>
    );
  }
};

export default plugin;

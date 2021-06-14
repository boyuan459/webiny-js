import React from "react";
import { TopAppBarTitle } from "@webiny/ui/TopAppBar";
import { AdminHeaderLeftPlugin, AdminMenuLogoPlugin } from "@webiny/app-admin/types";
import Logo from './Logo'

export default () => [
  {
    name: "admin-header-logo",
    type: "admin-header-left",
    render() {
      return (
        <TopAppBarTitle>
          <Logo white />
        </TopAppBarTitle>
      );
    }
  } as AdminHeaderLeftPlugin,
  {
    name: "admin-menu-logo",
    type: "admin-menu-logo",
    render() {
      return (
          <TopAppBarTitle>
              <Logo />
          </TopAppBarTitle>
      );
    }
  } as AdminMenuLogoPlugin
];

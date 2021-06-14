import React from "react";
import { AdminHeaderLeftPlugin } from "@webiny/app-admin/types";
import Hamburger from "./Hamburger";

const plugin = [
    {
        name: "admin-header-main-menu-icon",
        type: "admin-header-left",
        render() {
            return <Hamburger />;
        }
    } as AdminHeaderLeftPlugin
];

export default plugin;

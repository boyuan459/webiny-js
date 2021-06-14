import adminApp from "@webiny/app-admin/plugins";
import fileManager from "@webiny/app-admin/plugins/menu/fileManager";
import logo from "./layout/logo";
import menu from "./menu";

export default [
    adminApp(),
    logo(),
    menu,
    // Navigation menu footer
    // fileManager(),
];

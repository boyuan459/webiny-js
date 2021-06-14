import React, { useMemo, useEffect } from "react";
import { sortBy } from "lodash";
import { Drawer, DrawerContent, DrawerHeader } from "@webiny/ui/Drawer";
import { List, ListItem } from "@webiny/ui/List";
import { IconButton } from "@webiny/ui/Button";
import { plugins } from "@webiny/plugins";
import { AdminMenuLogoPlugin, AdminMenuPlugin, AdminDrawerFooterMenuPlugin } from "@webiny/app-admin/types";
import { useNavigation, Menu, Item, Section } from "@webiny/app-admin/plugins/menu/Navigation/components";
import { logoStyle, MenuFooter, MenuHeader, navContent, navHeader, subFooter } from "@webiny/app-admin/plugins/menu/Navigation/Styled";
import { ReactComponent as MenuIcon } from "../../../assets/icons/baseline-menu-24px.svg";

const Navigation = () => {
    const { hideMenu, menuIsShown, initSections } = useNavigation();

    useEffect(initSections, []);
    const logo = useMemo(() => {
        const logoPlugin = plugins.byName<AdminMenuLogoPlugin>("admin-menu-logo");
        if (logoPlugin) {
            return React.cloneElement(logoPlugin.render(), { className: logoStyle });
        }
        return null;
    }, []);

    const menus = [];
    const menuPlugins = plugins.byType<AdminMenuPlugin>("admin-menu");

    // First we sort by order (default: 50), and then by plugin name. In other words, if order isn't defined,
    // then we just sort by plugin name.
    menuPlugins &&
        sortBy(menuPlugins, [p => p.order || 50, p => p.name]).forEach(plugin => {
            menus.push(
                <React.Fragment key={plugin.name}>
                    {plugin.render({ Menu, Section, Item })}
                </React.Fragment>
            );
        });

    const footerMenus = [];
    const footerMenuPlugins = plugins.byType<AdminDrawerFooterMenuPlugin>(
        "admin-drawer-footer-menu"
    );

    footerMenuPlugins &&
        footerMenuPlugins.forEach(plugin => {
            footerMenus.push(
                <React.Fragment key={plugin.name}>{plugin.render({ hideMenu })}</React.Fragment>
            );
        });

    return (
        <Drawer modal open={menuIsShown()} onClose={hideMenu}>
            <DrawerHeader className={navHeader}>
                <MenuHeader>
                    <IconButton icon={<MenuIcon />} onClick={hideMenu} />
                    {logo}
                </MenuHeader>
            </DrawerHeader>
            <DrawerContent className={navContent}>{menus}</DrawerContent>
            <MenuFooter>
                <List nonInteractive>
                    {footerMenus}
                </List>
            </MenuFooter>
        </Drawer>
    );
};

export default Navigation;

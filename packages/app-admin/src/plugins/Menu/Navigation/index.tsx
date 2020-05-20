import React, { useMemo, useEffect } from "react";
import { sortBy } from "lodash";
import { Drawer, DrawerContent, DrawerHeader } from "@webiny/ui/Drawer";
import { IconButton } from "@webiny/ui/Button";
import { getPlugin, getPlugins } from "@webiny/plugins";
import { HeaderLogoPlugin, MenuPlugin } from "@webiny/app-admin/types";
import { useNavigation, Menu, Item, Section } from "./components";
import { logoStyle, MenuHeader, navContent, navHeader } from "./Styled";
import { ReactComponent as MenuIcon } from "@webiny/app-admin/assets/icons/baseline-menu-24px.svg";

const Navigation = () => {
    const { hideMenu, menuIsShown, initSections } = useNavigation();

    useEffect(initSections, []);

    const logo = useMemo(() => {
        const logoPlugin = getPlugin("header-logo") as HeaderLogoPlugin;
        if (logoPlugin) {
            return React.cloneElement(logoPlugin.render(), { className: logoStyle });
        }
        return null;
    }, []);

    const menus = [];
    const menuPlugins = getPlugins("menu") as MenuPlugin[];

    // First we sort by order (default: 50), and then by plugin name. In other words, if order isn't defined,
    // then we just sort by plugin name.
    menuPlugins &&
        sortBy(menuPlugins, [p => p.order || 50, p => p.name]).forEach(plugin => {
            menus.push(
                <menu-component key={plugin.name}>
                    {plugin.render({ Menu, Section, Item })}
                </menu-component>
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
        </Drawer>
    );
};

export default Navigation;

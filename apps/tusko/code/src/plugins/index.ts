import { plugins } from "@webiny/plugins";
import { WebinyInitPlugin } from "@webiny/app/types";
import welcomeScreenPlugins from "@webiny/app-plugin-admin-welcome-screen";
import routeNotFound from "./routeNotFound";
import basePlugins from "./base";
import apolloLinkPlugins from "./apolloLinks";
import adminPlugins from "./admin";
import securityPlugins from "./security";
import headlessCmsPlugins from "./headlessCms";
import workspaces from "./workspace";
import theme from "theme";

plugins.register([
    /**
     * Base app plugins (files, images).
     */
    basePlugins,
    /**
     * ApolloClient link plugins.
     */
    apolloLinkPlugins,
    /**
     * Complete admin app UI.
     */
    adminPlugins,
    /**
     * Renders a welcome screen with useful links at "/".
     */
    welcomeScreenPlugins(),
    /**
     * Handles location paths that don't have a corresponding route.
     */
    routeNotFound,
    /**
     * Internationalization app.
     */
    // i18nPlugins,
    /**
     * Enables storing content (pages, forms, content, ...) in multiple locales.
     */
    // i18nContentPlugins,
    /**
     * Security app and authentication plugins.
     */
    securityPlugins,
    /**
     * Page Builder app.
     */
    // pageBuilderPlugins,
    /**
     * Form Builder app.
     */
    // formBuilderPlugins,
    /**
     * Headless CMS app.
     */
    headlessCmsPlugins,
    /**
     * App theme controls page builder and form builder layouts, styles, etc.
     */
    theme(),
    workspaces(),
]);

/**
 *
 */
plugins.byType<WebinyInitPlugin>("webiny-init").forEach(plugin => plugin.init());

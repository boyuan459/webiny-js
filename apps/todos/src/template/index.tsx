import React from "react";
import { createTemplate } from "@webiny/app-template";

// App structure imports
import { ApolloProvider } from "react-apollo";
import { UiProvider } from "@webiny/app/contexts/Ui";
import { I18NProvider } from "@webiny/app-i18n/contexts/I18N";
import { SecurityProvider } from "@webiny/app-security/contexts/Security";
import { AppInstaller } from "@webiny/app-admin/components/Install/AppInstaller";
import { BrowserRouter, Route, Redirect } from "@webiny/react-router";
import { ThemeProvider } from "@webiny/app-admin/contexts/Theme";
import { CmsProvider } from "@webiny/app-headless-cms/admin/contexts/Cms";

// Other plugins
import securityPlugins from "@webiny/app-security/admin/plugins";
import cognito from "@webiny/app-plugin-security-cognito";
import cognitoTheme from "@webiny/app-plugin-security-cognito-theme/admin";
import { Plugin } from "@webiny/plugins/types";
import { RoutePlugin } from "@webiny/app/types";
import { CircularProgress } from "@webiny/ui/Progress";
import { createApolloClient } from "../apolloClient";
import layoutPlugins from "../plugins/layout";
import homePlugins from "../plugins/home";
import workspacePlugins from "plugins/workspace";

type Options = {
  cognito: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  defaultRoute?: string;
  plugins?: Plugin[];
};

export default createTemplate<Options>(opts => {
  const appStructure = [
    {
      type: "app-template-renderer",
      name: "app-template-renderer-apollo",
      render(children) {
      return <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-router",
      render(children) {
        return <BrowserRouter basename={process.env.PUBLIC_URL}>{children}</BrowserRouter>
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-ui",
      render(children) {
        return <UiProvider>{children}</UiProvider>
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-i18n",
      render(children) {
        return (
          <I18NProvider loader={<CircularProgress label="Loading locales..." />}>
            {children}
          </I18NProvider>
        )
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-app-installer",
      render(children) {
        const securityProvider = (
          <SecurityProvider loader={<CircularProgress label="Checking user..." />} />
        );

        return <AppInstaller security={securityProvider}>{children}</AppInstaller>
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-admin-theme",
      render(children) {
        return <ThemeProvider>{children}</ThemeProvider>
      }
    },
    {
      type: "app-template-renderer",
      name: "app-template-renderer-headless-cms",
      render(children) {
        return <CmsProvider>{children}</CmsProvider>
      }
    }
  ];

  const routes: RoutePlugin[] = [
    {
      type: "route",
      name: "route-not-found",
      route: <Route path="*" render={() => <Redirect to={opts.defaultRoute || "/"} />} />
    }
  ];

  const otherPlugins = [
    ...routes,
    homePlugins(),
    workspacePlugins(),
    securityPlugins(),
    cognito(opts.cognito),
    cognitoTheme(),
    layoutPlugins(),
    ...(opts.plugins || [])
  ];

  return [ ...appStructure, ...otherPlugins ]
});

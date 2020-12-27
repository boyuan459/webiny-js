import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { Route } from "@webiny/react-router";
import { SecureRoute } from "@webiny/app-security/components";
import { CircularProgress } from "@webiny/ui/Progress";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import Container from "components/Container";

const Loader = ({ children, ...props }) => (
  <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const ContentModelGroupsView = lazy(() => import("./Workspace"))

const ROLE_CMS_CONTENT_GROUPS = ["cmd:content-model-group:crud"];

export default () => [
  {
    name: "route-workspaces",
    type: "route",
    route: (
      <Route
        exact
        path="/workspaces"
        render={() => (
          <SecureRoute scopes={ROLE_CMS_CONTENT_GROUPS}>
            <Container>
              <AdminLayout>
                <Helmet title="workspace" />
                <Loader>
                  <ContentModelGroupsView />
                </Loader>
              </AdminLayout>
            </Container>
          </SecureRoute>
        )}
      />
    )
  }
];

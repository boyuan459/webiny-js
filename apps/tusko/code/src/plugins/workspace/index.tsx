import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { Route } from "@webiny/react-router";
import { SecureRoute } from "@webiny/app-security/components";
import { CircularProgress } from "@webiny/ui/Progress";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import BoardEditor from "@webiny/app-headless-cms/admin/views/Editor";
import Container from "components/Container";
import Redirect from "./Redirect";

const Loader = ({ children, ...props }) => (
  <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const Workspace = lazy(() => import("./Workspace"))

const ROLE_CMS_CONTENT_GROUPS = "cmd:content-model-group:crud";
const ROLE_CMS_CONTENT_MODELS = "cms:content-model:crud";

export default () => [
  {
    name: "route-workspaces",
    type: "route",
    route: (
      <Route
        exact
        path="/workspaces"
        render={() => (
          <SecureRoute permission={ROLE_CMS_CONTENT_GROUPS}>
            <Container>
              <AdminLayout>
                <Helmet title="workspace" />
                <Loader>
                  <Workspace />
                </Loader>
              </AdminLayout>
            </Container>
          </SecureRoute>
        )}
      />
    )
  },
  {
    name: "route-workspace",
    type: "route",
    route: (
      <Route
        exact
        path="/workspaces/:wid"
        render={() => (
          <SecureRoute permission={ROLE_CMS_CONTENT_GROUPS}>
            <Container>
              <AdminLayout>
                <Helmet title="workspace" />
                <Loader>
                  <Workspace />
                </Loader>
              </AdminLayout>
            </Container>
          </SecureRoute>
        )}
      />
    )
  },
  {
    name: "route-board",
    type: "route",
    route: (
      <Route
        exact
        path="/workspaces/:wid/boards/:id"
        render={() => (
          <SecureRoute permission={ROLE_CMS_CONTENT_MODELS}>
            <Container>
              <AdminLayout>
                <Helmet title="board" />
                <Loader>
                  <Workspace />
                </Loader>
              </AdminLayout>
            </Container>
          </SecureRoute>
        )}
      />
    )
  },
  {
    name: "route-board-edit",
    type: "route",
    route: (
      <Route
        exact
        path="/workspaces/:wid/boards/:id/edit"
        render={() => ( 
          <SecureRoute permission={ROLE_CMS_CONTENT_MODELS}>
            <BoardEditor />
          </SecureRoute>
        )}
      />
    )
  },
  {
    name: "route-board-redirect",
    type: "route",
    route: (
      <Route
        exact
        path="/cms/content-models"
        render={() => (
          <SecureRoute permission={ROLE_CMS_CONTENT_MODELS}>
            <Redirect />
          </SecureRoute>
        )}
      />
    )
  },
  {
    name: "route-board-redirect-2",
    type: "route",
    route: (
      <Route
        exact
        path="/cms/content-models/manage/:modelId"
        render={() => (
          <SecureRoute permission={ROLE_CMS_CONTENT_MODELS}>
            <Redirect />
          </SecureRoute>
        )}
      />
    )
  }
];

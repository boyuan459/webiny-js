import React from "react";
import { Helmet } from "react-helmet";
import { Route } from "@webiny/react-router";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import Home from './components/Home';

export default () => [
  {
    name: "route-root",
    type: "route",
    route: (
      <Route
        exact
        path="/"
        render={() => (
          <div className="container">
            <AdminLayout>
              <Helmet title="home" />
              <Home />
            </AdminLayout>
          </div>
        )}
      />
    )
  }
];

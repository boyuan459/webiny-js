import React from "react";
import { Route } from "@webiny/react-router";
import appTemplate from "./template"
import "./App.scss"

export default appTemplate({
  cognito: {
    region: process.env.REACT_APP_USER_POOL_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  },
  plugins: [
    {
      name: "route-welcome",
      type: "route",
      route: <Route exact path={"/welcome"} render={() => <h2>Welcome!</h2>} />
    }
  ]
})

// import adminAppTemplate from "@webiny/app-template-admin";
// import "./App.scss";

// export default adminAppTemplate({
//     cognito: {
//         region: process.env.REACT_APP_USER_POOL_REGION,
//         userPoolId: process.env.REACT_APP_USER_POOL_ID,
//         userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
//     }
// });

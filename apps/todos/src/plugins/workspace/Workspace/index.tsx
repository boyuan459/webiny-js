import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { CrudProvider } from "@webiny/app-admin/contexts/Crud";
import { useCms } from "@webiny/app-headless-cms/admin/hooks";
import {
  GET_CONTENT_MODEL_GROUP,
  LIST_CONTENT_MODEL_GROUPS,
  CREATE_CONTENT_MODEL_GROUP,
  UPDATE_CONTENT_MODEL_GROUP,
  DELETE_CONTENT_MODEL_GROUP
} from "./graphql";
import Workspaces from "./Workspaces";

const Workspace = () => {
  const { environments: { apolloClient }} = useCms();

  return (
    <CrudProvider
      delete={{
        mutation: DELETE_CONTENT_MODEL_GROUP,
        options: {
          client: apolloClient,
          refetchQueries: [ "HeadlessCmsListMenuContentGroupsModels" ]
        }
      }}
      read={{
        query: GET_CONTENT_MODEL_GROUP,
        options: {
            client: apolloClient
        }
      }}
      create={{
          mutation: CREATE_CONTENT_MODEL_GROUP,
          options: {
              client: apolloClient,
              refetchQueries: ["HeadlessCmsListMenuContentGroupsModels"]
          }
      }}
      update={{
          mutation: UPDATE_CONTENT_MODEL_GROUP,
          options: {
              client: apolloClient
          }
      }}
      list={{
          query: LIST_CONTENT_MODEL_GROUPS,
          variables: { sort: { savedOn: -1 } },
          options: {
              client: apolloClient
          }
      }}
    >
      {({ actions }) => (
        <SplitView>
          <LeftPanel span={2}>
            <Workspaces />
          </LeftPanel>
          <RightPanel span={10}>
            <div>tickets</div>
          </RightPanel>
        </SplitView>
      )}
    </CrudProvider>
  )
}

export default Workspace;

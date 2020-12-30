import React from "react";
import styled from "@emotion/styled";
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
import Workspace from "./Workspace";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  flex: "1"
});

const Page = () => {
  const { environments: { apolloClient }} = useCms();

  return (
      <Wrapper>
          <CrudProvider
              delete={{
                  mutation: DELETE_CONTENT_MODEL_GROUP,
                  options: {
                      client: apolloClient,
                      refetchQueries: ["HeadlessCmsListMenuContentGroupsModels"]
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
                      refetchQueries: ["ListContentModelGroups"]
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
                  variables: { sort: { savedOn: -1 }, limit: 10 },
                  options: {
                      client: apolloClient
                  }
              }}
          >
              {({ actions }) => <Workspaces />}
          </CrudProvider>
          <Workspace />
      </Wrapper>
  );
}

export default Page;

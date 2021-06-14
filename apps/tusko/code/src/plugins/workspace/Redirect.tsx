import React from "react";
import get from "lodash/get";
import { CircularProgress } from "@webiny/ui/Progress";
import { useRouter, Redirect } from "@webiny/react-router";
import { useQuery } from "@webiny/app-headless-cms/admin/hooks";

import { GET_CONTENT_MODEL, GET_CONTENT_MODEL_BY_MODEL_ID } from "./Workspace/Board/graphql";

const RedirectWorkspace = () => {
  const { location, match } = useRouter();
  const urlSearchParams = new URLSearchParams(location.search);
  const id = urlSearchParams.get("id");
  const modelId = get(match, "params.modelId");
  const { data, loading } = useQuery(id ? GET_CONTENT_MODEL : GET_CONTENT_MODEL_BY_MODEL_ID, {
    skip: !id && !modelId,
    variables: id ? { id } : { modelId }
  })
  const contentModel = get(data, "getContentModel.data");
  if (loading) {
    return <CircularProgress />
  }
  if (!contentModel) {
    return <Redirect to={`/`} />;
  }
  return (
    <Redirect to={`/workspaces/${get(contentModel, "group.id")}/boards/${get(contentModel, "id")}`} />
  );
}

export default RedirectWorkspace;
import React, { useState } from "react";
import styled from "@emotion/styled";
import get from "lodash/get";
import { Link, useRouter } from "@webiny/react-router";
import { useQuery } from "@webiny/app-headless-cms/admin/hooks";
import { List, ListItem, ListItemText } from "@webiny/ui/List";
import { CircularProgress } from "@webiny/ui/Progress";
import { LIST_CONTENT_MODELS_BY_GROUP } from "./graphql";

const Wrapper = styled.div`
  border-right: 1px solid var(--mdc-theme-on-background);

  .mdc-list {
    a {
      text-decoration: none;
    }
    .mdc-list-item {
      height: auto;
      padding: 3px 10px;
    }
  }
`;

const Boards = () => {
  const { match } = useRouter();
  const workspace = get(match, "params.wid");
  const board = get(match, "params.id");
  const { data, loading } = useQuery(LIST_CONTENT_MODELS_BY_GROUP, {
    variables: {
      id: workspace,
    }
  });
  const contentModels = get(data, "getContentModelGroup.data.contentModels")
  if (!workspace) {
    return (
      <Wrapper>No boards</Wrapper>
    );
  }

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Wrapper>
      <List data-testid="default-data-list">
        {contentModels.map(contentModel => (
          <Link key={contentModel.modelId} to={`/workspaces/${workspace}/boards/${contentModel.modelId}`}>
            <ListItem key={contentModel.id} selected={contentModel.modelId === board}>
              <ListItemText>{contentModel.name}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Wrapper>
  );
}

export default Boards;

import React from "react";
import get from "lodash/get";
import slice from "lodash/slice";
import concat from "lodash/concat";
import sortBy from "lodash/sortBy";
import { useQuery } from "@webiny/app-headless-cms/admin/hooks";
import { LIST_MENU_CONTENT_GROUPS_MODELS } from "@webiny/app-headless-cms/admin/viewsGraphql";

const ContentModelGroupsMenuItems = ({ Section, Item }) => {
  const response = useQuery(LIST_MENU_CONTENT_GROUPS_MODELS);
  const { data } = get(response, "data.listContentModelGroups") || {};
  if (!data) {
    return null;
  }
  
  const ungrouped = get(data, "0");
  const others = sortBy(slice(data, 1), ["name"]);

  return concat(others, ungrouped).map(contentModelGroup => {
    return (
      <Item
        key={contentModelGroup.id}
        name={`cms-content-models-${contentModelGroup.id}`}
        label={contentModelGroup.name}
        path={`/workspaces/${contentModelGroup.id}`}
      />
    );
  });
};

export default ContentModelGroupsMenuItems;

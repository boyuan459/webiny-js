import React from "react";
import usePermission from "@webiny/app-headless-cms/admin/hooks/usePermission";
import { i18n } from "@webiny/app/i18n";

const t = i18n.ns("app-headless-cms/admin/menus");

const ContentModelGroupMenuSection = ({ Section, Item }) => {
  const { canCreate } = usePermission();

  const canCreateContentModelGroups = canCreate("cms.contentModelGroup");

  // Don't show the section if the user doesn't have the "write" access for cms.contentModelGroup
  if (!canCreateContentModelGroups) {
    return null;
  }

  return (
    <>
    {canCreateContentModelGroups && (
      <Item label={t`New Workspace`} path="/cms/content-model-groups" />
    )}
    </>
  );
};

export default ContentModelGroupMenuSection;

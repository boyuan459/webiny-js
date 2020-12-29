import React, { useState } from "react";
import styled from "@emotion/styled";
import { i18n } from "@webiny/app/i18n";
import { useCrud } from "@webiny/app-admin/hooks/useCrud";
import {
  DataList,
  List,
  ListItem,
  ListItemText
} from "@webiny/ui/List";
import {
  ButtonDefault,
} from "@webiny/ui/Button";
import {
  Form
} from "@webiny/form";
import { Input } from "@webiny/ui/Input";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import CreateWorkspace from './CreateWorkspace';

const t = i18n.ns("app-headless-cms/admin/content-model-groups/data-list");

const Wrapper = styled("div")({
  ".webiny-data-list": {
    ".mdc-layout-grid": {
      padding: "5px 0",
      ".mdc-layout-grid__inner": {
        gridGap: 0
      }
    }
  }
});

const CtaWrapper = styled("div")({
  padding: "10px 0"
});

const Workspaces = () => {
  const { list, actions } = useCrud();
  const [ open, setOpen ] = useState(false);

  const onCreateCancel = () => {
    setOpen(false);
  }

  const onCreate = () => {
    setOpen(true);
    actions.resetForm();
  }

  return (
      <Wrapper>
          <CtaWrapper>
              <ButtonDefault onClick={onCreate}>
                  <FiPlusCircle size={20} />
                  &nbsp;Add workspace
              </ButtonDefault>
              <CreateWorkspace open={open} onCancel={onCreateCancel} />
          </CtaWrapper>
          <Form>
              {({ Bind }) => (
                  <Bind name="phone">
                      <Input
                          leadingIcon={<FiSearch />}
                          label={"Search workspace..."}
                          disabled={false}
                      />
                  </Bind>
              )}
          </Form>
          <DataList
              {...list}
              sorters={[
                  {
                      label: t`Newest to oldest`,
                      sorters: { createdOn: -1 }
                  },
                  {
                      label: t`Oldest to newest`,
                      sorters: { createdOn: 1 }
                  },
                  {
                      label: t`Name A-Z`,
                      sorters: { name: 1 }
                  },
                  {
                      label: t`Name Z-A`,
                      sorters: { name: -1 }
                  }
              ]}
          >
              {({ data, isSelected, select }) => (
                  <List data-testid="default-data-list">
                      {data.map(item => (
                          <ListItem key={item.id} selected={isSelected(item)}>
                              <ListItemText onClick={() => select(item)}>{item.name}</ListItemText>
                          </ListItem>
                      ))}
                  </List>
              )}
          </DataList>
      </Wrapper>
  );
}

export default Workspaces;

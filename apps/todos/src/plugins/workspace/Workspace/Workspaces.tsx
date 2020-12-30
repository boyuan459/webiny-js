import React, { useState } from "react";
import styled from "@emotion/styled";
import get from "lodash/get";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { i18n } from "@webiny/app/i18n";
import { useCrud } from "@webiny/app-admin/hooks/useCrud";
import { Link, useRouter } from "@webiny/react-router";
import {
  DataList,
  List,
  ListItem,
  ListItemText
} from "@webiny/ui/List";
import {
  ButtonDefault,
} from "@webiny/ui/Button";
import { FiPlusCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CreateWorkspace from './CreateWorkspace';

const t = i18n.ns("app-headless-cms/admin/content-model-groups/data-list");

const CtaWrapper = styled("div")({
  padding: "10px 0"
});

const ButtonText = styled.span`
  margin-left: 10px;
`;

const Wrapper = styled("div")({
  position: "relative",
  width: "250px",
  backgroundColor: "var(--mdc-theme-surface)",
  borderRight: "1px solid var(--mdc-theme-on-background)",
  ".webiny-data-list": {
    ".mdc-layout-grid": {
      padding: "5px 0",
      ".mdc-layout-grid__inner": {
        gridGap: 0
      }
    },
    "a": {
      textDecoration: "none"
    },
    ".mdc-list-item": {
      padding: "3px 10px",

      ".mdc-list-item__text": {
        paddingLeft: "10px"
      }
    }
  },
  "&.close": {
    width: "45px",

    ".mdc-layout-grid__inner": {
      display: "none"
    },

    ".webiny-ui-button": {
      minWidth: "45px"
    },
    ".mdc-button__label": {
      "span": {
        display: "none"
      }
    },

    ".webiny-data-list": {
      ".mdc-list-item": {
        ".mdc-list-item__text": {
          display: "none"
        }
      }
    },
  }
});

const ArrowWrapper = styled("div")({
  position: "absolute",
  zIndex: 2,
  right: "0",
  top: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25px",
  height: "25px",
  border: "1px solid var(--mdc-theme-on-background)",
  borderRadius: "50%",
  transform: "translateX(50%)",
  backgroundColor: "var(--mdc-theme-surface)",
  cursor: "pointer"
});

const Workspaces = () => {
  const { match } = useRouter();
  const { list, actions } = useCrud();
  const [ openCreate, setOpenCreate ] = useState(false);
  const [ openWorkspaces, setOpenWorkspaces ] = useState(true);

  const onCreateCancel = () => {
    setOpenCreate(false);
  }

  const onCreate = () => {
    setOpenCreate(true);
    actions.resetForm();
  }

  return (
      <Wrapper className={classnames({ close: !openWorkspaces })}>
          <ArrowWrapper onClick={() => setOpenWorkspaces(!openWorkspaces)}>
            {openWorkspaces ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </ArrowWrapper>
          <CtaWrapper>
              <ButtonDefault onClick={onCreate}>
                  <FiPlusCircle size={20} />
                  <ButtonText>Add workspace</ButtonText>
              </ButtonDefault>
              <CreateWorkspace open={openCreate} onCancel={onCreateCancel} />
          </CtaWrapper>
          <DataList
              {...list}
              perPageOptions={[ 5, 10, 15 ]}
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
                        <Link key={item.id} to={`/workspaces/${item.id}`}>
                          <ListItem key={item.id} selected={isSelected(item) || item.id === get(match, "params.wid") }>
                            <FontAwesomeIcon
                              style={{ color: "var(--mdc-theme-text-secondary-on-background)", fontSize: "20px" }}
                              icon={item.icon.split("/")}
                            />
                            <ListItemText onClick={() => select(item)}>{item.name}</ListItemText>
                          </ListItem>
                        </Link>
                      ))}
                  </List>
              )}
          </DataList>
      </Wrapper>
  );
}

export default Workspaces;

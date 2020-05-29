import React, { useState } from "react";
import { useI18N } from "@webiny/app-i18n/hooks/useI18N";
import { css } from "emotion";
import styled from "@emotion/styled";
import { camelCase, cloneDeep } from "lodash";
// @ts-ignore
import { sortableContainer, sortableElement, sortableHandle } from "react-sortable-hoc";
import { Icon } from "@webiny/ui/Icon";
import { ReactComponent as HandleIcon } from "@webiny/app-headless-cms/admin/icons/round-drag_indicator-24px.svg";

const OptionList = styled("ul")({
    padding: 25,
    border: "1px solid var(--mdc-theme-on-background)"
});

const OptionListItem = styled("li")({
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--mdc-theme-background)",
    background: "var(--mdc-theme-surface)",
    "&:hover": {
        background: "var(--mdc-theme-background)"
    },
    "&:last-child": {
        border: "none"
    }
});

const sortableList = css({
    zIndex: 20
})

const DragHandle = sortableHandle(() => (
    <Icon icon={<HandleIcon style={{ cursor: "pointer" }} />} />
));

const SortableContainer = sortableContainer(({ children }) => <OptionList>{children}</OptionList>);

const SortableItem = sortableElement(
    ({
        setOptionsValue,
        setEditOption,
        option,
        optionsValue: options,
        Bind,
        multiple,
        optionIndex
    }) => (
        <OptionListItem>

        </OptionListItem>
    )
);

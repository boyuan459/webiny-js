import React from "react";
import { Grid, Cell } from "@webiny/ui/Grid"
import { ReactComponent as Icon } from "./icons/round-radio_button_checked-24px.svg";
import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";
import { i18n } from "@webiny/app/i18n";
const t = i18n.ns("app-headless-cms/admin/fields");

const plugin: CmsEditorFieldTypePlugin = {
    type: "cms-editor-field-type",
    name: "cmd-editor-field-type-radio",
    field: {
        type: "radio",
        label: t`Radio`,
        description: t`Store a single option`,
        icon: <Icon />,
        allowMultipleValues: false,
        allowPredefinedValues: false,
        allowIndexes: {
            singleValue: true,
            multipleValues: false
        },
        createField() {
            return {
              type: this.type,
              validation: [],
              renderer: {
                name: ""
              }
            };
        },
        renderSettings({ form }) {
            return (
                <Grid>
                    <Cell span={12}>
                        Test
                    </Cell>
                </Grid>
            )
        }
    }
};

export default plugin;

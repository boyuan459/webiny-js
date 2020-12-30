import React from "react";
import styled from "@emotion/styled";
import {
  Dialog,
  DialogTitle
} from "@webiny/ui/Dialog";
import { Form } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { ButtonPrimary, ButtonSecondary } from "@webiny/ui/Button";
import { useCrud } from "@webiny/app-admin/hooks/useCrud";
import { i18n } from "@webiny/app/i18n";
import { CircularProgress } from "@webiny/ui/Progress";
import { validation } from "@webiny/validation";
import IconPicker from "./IconPicker";

const t = i18n.ns("app-headless-cms/admin/content-model-groups/form");

const DialogWrapper = styled(Dialog)({
  ".mdc-dialog__surface": {
    minWidth: "700px"
  },
  ".mdc-layout-grid__cell": {
    "button": {
      width: "100%"
    }
  }
})

const CreateWorkspace = ({ open, onCancel }) => {
  const { form: crudForm } = useCrud();

  const onSubmit = async (form) => {
    await form.submit()
    onCancel();
  }
  return (
      <DialogWrapper open={open}>
          <DialogTitle>Create Workspace</DialogTitle>
          <Form {...crudForm} data={crudForm.id ? crudForm.data : { icon: "fas/star" }}>
              {({ data, form, Bind }) => (
                  <div>
                      {crudForm.loading && <CircularProgress />}
                      <Grid>
                          <Cell span={12}>
                              <Bind
                                  name="name"
                                  validators={validation.create("required,maxLength:100")}
                              >
                                  <Input label={t`Name`} />
                              </Bind>
                          </Cell>
                          <Cell span={12}>
                                <Bind name="icon" validators={validation.create("required")}>
                                    <IconPicker
                                        label={t`Icon`}
                                    />
                                </Bind>
                            </Cell>
                          <Cell span={12}>
                              <Bind name="description">
                                  <Input rows={5} label={t`Description`} />
                              </Bind>
                          </Cell>
                      </Grid>
                      <Grid>
                        <Cell span={6}>
                          <ButtonSecondary
                              onClick={onCancel}
                          >{t`Cancel`}</ButtonSecondary>
                        </Cell>
                        <Cell span={6}>
                          <ButtonPrimary
                              onClick={() => onSubmit(form)}
                          >{t`Save`}</ButtonPrimary>
                        </Cell>
                      </Grid>
                  </div>
              )}
          </Form>
      </DialogWrapper>
  );
}

export default CreateWorkspace;

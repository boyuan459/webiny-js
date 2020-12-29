import React, { useState } from "react";
import shortid from "shortid";
import map from "lodash/map";
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
import { useMutation } from "@webiny/app-headless-cms/admin/hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import get from "lodash/get";
import {
  CREATE_CONTENT_MODEL
} from './graphql';

const t = i18n.ns("app-headless-cms/admin/content-model-groups/form");

const indexes = [
  {fields: [ "id" ]},
  {fields: [ "groupTitle" ]}
];

const fields1 = [
  {
    _id: shortid.generate(),
    fieldId: "groupTitle",
    helpText: {
      values: []
    },
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Group Title"
        }
      ]
    },
    multipleValues: false,
    placeholderText: {
      values: []
    },
    predefinedValues: {
      enabled: null,
      values: {
        values: []
      }
    },
    renderer: {
      name: "text-input"
    },
    settings: {},
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "person",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Person"
        }
      ]
    },
    multipleValues: true,
    renderer: {
      name: "text-input"
    },
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "status",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Status"
        }
      ]
    },
    multipleValues: false,
    renderer: {
      name: "text-input"
    },
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "date",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Date"
        }
      ]
    },
    multipleValues: false,
    renderer: {
      name: "text-input"
    },
    type: "datetime",
    validation: []
  }
]

const fields2 = [
  {
    _id: shortid.generate(),
    fieldId: "groupTitle",
    helpText: {
      values: []
    },
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Group Title"
        }
      ]
    },
    multipleValues: false,
    placeholderText: {
      values: []
    },
    predefinedValues: {
      enabled: null,
      values: {
        values: []
      }
    },
    renderer: {
      name: "text-input"
    },
    settings: {},
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "person",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Person"
        }
      ]
    },
    multipleValues: true,
    renderer: {
      name: "text-input"
    },
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "status",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Status"
        }
      ]
    },
    multipleValues: false,
    renderer: {
      name: "text-input"
    },
    type: "text",
    validation: []
  },
  {
    _id: shortid.generate(),
    fieldId: "date",
    label: {
      values: [
        {
          locale: "5f8be3d271749b000715a4ca",
          value: "Date"
        }
      ]
    },
    multipleValues: false,
    renderer: {
      name: "text-input"
    },
    type: "datetime",
    validation: []
  }
]

const CreateWorkspace = ({ open, onCancel }) => {
  const { form: crudForm } = useCrud();
  const { showSnackbar } = useSnackbar();
  const [ loading, setLoading ] = useState(false);
  const [ createContentModel ] = useMutation(CREATE_CONTENT_MODEL);

  const onSubmit = async (form) => {
    const res = await form.submit()
    console.log('res', res)
    setLoading(true);
    const firstModelName = `${get(res, "name")} todos 1`;
    await createContentModel({
      variables: {
        data: {
          description: null,
          group: get(res, "id"),
          name: firstModelName,
          titleFieldId: "groupTitle",
          fields: fields1,
          indexes,
          layout: map(fields1, f => [ f._id ])
        }
      }
    });
    const secondModelName = `${get(res, "name")} todos 2`;
    const response = get(
        await createContentModel({
            variables: { data: {
              group: get(res, "id"),
              name: secondModelName,
              titleFieldId: "groupTitle",
              fields: fields2,
              indexes,
              layout: map(fields2, f => [ f._id ])
            } },
            awaitRefetchQueries: true,
            refetchQueries: [
                "HeadlessCmsListContentModels",
                "HeadlessCmsListMenuContentGroupsModels"
            ]
        }),
        "data.createContentModel"
    );
    if (response.error) {
        setLoading(false);
        return showSnackbar(response.error.message);
    }
    setLoading(false);
    onCancel();
  }
  return (
      <Dialog open={open}>
          <DialogTitle>Create Workspace</DialogTitle>
          <Form {...crudForm} data={crudForm.id ? crudForm.data : { icon: "fas/star" }}>
              {({ data, form, Bind }) => (
                  <div>
                      {(crudForm.loading || loading) && <CircularProgress />}
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
      </Dialog>
  );
}

export default CreateWorkspace;

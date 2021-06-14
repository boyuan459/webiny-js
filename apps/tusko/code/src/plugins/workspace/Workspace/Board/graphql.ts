import gql from "graphql-tag";
import upperFirst from "lodash/upperFirst";
import { plugins } from "@webiny/plugins";
import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";

const I18N_FIELDS = `
    values {
        value
        locale
    }
`;

const BASE_CONTENT_MODEL_FIELDS = `
    id
    name
    savedOn
`;

const ERROR_FIELD = /* GraphQL */ `
    {
        message
        code
        data
    }
`;

const createFieldsList = contentModel => {
  const fields = contentModel.fields.map(field => {
      const fieldPlugin = plugins.byType<CmsEditorFieldTypePlugin>(`cms-editor-field-type`).find(
          item => {
              return item.field.type === field.type;
          }
      );

      if (fieldPlugin.field.graphql && fieldPlugin.field.graphql.queryField) {
          return `${field.fieldId} ${fieldPlugin.field.graphql.queryField}`;
      }

      return `${field.fieldId} {${I18N_FIELDS}}`;
  });

  return fields.join("\n");
};

export const FIELDS_FIELDS = `
        _id
        fieldId
        type
        label {
            ${I18N_FIELDS}
        }
        placeholderText {
            ${I18N_FIELDS}
        }
        helpText {
            ${I18N_FIELDS}
        }  
        predefinedValues {
            enabled
            values {
                ${I18N_FIELDS}
            }
        }
        multipleValues 
        renderer {
            name
        }
        validation {
            name
            settings
            message {
                ${I18N_FIELDS}
            }
        }
        settings
`;

export const LIST_CONTENT_MODELS_BY_GROUP = gql`
    query HeadlessCmsListContentModelsByGroup($id: ID) {
        getContentModelGroup(id: $id) {
            data {
                id
                name
                icon
                slug
                contentModels {
                    name
                    modelId
                    savedOn
                }
            }
        }
    }
`;

export const CREATE_CONTENT_MODEL = gql`
    mutation CreateContentModel($data: CmsContentModelInput!) {
        createContentModel(data: $data) {
            data {
                id
                name
                description
                modelId
            }
            error {
                message
                data
            }
        }
    }
`;

export const UPDATE_CONTENT_MODEL = gql`
    mutation UpdateContentModel($id: ID!, $data: CmsContentModelInput!) {
      updateContentModel(id: $id, data: $data) {
        data {
          id
          name
          titleFieldId
          fields {
            ${FIELDS_FIELDS}
          }
          layout
        }
        error {
          code
          message
          data
        }
      }
    }
`;

export const GET_CONTENT_MODEL = gql`
    query GetContentModel($id: ID!) {
        getContentModel(id: $id) {
            data {
                id
                name
                description
                modelId
                titleFieldId
                pluralizedModelId
                lockedFields
                fields {
                    ${FIELDS_FIELDS}
                }
                indexes {
                    fields
                    createdOn
                }
                layout
                group {
                  id
                  name
                }
            }
            error {
                code
                message
                data
            }
        }
    }
`;

export const GET_CONTENT_MODEL_BY_MODEL_ID = gql`
    query getContentByModelId($modelId: String) {
        getContentModel(where: { modelId: $modelId }) {
            data {
                id
                modelId
                titleFieldId
                pluralizedModelId
                name
                pluralizedName
                fields {
                    ${FIELDS_FIELDS}
                }
                layout
                group {
                  id
                  name
                }
            }
            error {
                code
                message
                data
            }
        }
    }
`;

export const createListQuery = model => {
  const ucFirstPluralizedModelId = upperFirst(model.pluralizedModelId);
  const ucFirstModelId = upperFirst(model.modelId);

  return gql`
        query list${ucFirstPluralizedModelId}($where: ${ucFirstModelId}ListWhereInput, $sort: [${ucFirstModelId}ListSorter], $limit: Int, $after: String, $before: String) {
            content: list${ucFirstPluralizedModelId}(
                where: $where
                sort: $sort
                limit: $limit
                after: $after
                before: $before
            ) {
                data {
                    id
                    ${createFieldsList(model)}
                    savedOn
                    meta {
                        title {
                            value
                        }
                        published
                        version
                        parent
                        status
                    }
                }
                error ${ERROR_FIELD}
            }
        }
    `;
};

export const createUpdateMutation = model => {
  const ucFirstModelId = upperFirst(model.modelId);

  return gql`
    mutation Update${ucFirstModelId}($id: ID!, $data: ${ucFirstModelId}Input!) {
      content: update${ucFirstModelId}(where: { id: $id }, data: $data) {
        data {
          id
          ${createFieldsList(model)}
          savedOn
        }
        error ${ERROR_FIELD}
      }
    }
  `;
}

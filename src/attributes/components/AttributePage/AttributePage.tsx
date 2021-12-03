import React from "react";
import { useIntl } from "react-intl";
import slugify from "slugify";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { sectionNames } from "@dastkari/intl";
import { maybe } from "@dastkari/misc";
import { ReorderAction } from "@dastkari/types";
import { AttributeInputTypeEnum } from "@dastkari/types/globalTypes";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import {
  AttributeDetailsFragment,
  AttributeDetailsFragment_values
} from "../../types/AttributeDetailsFragment";
import AttributeDetails from "../AttributeDetails";
import AttributeProperties from "../AttributeProperties";
import AttributeValues from "../AttributeValues";

export interface AttributePageProps {
  attribute: AttributeDetailsFragment | null;
  disabled: boolean;
  errors: ProductErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  values: AttributeDetailsFragment_values[];
  onBack: () => void;
  onDelete: () => void;
  onSubmit: (data: AttributePageFormData) => void;
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
  onValueUpdate: (id: string) => void;
}

export interface AttributePageFormData {
  availableInGrid: boolean;
  filterableInDashboard: boolean;
  inputType: AttributeInputTypeEnum;
  filterableInStorefront: boolean;
  name: string;
  slug: string;
  storefrontSearchPosition: string;
  valueRequired: boolean;
  visibleInStorefront: boolean;
}

const AttributePage: React.FC<AttributePageProps> = ({
  attribute,
  disabled,
  errors,
  saveButtonBarState,
  values,
  onBack,
  onDelete,
  onSubmit,
  onValueAdd,
  onValueDelete,
  onValueReorder,
  onValueUpdate
}) => {
  const intl = useIntl();
  const initialForm: AttributePageFormData =
    attribute === null
      ? {
          availableInGrid: true,
          filterableInDashboard: true,
          filterableInStorefront: true,
          inputType: AttributeInputTypeEnum.DROPDOWN,
          name: "",
          slug: "",
          storefrontSearchPosition: "",
          valueRequired: true,
          visibleInStorefront: true
        }
      : {
          availableInGrid: maybe(() => attribute.availableInGrid, true),
          filterableInDashboard: maybe(
            () => attribute.filterableInDashboard,
            true
          ),
          filterableInStorefront: maybe(
            () => attribute.filterableInStorefront,
            true
          ),
          inputType: maybe(
            () => attribute.inputType,
            AttributeInputTypeEnum.DROPDOWN
          ),
          name: maybe(() => attribute.name, ""),
          slug: maybe(() => attribute.slug, ""),
          storefrontSearchPosition: maybe(
            () => attribute.storefrontSearchPosition.toString(),
            ""
          ),
          valueRequired: maybe(() => attribute.valueRequired, true),
          visibleInStorefront: maybe(() => attribute.visibleInStorefront, true)
        };

  const handleSubmit = (data: AttributePageFormData) =>
    onSubmit({
      ...data,
      slug: data.slug || slugify(data.name).toLowerCase()
    });

  return (
    <Form initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.attributes)}
          </AppHeader>
          <PageHeader
            title={
              attribute === null
                ? intl.formatMessage({
                    defaultMessage: "Create New Attribute",
                    description: "page title"
                  })
                : maybe(() => attribute.name)
            }
          />
          <Grid>
            <div>
              <AttributeDetails
                canChangeType={attribute === null}
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <AttributeValues
                disabled={disabled}
                values={values}
                onValueAdd={onValueAdd}
                onValueDelete={onValueDelete}
                onValueReorder={onValueReorder}
                onValueUpdate={onValueUpdate}
              />
            </div>
            <div>
              <AttributeProperties
                data={data}
                errors={errors}
                disabled={disabled}
                onChange={change}
              />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={attribute === null ? undefined : onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
AttributePage.displayName = "AttributePage";
export default AttributePage;

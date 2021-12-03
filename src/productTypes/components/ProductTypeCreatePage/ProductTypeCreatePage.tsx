import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import CardSpacer from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import Container from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import { ChangeEvent, FormChange } from "@dastkari/hooks/useForm";
import useStateFromProps from "@dastkari/hooks/useStateFromProps";
import { sectionNames } from "@dastkari/intl";
import { ProductTypeDetails_taxTypes } from "@dastkari/productTypes/types/ProductTypeDetails";
import { UserError } from "@dastkari/types";
import { WeightUnitsEnum } from "@dastkari/types/globalTypes";
import ProductTypeDetails from "../ProductTypeDetails/ProductTypeDetails";
import ProductTypeShipping from "../ProductTypeShipping/ProductTypeShipping";
import ProductTypeTaxes from "../ProductTypeTaxes/ProductTypeTaxes";

export interface ProductTypeForm {
  name: string;
  isShippingRequired: boolean;
  taxType: string;
  weight: number;
}

export interface ProductTypeCreatePageProps {
  errors: UserError[];
  defaultWeightUnit: WeightUnitsEnum;
  disabled: boolean;
  pageTitle: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  taxTypes: ProductTypeDetails_taxTypes[];
  onBack: () => void;
  onSubmit: (data: ProductTypeForm) => void;
}

const formInitialData: ProductTypeForm = {
  isShippingRequired: false,
  name: "",
  taxType: "",
  weight: 0
};

function handleTaxTypeChange(
  event: ChangeEvent,
  taxTypes: ProductTypeDetails_taxTypes[],
  formChange: FormChange,
  displayChange: (name: string) => void
) {
  formChange(event);
  displayChange(
    taxTypes.find(taxType => taxType.taxCode === event.target.value).description
  );
}

const ProductTypeCreatePage: React.FC<ProductTypeCreatePageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  saveButtonBarState,
  taxTypes,
  onBack,
  onSubmit
}: ProductTypeCreatePageProps) => {
  const intl = useIntl();
  const [taxTypeDisplayName, setTaxTypeDisplayName] = useStateFromProps("");

  return (
    <Form initial={formInitialData} onSubmit={onSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.productTypes)}
          </AppHeader>
          <PageHeader title={pageTitle} />
          <Grid>
            <div>
              <ProductTypeDetails
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <ProductTypeTaxes
                disabled={disabled}
                data={data}
                taxTypes={taxTypes}
                taxTypeDisplayName={taxTypeDisplayName}
                onChange={event =>
                  handleTaxTypeChange(
                    event,
                    taxTypes,
                    change,
                    setTaxTypeDisplayName
                  )
                }
              />
            </div>
            <div>
              <ProductTypeShipping
                disabled={disabled}
                data={data}
                weightUnit={defaultWeightUnit}
                onChange={change}
              />
            </div>
          </Grid>
          <SaveButtonBar
            onCancel={onBack}
            onSave={submit}
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
          />
        </Container>
      )}
    </Form>
  );
};
ProductTypeCreatePage.displayName = "ProductTypeCreatePage";
export default ProductTypeCreatePage;

import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import { CardSpacer } from "@dastkari/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import { Container } from "@dastkari/components/Container";
import ControlledCheckbox from "@dastkari/components/ControlledCheckbox";
import Form from "@dastkari/components/Form";
import FormSpacer from "@dastkari/components/FormSpacer";
import Grid from "@dastkari/components/Grid";
import Hr from "@dastkari/components/Hr";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import SeoForm from "@dastkari/components/SeoForm";
import VisibilityCard from "@dastkari/components/VisibilityCard";
import useDateLocalize from "@dastkari/hooks/useDateLocalize";
import { sectionNames } from "@dastkari/intl";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import { maybe } from "../../../misc";
import { ListActions, PageListProps } from "../../../types";
import { CollectionDetails_collection } from "../../types/CollectionDetails";
import CollectionDetails from "../CollectionDetails/CollectionDetails";
import { CollectionImage } from "../CollectionImage/CollectionImage";
import CollectionProducts from "../CollectionProducts/CollectionProducts";

export interface CollectionDetailsPageFormData {
  backgroundImageAlt: string;
  description: RawDraftContentState;
  name: string;
  publicationDate: string;
  seoDescription: string;
  seoTitle: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface CollectionDetailsPageProps extends PageListProps, ListActions {
  collection: CollectionDetails_collection;
  errors: ProductErrorFragment[];
  isFeatured: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onCollectionRemove: () => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
  onProductUnassign: (id: string, event: React.MouseEvent<any>) => void;
  onSubmit: (data: CollectionDetailsPageFormData) => void;
}

const CollectionDetailsPage: React.FC<CollectionDetailsPageProps> = ({
  collection,
  disabled,
  errors,
  isFeatured,
  saveButtonBarState,
  onBack,
  onCollectionRemove,
  onImageDelete,
  onImageUpload,
  onSubmit,
  ...collectionProductsProps
}: CollectionDetailsPageProps) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  return (
    <Form
      initial={{
        backgroundImageAlt: maybe(() => collection.backgroundImage.alt, ""),
        description: maybe(() => JSON.parse(collection.descriptionJson)),
        isFeatured,
        isPublished: maybe(() => collection.isPublished, false),
        name: maybe(() => collection.name, ""),
        publicationDate: maybe(() => collection.publicationDate, ""),
        seoDescription: maybe(() => collection.seoDescription, ""),
        seoTitle: maybe(() => collection.seoTitle, "")
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.collections)}
          </AppHeader>
          <PageHeader title={maybe(() => collection.name)} />
          <Grid>
            <div>
              <CollectionDetails
                collection={collection}
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CollectionImage
                data={data}
                image={maybe(() => collection.backgroundImage)}
                onImageDelete={onImageDelete}
                onImageUpload={onImageUpload}
                onChange={change}
              />
              <CardSpacer />
              <CollectionProducts
                disabled={disabled}
                collection={collection}
                {...collectionProductsProps}
              />
              <CardSpacer />
              <SeoForm
                description={data.seoDescription}
                disabled={disabled}
                descriptionPlaceholder=""
                helperText={intl.formatMessage({
                  defaultMessage:
                    "Add search engine title and description to make this collection easier to find"
                })}
                title={data.seoTitle}
                titlePlaceholder={maybe(() => collection.name)}
                onChange={change}
              />
            </div>
            <div>
              <div>
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  hiddenMessage={intl.formatMessage(
                    {
                      defaultMessage: "will be visible from {date}",
                      description: "collection"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                  onChange={change}
                  visibleMessage={intl.formatMessage(
                    {
                      defaultMessage: "since {date}",
                      description: "collection"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                >
                  <FormSpacer />
                  <Hr />
                  <ControlledCheckbox
                    name={"isFeatured" as keyof CollectionDetailsPageFormData}
                    label={intl.formatMessage({
                      defaultMessage: "Feature on Homepage",
                      description: "switch button"
                    })}
                    checked={data.isFeatured}
                    onChange={change}
                    disabled={disabled}
                  />
                </VisibilityCard>
              </div>
            </div>
          </Grid>
          <SaveButtonBar
            state={saveButtonBarState}
            disabled={disabled || !hasChanged}
            onCancel={onBack}
            onDelete={onCollectionRemove}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
CollectionDetailsPage.displayName = "CollectionDetailsPage";
export default CollectionDetailsPage;

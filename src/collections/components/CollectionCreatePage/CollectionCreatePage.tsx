import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ContentState, convertToRaw, RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import { CardSpacer } from "@dastkari/components/CardSpacer";
import CardTitle from "@dastkari/components/CardTitle";
import { ConfirmButtonTransitionState } from "@dastkari/components/ConfirmButton";
import { Container } from "@dastkari/components/Container";
import Form from "@dastkari/components/Form";
import Grid from "@dastkari/components/Grid";
import PageHeader from "@dastkari/components/PageHeader";
import SaveButtonBar from "@dastkari/components/SaveButtonBar";
import SeoForm from "@dastkari/components/SeoForm";
import VisibilityCard from "@dastkari/components/VisibilityCard";
import useDateLocalize from "@dastkari/hooks/useDateLocalize";
import { commonMessages, sectionNames } from "@dastkari/intl";
import { ProductErrorFragment } from "@dastkari/attributes/types/ProductErrorFragment";
import CollectionDetails from "../CollectionDetails/CollectionDetails";
import { CollectionImage } from "../CollectionImage/CollectionImage";

export interface CollectionCreatePageFormData {
  backgroundImage: {
    url: string;
    value: string;
  };
  backgroundImageAlt: string;
  description: RawDraftContentState;
  name: string;
  publicationDate: string;
  isPublished: boolean;
  seoDescription: string;
  seoTitle: string;
}

export interface CollectionCreatePageProps {
  disabled: boolean;
  errors: ProductErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: CollectionCreatePageFormData) => void;
}

const initialForm: CollectionCreatePageFormData = {
  backgroundImage: {
    url: null,
    value: null
  },
  backgroundImageAlt: "",
  description: convertToRaw(ContentState.createFromText("")),
  isPublished: false,
  name: "",
  publicationDate: "",
  seoDescription: "",
  seoTitle: ""
};

const CollectionCreatePage: React.FC<CollectionCreatePageProps> = ({
  disabled,
  errors,
  saveButtonBarState,
  onBack,
  onSubmit
}: CollectionCreatePageProps) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.collections)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Add Collection",
              description: "page header"
            })}
          />
          <Grid>
            <div>
              <CollectionDetails
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CollectionImage
                image={
                  data.backgroundImage.url
                    ? {
                        __typename: "Image",
                        alt: data.backgroundImageAlt,
                        url: data.backgroundImage.url
                      }
                    : null
                }
                onImageDelete={() =>
                  change({
                    target: {
                      name: "backgroundImage",
                      value: {
                        url: null,
                        value: null
                      }
                    }
                  } as any)
                }
                onImageUpload={file =>
                  change({
                    target: {
                      name: "backgroundImage",
                      value: {
                        url: URL.createObjectURL(file),
                        value: file
                      }
                    }
                  } as any)
                }
                onChange={change}
                data={data}
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
                titlePlaceholder={data.name}
                onChange={change}
              />
            </div>
            <div>
              <div>
                <Card>
                  <CardTitle
                    title={intl.formatMessage(commonMessages.availability)}
                  />
                  <CardContent>
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
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Grid>
          <SaveButtonBar
            state={saveButtonBarState}
            disabled={disabled || !hasChanged}
            onCancel={onBack}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
CollectionCreatePage.displayName = "CollectionCreatePage";
export default CollectionCreatePage;

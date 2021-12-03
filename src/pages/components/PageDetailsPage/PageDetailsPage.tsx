import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState
} from "draft-js";
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
import SeoForm from "@dastkari/components/SeoForm";
import VisibilityCard from "@dastkari/components/VisibilityCard";
import useDateLocalize from "@dastkari/hooks/useDateLocalize";
import { sectionNames } from "@dastkari/intl";
import { PageErrorFragment } from "@dastkari/pages/types/PageErrorFragment";
import { maybe } from "../../../misc";
import { PageDetails_page } from "../../types/PageDetails";
import PageInfo from "../PageInfo";
import PageSlug from "../PageSlug";

export interface FormData {
  content: RawDraftContentState;
  isPublished: boolean;
  publicationDate: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  title: string;
}

export interface PageDetailsPageProps {
  disabled: boolean;
  errors: PageErrorFragment[];
  page: PageDetails_page;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onRemove: () => void;
  onSubmit: (data: FormData) => void;
}

const PageDetailsPage: React.FC<PageDetailsPageProps> = ({
  disabled,
  errors,
  page,
  saveButtonBarState,
  onBack,
  onRemove,
  onSubmit
}) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  const initialForm: FormData = {
    content: maybe(
      () => JSON.parse(page.contentJson),
      convertToRaw(ContentState.createFromText(""))
    ),
    isPublished: maybe(() => page.isPublished, false),
    publicationDate: maybe(() => page.publicationDate, ""),
    seoDescription: maybe(() => page.seoDescription || "", ""),
    seoTitle: maybe(() => page.seoTitle || "", ""),
    slug: maybe(() => page.slug, ""),
    title: maybe(() => page.title, "")
  };
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.pages)}
          </AppHeader>
          <PageHeader
            title={
              page === null
                ? intl.formatMessage({
                    defaultMessage: "Create Page",
                    description: "page header"
                  })
                : maybe(() => page.title)
            }
          />
          <Grid>
            <div>
              <PageInfo
                data={data}
                disabled={disabled}
                errors={errors}
                page={page}
                onChange={change}
              />
              <CardSpacer />
              <SeoForm
                description={data.seoDescription}
                disabled={disabled}
                descriptionPlaceholder={maybe(
                  () =>
                    convertFromRaw(data.content)
                      .getPlainText()
                      .slice(0, 300),
                  ""
                )}
                onChange={change}
                title={data.seoTitle}
                titlePlaceholder={data.title}
                helperText={intl.formatMessage({
                  defaultMessage:
                    "Add search engine title and description to make this page easier to find"
                })}
              />
            </div>
            <div>
              <PageSlug
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <VisibilityCard
                data={data}
                errors={errors}
                disabled={disabled}
                hiddenMessage={intl.formatMessage(
                  {
                    defaultMessage: "will be visible from {date}",
                    description: "page"
                  },
                  {
                    date: localizeDate(data.publicationDate)
                  }
                )}
                onChange={change}
                visibleMessage={intl.formatMessage(
                  {
                    defaultMessage: "since {date}",
                    description: "page"
                  },
                  {
                    date: localizeDate(data.publicationDate)
                  }
                )}
              />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onDelete={page === null ? undefined : onRemove}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
PageDetailsPage.displayName = "PageDetailsPage";
export default PageDetailsPage;

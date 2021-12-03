import Button from "@material-ui/core/Button";

import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import Container from "@dastkari/components/Container";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import { ListActions, PageListProps, SortPage } from "@dastkari/types";
import { PageListUrlSortField } from "@dastkari/pages/urls";
import { PageList_pages_edges_node } from "../../types/PageList";
import PageList from "../PageList";

export interface PageListPageProps
  extends PageListProps,
    ListActions,
    SortPage<PageListUrlSortField> {
  pages: PageList_pages_edges_node[];
  onBack: () => void;
}

const PageListPage: React.FC<PageListPageProps> = ({
  onAdd,
  onBack,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.pages)}>
        <Button onClick={onAdd} variant="contained" color="primary">
          <FormattedMessage defaultMessage="Create page" description="button" />
        </Button>
      </PageHeader>
      <PageList {...listProps} />
    </Container>
  );
};
PageListPage.displayName = "PageListPage";
export default PageListPage;

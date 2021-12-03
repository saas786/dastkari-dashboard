import Button from "@material-ui/core/Button";

import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@dastkari/components/AppHeader";
import Container from "@dastkari/components/Container";
import PageHeader from "@dastkari/components/PageHeader";
import { sectionNames } from "@dastkari/intl";
import { ListActions, PageListProps, SortPage } from "@dastkari/types";
import { MenuListUrlSortField } from "@dastkari/navigation/urls";
import { MenuList_menus_edges_node } from "../../types/MenuList";
import MenuList from "../MenuList";

export interface MenuListPageProps
  extends PageListProps,
    ListActions,
    SortPage<MenuListUrlSortField> {
  menus: MenuList_menus_edges_node[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

const MenuListPage: React.FC<MenuListPageProps> = ({
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
      <PageHeader title={intl.formatMessage(sectionNames.navigation)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create Menu"
            description="button"
            id="menuListPageAddMenu"
          />
        </Button>
      </PageHeader>
      <MenuList {...listProps} />
    </Container>
  );
};
MenuListPage.displayName = "MenuListPage";
export default MenuListPage;

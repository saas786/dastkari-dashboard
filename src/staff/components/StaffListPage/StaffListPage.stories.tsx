import { storiesOf } from "@storybook/react";
import React from "react";

import { StaffListUrlSortField } from "@dastkari/staff/urls";
import { StaffMemberStatus } from "@dastkari/types/globalTypes";
import {
  pageListProps,
  searchPageProps,
  tabPageProps,
  sortPageProps,
  filterPageProps
} from "@dastkari/fixtures";
import { staffMembers } from "@dastkari/staff/fixtures";
import Decorator from "@dastkari/storybook/Decorator";
import StaffListPage, { StaffListPageProps } from ".";

const props: StaffListPageProps = {
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  ...filterPageProps,
  filterOpts: {
    status: {
      active: false,
      value: StaffMemberStatus.ACTIVE
    }
  },
  onAdd: undefined,
  onBack: () => undefined,
  sort: {
    ...sortPageProps.sort,
    sort: StaffListUrlSortField.name
  },
  staffMembers
};

storiesOf("Views / Staff / Staff members", module)
  .addDecorator(Decorator)
  .add("default", () => <StaffListPage {...props} />)
  .add("when loading", () => (
    <StaffListPage {...props} disabled={true} staffMembers={undefined} />
  ));

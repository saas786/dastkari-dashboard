import { storiesOf } from "@storybook/react";
import React from "react";
import { useIntl } from "react-intl";

import { User } from "@dastkari/auth/types/User";
import { createConfigurationMenu } from "@dastkari/configuration";
import ConfigurationPage from "@dastkari/configuration/ConfigurationPage";
import { staffMember } from "@dastkari/staff/fixtures";
import Decorator from "@dastkari/storybook/Decorator";

const user = {
  __typename: staffMember.__typename,
  avatar: {
    __typename: staffMember.avatar.__typename,
    url: staffMember.avatar.url
  },
  email: staffMember.email,
  firstName: "Adam Evan",
  id: staffMember.id,
  isStaff: true,
  lastName: "Newton",
  note: null,
  userPermissions: staffMember.userPermissions
};

const Story: React.FC<{ user: User }> = ({ user }) => {
  const intl = useIntl();

  return (
    <ConfigurationPage
      menu={createConfigurationMenu(intl)}
      onSectionClick={() => undefined}
      user={user}
    />
  );
};

storiesOf("Views / Configuration", module)
  .addDecorator(Decorator)
  .add("default", () => <Story user={user} />)
  .add("partial access", () => (
    <Story
      user={{
        ...user,
        userPermissions: user.userPermissions.slice(2, 6)
      }}
    />
  ));

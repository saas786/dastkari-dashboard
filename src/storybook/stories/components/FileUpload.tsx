import { storiesOf } from "@storybook/react";
import React from "react";

import FileUpload from "@dastkari/components/FileUpload";
import Decorator from "../../Decorator";

storiesOf("Components / FileUpload", module)
  .addDecorator(Decorator)
  .add("default", () => <FileUpload />)
  .add("other", () => <FileUpload />);

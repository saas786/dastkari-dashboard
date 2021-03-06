import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { storiesOf } from "@storybook/react";
import React from "react";

import EditableTableCell from "@dastkari/components/EditableTableCell";
import ResponsiveTable from "@dastkari/components/ResponsiveTable";
import CardDecorator from "../../CardDecorator";
import Decorator from "../../Decorator";

storiesOf("Generics / EditableTableCell", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => (
    <ResponsiveTable>
      <TableHead>
        <TableCell>Some header</TableCell>
        <TableCell>Some header</TableCell>
        <TableCell>Some header</TableCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Some value</TableCell>
          <EditableTableCell
            value={"Some editable text"}
            onConfirm={() => undefined}
          />
          <TableCell>Some value</TableCell>
        </TableRow>
      </TableBody>
    </ResponsiveTable>
  ));

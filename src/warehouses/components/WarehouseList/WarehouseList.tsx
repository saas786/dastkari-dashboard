import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import React from "react";
import { FormattedMessage } from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import ResponsiveTable from "@dastkari/components/ResponsiveTable";
import Skeleton from "@dastkari/components/Skeleton";
import TablePagination from "@dastkari/components/TablePagination";
import { maybe, renderCollection, stopPropagation } from "@dastkari/misc";
import { ListProps, SortPage } from "@dastkari/types";
import { WarehouseListUrlSortField } from "@dastkari/warehouses/urls";
import TableCellHeader from "@dastkari/components/TableCellHeader";
import { getArrowDirection } from "@dastkari/utils/sort";
import { WarehouseWithShippingFragment } from "@dastkari/warehouses/types/WarehouseWithShippingFragment";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colActions: {
        width: 160
      },
      colName: {
        width: 400
      },
      colZones: {
        width: "auto"
      }
    },
    actions: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      position: "relative",
      right: -theme.spacing(2)
    },
    colActions: {
      textAlign: "right"
    },
    colName: {
      paddingLeft: 0
    },
    colZones: {
      paddingLeft: 0
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "WarehouseList" }
);

interface WarehouseListProps
  extends ListProps,
    SortPage<WarehouseListUrlSortField> {
  warehouses: WarehouseWithShippingFragment[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const numberOfColumns = 3;

const WarehouseList: React.FC<WarehouseListProps> = props => {
  const {
    warehouses,
    disabled,
    settings,
    sort,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRemove,
    onRowClick,
    onSort
  } = props;

  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === WarehouseListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            className={classes.colName}
            onClick={() => onSort(WarehouseListUrlSortField.name)}
          >
            <FormattedMessage defaultMessage="Name" description="warehouse" />
          </TableCellHeader>
          <TableCell className={classes.colZones}>
            <FormattedMessage defaultMessage="Shipping Zones" />
          </TableCell>
          <TableCell className={classes.colActions}>
            <FormattedMessage defaultMessage="Actions" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          warehouses,
          warehouse => (
            <TableRow
              className={classes.tableRow}
              hover={!!warehouse}
              onClick={warehouse ? onRowClick(warehouse.id) : undefined}
              key={warehouse ? warehouse.id : "skeleton"}
              data-tc="id"
              data-tc-id={maybe(() => warehouse.id)}
            >
              <TableCell className={classes.colName} data-tc="name">
                {maybe<React.ReactNode>(() => warehouse.name, <Skeleton />)}
              </TableCell>
              <TableCell className={classes.colZones} data-tc="zones">
                {maybe<React.ReactNode>(
                  () =>
                    warehouse.shippingZones.edges
                      .map(edge => edge.node.name)
                      .join(", "),
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colActions}>
                <div className={classes.actions}>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={stopPropagation(() => onRemove(warehouse.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No warehouses found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

WarehouseList.displayName = "WarehouseList";
export default WarehouseList;

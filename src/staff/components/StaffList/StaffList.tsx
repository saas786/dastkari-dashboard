import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ResponsiveTable from "@dastkari/components/ResponsiveTable";
import Skeleton from "@dastkari/components/Skeleton";
import TablePagination from "@dastkari/components/TablePagination";
import {
  getUserInitials,
  getUserName,
  maybe,
  renderCollection
} from "@dastkari/misc";
import { ListProps, SortPage } from "@dastkari/types";
import { StaffListUrlSortField } from "@dastkari/staff/urls";
import TableCellHeader from "@dastkari/components/TableCellHeader";
import { getArrowDirection } from "@dastkari/utils/sort";
import { StaffList_staffUsers_edges_node } from "../../types/StaffList";

const useStyles = makeStyles(
  theme => ({
    avatar: {
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      float: "left",
      height: 47,
      justifyContent: "center",
      marginRight: theme.spacing(1),
      overflow: "hidden",
      width: 47
    },
    avatarDefault: {
      "& p": {
        color: "#fff",
        lineHeight: "47px"
      },
      background: theme.palette.primary.main,
      height: 47,
      textAlign: "center",
      width: 47
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    statusText: {
      color: "#9E9D9D"
    },
    tableRow: {
      cursor: "pointer"
    },
    wideColumn: {
      width: "80%"
    }
  }),
  { name: "StaffList" }
);

interface StaffListProps extends ListProps, SortPage<StaffListUrlSortField> {
  staffMembers: StaffList_staffUsers_edges_node[];
}

const StaffList: React.FC<StaffListProps> = props => {
  const {
    settings,
    disabled,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    pageInfo,
    sort,
    staffMembers
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(StaffListUrlSortField.name)}
            className={classes.wideColumn}
          >
            <FormattedMessage
              defaultMessage="Name"
              description="staff member full name"
            />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlSortField.email
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(StaffListUrlSortField.email)}
          >
            <FormattedMessage defaultMessage="Email Address" />
          </TableCellHeader>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={3}
            settings={settings}
            hasNextPage={
              pageInfo && !disabled ? pageInfo.hasNextPage : undefined
            }
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : undefined
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          staffMembers,
          staffMember => (
            <TableRow
              className={classNames({
                [classes.tableRow]: !!staffMember
              })}
              hover={!!staffMember}
              onClick={!!staffMember ? onRowClick(staffMember.id) : undefined}
              key={staffMember ? staffMember.id : "skeleton"}
            >
              <TableCell>
                <div className={classes.avatar}>
                  {maybe(() => staffMember.avatar.url) ? (
                    <img
                      className={classes.avatarImage}
                      src={maybe(() => staffMember.avatar.url)}
                    />
                  ) : (
                    <div className={classes.avatarDefault}>
                      <Typography>{getUserInitials(staffMember)}</Typography>
                    </div>
                  )}
                </div>
                <Typography>
                  {getUserName(staffMember) || <Skeleton />}
                </Typography>
                <Typography variant={"caption"} className={classes.statusText}>
                  {maybe<React.ReactNode>(
                    () =>
                      staffMember.isActive
                        ? intl.formatMessage({
                            defaultMessage: "Active",
                            description: "staff member status"
                          })
                        : intl.formatMessage({
                            defaultMessage: "Inactive",
                            description: "staff member status"
                          }),
                    <Skeleton />
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                {maybe<React.ReactNode>(() => staffMember.email, <Skeleton />)}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={3}>
                <FormattedMessage defaultMessage="No staff members found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
StaffList.displayName = "StaffList";
export default StaffList;

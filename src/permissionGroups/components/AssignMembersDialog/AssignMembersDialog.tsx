import { FormattedMessage, useIntl } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import classNames from "classnames";

import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@dastkari/components/ConfirmButton";
import { buttonMessages } from "@dastkari/intl";
import { makeStyles } from "@material-ui/core/styles";
import { getUserName, getUserInitials } from "@dastkari/misc";
import { DialogProps, FetchMoreProps, SearchPageProps } from "@dastkari/types";
import useElementScroll from "@dastkari/hooks/useElementScroll";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import ResponsiveTable from "@dastkari/components/ResponsiveTable";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import useSearchQuery from "@dastkari/hooks/useSearchQuery";
import { SearchStaffMembers_search_edges_node } from "@dastkari/searches/types/SearchStaffMembers";
import { Checkbox, Typography } from "@material-ui/core";
import Skeleton from "@dastkari/components/Skeleton";
import CardSpacer from "@dastkari/components/CardSpacer";

const useStyles = makeStyles(
  theme => ({
    avatar: {
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      float: "left",
      height: 32,
      justifyContent: "center",
      overflow: "hidden",
      width: 32
    },
    avatarCell: {
      padding: 0,
      width: 32
    },
    avatarDefault: {
      "& p": {
        color: "#fff",
        lineHeight: "47px"
      },
      background: theme.palette.primary.main,
      height: 32,
      textAlign: "center",
      width: 32
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    checkboxCell: {
      "&&:not(first-child)": {
        paddingLeft: 0,
        paddingRight: 0,
        width: 48
      }
    },
    colActions: {
      textAlign: "right"
    },
    colName: {
      paddingLeft: theme.spacing()
    },

    dropShadow: {
      boxShadow: `0px -5px 10px 0px ${theme.palette.divider}`
    },
    inputContainer: {
      overflowY: "visible"
    },
    loadMoreLoaderContainer: {
      alignItems: "center",
      display: "flex",
      gridColumnEnd: "span 3",
      height: theme.spacing(4),
      justifyContent: "center"
    },
    overflow: {
      overflowY: "visible"
    },
    scrollArea: {
      maxHeight: 400,
      overflowY: "scroll",
      paddingTop: 0
    },
    statusText: {
      color: "#9E9D9D"
    },
    wideCell: {
      width: "80%"
    }
  }),
  { name: "AssignStaffMembersDialog" }
);

export interface AssignMembersDialogProps
  extends DialogProps,
    FetchMoreProps,
    SearchPageProps {
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  staffMembers: SearchStaffMembers_search_edges_node[];
  hasMore: boolean;
  onFetchMore: () => void;
  onSubmit: (data: SearchStaffMembers_search_edges_node[]) => void;
}

function handleStaffMemberAssign(
  member: SearchStaffMembers_search_edges_node,
  isSelected: boolean,
  selectedMembers: SearchStaffMembers_search_edges_node[],
  setSelectedMembers: (data: SearchStaffMembers_search_edges_node[]) => void
) {
  if (isSelected) {
    setSelectedMembers(
      selectedMembers.filter(selectedMember => selectedMember.id !== member.id)
    );
  } else {
    setSelectedMembers([...selectedMembers, member]);
  }
}

const AssignMembersDialog: React.FC<AssignMembersDialogProps> = ({
  confirmButtonState,
  disabled,
  loading,
  onClose,
  onFetchMore,
  hasMore,
  onSearchChange,
  onSubmit,
  open,
  staffMembers
}) => {
  const intl = useIntl();
  const classes = useStyles({});
  const [query, onQueryChange] = useSearchQuery(onSearchChange);

  const [selectedMembers, setSelectedMembers] = React.useState<
    SearchStaffMembers_search_edges_node[]
  >([]);

  const anchor = React.useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);
  const dropShadow =
    anchor.current && scrollPosition
      ? scrollPosition.y + anchor.current.clientHeight <
        anchor.current.scrollHeight
      : false;

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Assign Staff Members"
          description="dialog header"
        />
      </DialogTitle>
      <DialogContent className={classes.inputContainer}>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={intl.formatMessage({
            defaultMessage: "Search Staff Members"
          })}
          placeholder={intl.formatMessage({
            defaultMessage: "Search by name, email, etc..."
          })}
          fullWidth
          InputProps={{
            autoComplete: "off",
            endAdornment: loading && <CircularProgress size={16} />
          }}
          disabled={disabled}
        />
      </DialogContent>
      <DialogContent className={classes.scrollArea}>
        <InfiniteScroll
          pageStart={0}
          loadMore={onFetchMore}
          hasMore={hasMore}
          useWindow={false}
          threshold={100}
          key="infinite-scroll"
        >
          <ResponsiveTable>
            <TableBody>
              {staffMembers &&
                staffMembers.map(member => {
                  const isSelected = selectedMembers.some(
                    selectedMember => selectedMember.id === member.id
                  );

                  return (
                    <TableRow key={member.id}>
                      <TableCell
                        padding="checkbox"
                        className={classes.checkboxCell}
                      >
                        <Checkbox
                          color="primary"
                          checked={isSelected}
                          onChange={() =>
                            handleStaffMemberAssign(
                              member,
                              isSelected,
                              selectedMembers,
                              setSelectedMembers
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.avatarCell}>
                        <div className={classes.avatar}>
                          {!!member?.avatar?.url ? (
                            <img
                              className={classes.avatarImage}
                              src={member.avatar.url}
                            />
                          ) : (
                            <div className={classes.avatarDefault}>
                              <Typography>{getUserInitials(member)}</Typography>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={classes.colName}>
                        <Typography>
                          {getUserName(member) || <Skeleton />}
                        </Typography>
                        <Typography
                          variant={"caption"}
                          className={classes.statusText}
                        >
                          {!!member ? (
                            member.isActive ? (
                              intl.formatMessage({
                                defaultMessage: "Active",
                                description: "staff member status"
                              })
                            ) : (
                              intl.formatMessage({
                                defaultMessage: "Inactive",
                                description: "staff member status"
                              })
                            )
                          ) : (
                            <Skeleton />
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </ResponsiveTable>
          {loading && (
            <>
              {staffMembers?.length > 0 && <CardSpacer />}
              <div className={classes.loadMoreLoaderContainer}>
                <CircularProgress size={24} />
              </div>
            </>
          )}
        </InfiniteScroll>
      </DialogContent>
      <DialogActions
        className={classNames({
          [classes.dropShadow]: dropShadow
        })}
      >
        <Button onClick={onClose}>
          <FormattedMessage {...buttonMessages.back} />
        </Button>
        <ConfirmButton
          color="primary"
          variant="contained"
          type="submit"
          transitionState={confirmButtonState}
          onClick={() => {
            onSubmit(selectedMembers);
          }}
        >
          <FormattedMessage defaultMessage="Assign" description="button" />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignMembersDialog.displayName = "AssignMembersDialog";
export default AssignMembersDialog;

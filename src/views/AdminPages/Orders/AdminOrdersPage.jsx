import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import AdminNav from "components/Admin/AdminNav.jsx";
import AdminOrdersTable from "./AdminOrdersTable.jsx";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function AdminPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AdminNav title="Orders" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AdminOrdersTable />
      </main>
    </div>
  );
}

AdminPage.propTypes = {
  container: PropTypes.any
};

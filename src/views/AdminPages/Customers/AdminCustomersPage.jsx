import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import AdminNav from "components/Admin/AdminNav.jsx";
import AdminCustomersTable from "./AdminCustomersTable.jsx";

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

export default function AdminCustomersPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AdminNav title="Customers" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AdminCustomersTable />
      </main>
    </div>
  );
}

AdminCustomersPage.propTypes = {
  container: PropTypes.any
};

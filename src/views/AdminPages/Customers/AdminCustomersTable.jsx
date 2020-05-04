import React from "react";
import MaterialTable from "material-table";

import Grid from "@material-ui/core/Grid";
import CustomerDetails from "./CustomerDetails.jsx";

export default function AdminCustomersTable() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "User",
        field: "name",
        width: 50,
        cellStyle: {
          maxWidth: 80
        },
        headerStyle: {
          maxWidth: 80
        },
        sorting: false
      },
      {
        title: "Email",
        field: "email"
      }
    ],
    data: []
  });

  const fetchOrders = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(data =>
        setState(prevState => ({
          ...prevState,
          data
        }))
      )
      .catch(err => console.log(err));

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetchOrders();
  }, []); //Probably not a good approach.

  return (
    <MaterialTable
      title="Customers"
      columns={state.columns}
      data={state.data}
      detailPanel={rowData => {
        return (
          <Grid container justify="center">
            <Grid item md={10} sm={10}>
              <CustomerDetails order={rowData}></CustomerDetails>
            </Grid>
          </Grid>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
}

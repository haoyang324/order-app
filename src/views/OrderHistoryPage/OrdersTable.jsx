import React from "react";
import MaterialTable from "material-table";

import Grid from "@material-ui/core/Grid";
import OrderDetails from "./OrderDetails.jsx";

export default function AdminOrdersTable() {
  const options = { month: "long", day: "numeric", year: "numeric" };

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Status",
        field: "status",
        sorting: false
      },
      {
        title: "Date",
        width: 160,
        render: rowData =>
          new Date(rowData.date).toLocaleString("en-US", options)
      },
      {
        title: "Value",
        field: "value.$numberDecimal",
        width: 100
      }
    ],
    data: []
  });

  const fetchOrders = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/orders", {
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
      title="Orders"
      columns={state.columns}
      data={state.data}
      detailPanel={rowData => {
        return (
          <Grid container justify="center">
            <Grid item md={10} sm={10}>
              <OrderDetails order={rowData}></OrderDetails>
            </Grid>
          </Grid>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
}

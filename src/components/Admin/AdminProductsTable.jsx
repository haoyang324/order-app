import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

export default function AdminOrdersTable() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Thumb",
        // field: "imgURL",
        // eslint-disable-next-line react/display-name
        render: rowData => (
          <img
            alt={rowData.title}
            style={{ height: 36, borderRadius: "50%" }}
            src={rowData.imgURL}
          />
        ),
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
        title: "Product Name",
        field: "title"
      },
      {
        title: "Price",
        field: "pricing.$numberDecimal",
        width: 50,
        cellStyle: {
          maxWidth: 80
        },
        headerStyle: {
          maxWidth: 80
        },
        searchable: false
      },
      {
        title: "Edit",
        width: 50,
        // field: "imgURL",
        // eslint-disable-next-line react/display-name
        render: rowData => (
          <EditIcon
            onClick={() => (window.location.href += "/edit/" + rowData._id)}
          />
        )
      }
    ],
    data: []
  });

  const fetchProducts = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/product/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
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
    fetchProducts();
  }, []); //Probably not a good approach.

  return (
    <MaterialTable
      title={
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => (window.location.href += "/add")}
        >
          Add Product
        </Button>
        // <AddIcon onClick={() => (window.location.href = "/products/add")} />
      }
      columns={state.columns}
      data={state.data}
      options={{ pageSize: 10 }}
    />
  );
}

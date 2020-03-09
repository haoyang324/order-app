import React from "react";
import MaterialTable from "material-table";

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
      title="Products List"
      columns={state.columns}
      data={state.data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       setState(prevState => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
      options={{ pageSize: 10 }}
    />
  );
}

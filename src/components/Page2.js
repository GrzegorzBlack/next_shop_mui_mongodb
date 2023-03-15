import { useState } from "react";
import { useCartValue } from "../contexts/CartValueProvider";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ProductDialog from "../components/Modals/ProductDialog";
import handleData from "../utility/handleDataApi";

const Page = ({ productsState }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const { dispatch } = useCartValue();

  const handleCellCLick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowCLick = (param, event) => {
    event.stopPropagation();
  };

  const handleClick = async (event, cellValues) => {
    setShowModal(true);

    const price = Number(cellValues.row.col2.slice(0, -3));
    const body = {
      name: cellValues.row.col1,
      price: price,
      quantity: 1,
    };

    handleData("POST", body, "cart");
    dispatch({ price, type: "ADD_VALUE" });
    setName(cellValues.row.col1);
  };

  const columns = [
    { field: "col1", headerName: "Product name", width: 160 },
    { field: "col2", headerName: "Product price", type: "number", width: 160 },
    {
      field: "col3",
      headerName: "Click to Buy",
      width: 150,
      type: "number",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Buy
          </Button>
        );
      },
    },
  ];

  const rowz = productsState.map((product) => ({
    id: `${product.id}`,
    col1: `${product.name}`,
    col2: `${product.price} zł`,
  }));

  return (
    <div style={{ height: "600px", width: "550px", marginLeft: "100px" }}>
      <DataGrid
        rows={rowz}
        columns={columns}
        onCellClick={handleCellCLick}
        onRowClick={handleRowCLick}
      />

      {showModal ? (
        <ProductDialog
          onClose={() => setShowModal(false)}
          show={showModal}
          productName={name}
        />
      ) : null}
    </div>
  );
};

export default Page;

import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginDialog from "../components/Modals/LoginUserDialog/LoginUserDialog";
import { getCartProducts } from "@/lib/prisma/cart";
import { useCartValue } from "../contexts/CartValueProvider";
import handleData from "../utility/handleDataApi";
import {
  CartPageBox,
  BoxWrapper,
  DataGridWrapper,
  StyledBox,
} from "../styles/pagesStyles/cartStyles";

const Cart = ({ cartProducts }) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(cartProducts);

  const { dispatch } = useCartValue();

  const allProducts = Object.entries(cart);

  const totalValue = allProducts.reduce(
    (prev, next) => prev + next[1].price * next[1].quantity,
    0
  );

  function finalModal() {
    if (Object.keys(cart).length === 0) {
      return alert("Your cart is empty!");
    }

    const deleteCart = async () => {
      const response = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    };
    deleteCart();
    setOpen(true);
    const totalCartValue = 0;
    dispatch({ totalCartValue, type: "CHANGE_VALUE" });
  }

  const handleButton = async (event, cellValues, expr) => {
    const quantity = Number(cellValues.row.col3);

    const body = {
      id: cellValues.row.id,
      quantity: expr === "PLUS" ? quantity + 1 : quantity - 1,
    };

    handleData("PATCH", body, "cart").then((data) => {
      const newCart = cart.map((cartData) => {
        if (cartData.id === data.cartProduct.id) {
          return data.cartProduct;
        }
        return cartData;
      });
      setCart(newCart);
      dispatch({
        price: data.cartProduct.price,
        type: expr === "PLUS" ? "ADD_VALUE" : "MINUS_VALUE",
      });
    });
  };

  const handleDelete = async (event, cellValues) => {
    const productId = cellValues.id;

    const body = {
      id: productId,
    };

    handleData("DELETE", body, "cart").then((data) => {
      const newCart = cart.filter((cartData) => {
        return cartData.id !== data.cartProduct.id;
      });
      const price = data.cartProduct.price * data.cartProduct.quantity;
      setCart(newCart);
      dispatch({ price, type: "MINUS_VALUE" });
    });
  };

  const columns = [
    { field: "col1", headerName: "Product name", width: 160 },

    { field: "col2", headerName: "Product price", type: "number", width: 160 },
    { field: "col3", headerName: "Quantity", type: "number", width: 160 },
    {
      field: "col4",
      headerName: "Actions",
      headerAlign: "center",
      width: 260,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleButton(event, cellValues, "PLUS");
              }}
            >
              +
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleButton(event, cellValues, "MINUS");
              }}
            >
              -
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={(event) => {
                handleDelete(event, cellValues);
              }}
              style={{ fontSize: "10px" }}
            >
              <div>Delete product</div>
            </Button>
          </>
        );
      },
    },
    { field: "col5", headerName: "Total price", type: "number", width: 160 },
  ];

  const rows = allProducts.map((product) => ({
    id: `${product[1].id}`,
    col1: `${product[1].name}`,
    // col2: `${product[1].category}`,
    col2: `${product[1].price} zł`,
    col3: `${product[1].quantity}`,
    col5: `${product[1].quantity * product[1].price} zł`,
  }));

  return (
    <CartPageBox>
      <BoxWrapper>
        <DataGridWrapper>
          <DataGrid rows={rows} columns={columns} />
        </DataGridWrapper>
        <StyledBox>
          <Box>
            <Typography>Total Cart Value</Typography>
            <Typography>{totalValue} PLN</Typography>
          </Box>
        </StyledBox>
        <Box sx={{ marginTop: "20px" }}>
          <StyledBox>
            <Button variant="outlined" onClick={finalModal}>
              Złóż zamówienie
            </Button>
          </StyledBox>
        </Box>
      </BoxWrapper>
      <LoginDialog
        onClose={() => setOpen(false)}
        show={open}
        dialogTextOne={"Dziękujemy za złożenie zamówienia w naszym sklepie!"}
        dialogTextTwo={"Czas oczekiwania na przesyłkę wynosi: Nie wiadomo. "}
        dialogTextThree={"Zapraszamy na kolejne zakupy!"}
        pushTo={"snacks"}
      />
    </CartPageBox>
  );
};

export default Cart;

export async function getServerSideProps() {
  const { cartProducts } = await getCartProducts();

  return { props: { cartProducts } };
}

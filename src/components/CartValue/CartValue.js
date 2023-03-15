import { PriceBox } from "./CartValueStyles";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useCartValue } from "../../contexts/CartValueProvider";

function CartValue() {
  const { dispatch } = useCartValue();
  const cartValueState = useCartValue().state;

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        const { cartProducts } = data;
        const totalCartValue = cartProducts.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        );
        dispatch({ totalCartValue, type: "CHANGE_VALUE" });
      });
  }, []);

  if (cartValueState) {
    return (
      <>
        <PriceBox>
          <Typography
            sx={{ borderColor: "black" }}
          >{`${cartValueState} PLN`}</Typography>
        </PriceBox>
      </>
    );
  }
}

export default CartValue;

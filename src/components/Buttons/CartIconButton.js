import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";

const CartButton = ({ to }) => {
  const { pathname } = useRouter();
  return (
    <IconButton
      disabled={
        pathname === "/" || pathname === "/login" || pathname === "/register"
          ? true
          : false
      }
    >
      <Link href={to}>
        <ShoppingCartIcon sx={{ fontSize: 48 }} />
      </Link>
    </IconButton>
  );
};
export default CartButton;

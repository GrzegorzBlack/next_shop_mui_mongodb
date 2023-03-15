import CartProvider from "../contexts/CartProvider";
import ProductsProvider from "../contexts/ProductsProvider";
import AdminProvider from "../contexts/AdminProvider";
import UserProvider from "../contexts/UserProvider";
import CartValueProvider from "../contexts/CartValueProvider";

const Providers = (props) => {
  return (
    <AdminProvider>
      <UserProvider>
        {/* <CartProvider> */}
        <CartValueProvider>{props.children}</CartValueProvider>
        {/* </CartProvider> */}
      </UserProvider>
    </AdminProvider>
  );
};

export default Providers;

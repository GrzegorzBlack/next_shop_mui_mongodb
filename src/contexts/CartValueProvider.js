import { useReducer, createContext, useContext } from "react";

const CartValueContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return action.totalCartValue;
    case "ADD_VALUE":
      return state + action.price;
    case "MINUS_VALUE":
      return state - action.price;
    default:
      throw new Error("Something went wrong with cart value!");
  }
};

const CartValueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, 0);

  return (
    <CartValueContext.Provider value={{ state, dispatch }}>
      {children}
    </CartValueContext.Provider>
  );
};

export default CartValueProvider;

export const useCartValue = () => useContext(CartValueContext);

// import { useReducer, createContext, useContext } from "react";

// const cart = {};

// const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_PRODUCT": {
//       const key = action.id + action.category;
//       console.log(key);
//       if (state[key]) {
//         return {
//           ...state,
//           [key]: {
//             ...state[key],
//             quantity: state[key].quantity + 1,
//           },
//         };
//       }
//       return {
//         ...state,
//         [key]: {
//           id: action.id,
//           category: action.category,
//           name: action.name,
//           price: action.price,
//           quantity: 1,
//         },
//       };
//     }
//     case "ADD_QUANTITY": {
//       const key = action.product;
//       console.log(key);
//       if (state[key]) {
//         return {
//           ...state,
//           [key]: {
//             ...state[key],
//             quantity: state[key].quantity + 1,
//           },
//         };
//       }
//       return state;
//     }
//     case "SUBSTRACT_QUANTITY": {
//       const key = action.product;
//       console.log(key);
//       if (state[key]) {
//         if (state[key].quantity > 0) {
//           return {
//             ...state,
//             [key]: {
//               ...state[key],
//               quantity: state[key].quantity - 1,
//             },
//           };
//         }
//         return state;
//       }
//       return state;
//     }
//     case "DELETE_PRODUCT": {
//       const key = action.product;
//       const filteredByKey = Object.fromEntries(
//         Object.entries(state).filter(([name]) => name !== key)
//       );
//       return {
//         ...filteredByKey,
//       };
//     }
//     case "DELETE_CART": {
//       return {};
//     }
//     default:
//       throw new Error("Something went wrong!");
//   }
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, cart);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;

// export const useCart = () => useContext(CartContext);

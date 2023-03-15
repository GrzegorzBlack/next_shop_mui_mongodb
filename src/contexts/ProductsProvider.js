// import { useReducer, createContext, useContext } from "react";

// const products = [
//   {
//     id: 1,
//     category: "Drinks",
//     name: "Coca-Cola",
//     price: 3,
//   },
//   {
//     id: 2,
//     category: "Drinks",
//     name: "Pepsi",
//     price: 3,
//   },
//   {
//     id: 3,
//     category: "Drinks",
//     name: "Oranżada Czerwona",
//     price: 4,
//   },
//   {
//     id: 4,
//     category: "Snacks",
//     name: "Orzeszki solone",
//     price: 8,
//   },
//   {
//     id: 5,
//     category: "Snacks",
//     name: "Batonik Mars",
//     price: 3,
//   },
//   {
//     id: 6,
//     category: "Snacks",
//     name: "Paluszki słone",
//     price: 5,
//   },
//   {
//     id: 7,
//     category: "Spirits",
//     name: "Giness",
//     price: 10,
//   },
//   {
//     id: 8,
//     category: "Spirits",
//     name: "Mohito Drink",
//     price: 6,
//   },
//   {
//     id: 9,
//     category: "Spirits",
//     name: "Perła Chmielowa",
//     price: 4,
//   },
// ];

// const ProductsContext = createContext();

// const productsReducer = (state, action) => {
//   switch (action.type) {
//     case "SHOW_SNACKS":
//       return state;
//     case "ADD_PRODUCT":
//       return [
//         ...state,
//         {
//           id: action.id + action.category,
//           category: action.category,
//           name: action.name,
//           price: action.price,
//         },
//       ];
//     case "DELETE_PRODUCT":
//       return state.filter((product) => product.id !== action.id);
//     default:
//       throw new Error("Something went wrong!");
//   }
// };

// const ProductsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(productsReducer, products);

//   const snacks = state.filter((item) => item.category === "Snacks");
//   const drinks = state.filter((item) => item.category === "Drinks");
//   const spirits = state.filter((item) => item.category === "Spirits");

//   return (
//     <ProductsContext.Provider value={{ snacks, drinks, spirits, dispatch }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };

// export default ProductsProvider;

// export const useProducts = () => useContext(ProductsContext);

import { useReducer, createContext, useContext } from "react";

let isLogged = false;

const AdminContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED":
      return (state = true);
    case "UNLOGGED":
      return (state = false);

    default:
      throw new Error("Something went wrong admin!");
  }
};

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, isLogged);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;

export const useAdmin = () => useContext(AdminContext);

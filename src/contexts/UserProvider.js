import { useReducer, createContext, useContext } from "react";

const userLoggedData = {
  isLogged: false,
  userName: "",
};

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_UNLOGGED":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error("Something went wrong with userlogiin!");
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userLoggedData);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

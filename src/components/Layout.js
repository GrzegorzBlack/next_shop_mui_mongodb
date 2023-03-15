import Header2 from "./Header/Header2";

const Layout = ({ children }) => {
  return (
    <>
      <Header2 />
      {children}
    </>
  );
};

export default Layout;

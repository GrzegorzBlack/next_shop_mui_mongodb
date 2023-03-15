import List from "@mui/material/List";

import { AdminProduct2 } from "../components/AdminProduct/AdminProduct2";
import { Form } from "../components/Form/Form";
import { useState } from "react";
import {
  AdminPageWrapper,
  ListBoxWrapper,
  StyledBoxWrapper,
  AdminFormWrapper,
  ListBox,
} from "../styles/pagesStyles/adminStyle";
import LoginDialog from "../components/Modals/LoginUserDialog/LoginUserDialog";
import { getSnacks } from "@/lib/prisma/snacks";
import { getDrinks } from "@/lib/prisma/drinks";
import { getSpirits } from "@/lib/prisma/spirits";

const Admin = ({ snacks, drinks, spirits }) => {
  const [open, setOpen] = useState(true);
  const [productsSnacks, setProductsSnacks] = useState(snacks);
  const [productsDrinks, setProductsDrinks] = useState(drinks);
  const [productsSpirits, setProductsSpirits] = useState(spirits);

  const ProductsWrapper = ({ items }) => {
    const handleDelete = async (id, category) => {
      const body = {
        id: id,
      };

      const name = category.slice(0, category.length - 1);

      const deleteData = async () => {
        const response = await fetch(`/api/${category}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        return response.json();
      };
      deleteData().then((data) => {
        const newCart = items.filter((product) => {
          return product.id !== data[`${name}Product`].id;
        });
        switch (category) {
          case "snacks":
            setProductsSnacks(newCart);
            break;
          case "drinks":
            setProductsDrinks(newCart);
            break;
          case "spirits":
            setProductsSpirits(newCart);
            break;
          default:
            console.log(`Sorry, we are out of ${category}.`);
        }
      });
    };
    const renderedProducts = items.map((product) => (
      <AdminProduct2
        key={product.id}
        deleteProduct={handleDelete}
        {...product}
      />
    ));

    return (
      <ListBox>
        <ListBoxWrapper>
          <List>{renderedProducts}</List>
        </ListBoxWrapper>
      </ListBox>
    );
  };

  return (
    <>
      <AdminPageWrapper>
        <ProductsWrapper items={productsSnacks} />
        <ProductsWrapper items={productsDrinks} />
        <ProductsWrapper items={productsSpirits} />
        <StyledBoxWrapper>
          <AdminFormWrapper>
            <Form
              setSnacks={setProductsSnacks}
              setDrinks={setProductsDrinks}
              setSpirits={setProductsSpirits}
              itemsSnacks={productsSnacks}
              itemsDrinks={productsDrinks}
              itemsSpirits={productsSpirits}
            />
          </AdminFormWrapper>
        </StyledBoxWrapper>
      </AdminPageWrapper>
      <LoginDialog
        onClose={() => setOpen(false)}
        show={open}
        userLogged={"Admin"}
        dialogTextOne={"After you finish you work, please remember to logout."}
      />
    </>
  );
};

export async function getServerSideProps() {
  const { snacks } = await getSnacks();
  const { drinks } = await getDrinks();
  const { spirits } = await getSpirits();

  return { props: { snacks, drinks, spirits } };
}

export default Admin;

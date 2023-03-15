import Page2 from "../components/Page2";
import { getDrinks } from "@/lib/prisma/drinks";

const Drinks = ({ drinks }) => {
  return <Page2 productsState={drinks} />;
};

export async function getServerSideProps() {
  const { drinks } = await getDrinks();

  return { props: { drinks } };
}

export default Drinks;

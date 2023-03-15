import Page2 from "../components/Page2";
import { getSpirits } from "@/lib/prisma/spirits";

const Spirits = ({ spirits }) => {
  return <Page2 productsState={spirits} />;
};

export async function getServerSideProps() {
  const { spirits } = await getSpirits();

  return { props: { spirits } };
}

export default Spirits;

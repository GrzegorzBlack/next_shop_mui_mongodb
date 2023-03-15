import Page2 from "../components/Page2";
import { getSnacks } from "@/lib/prisma/snacks";

function Snacks({ snacks }) {
  return <Page2 productsState={snacks} route="snacks" />;
}

export async function getServerSideProps() {
  const { snacks } = await getSnacks();

  return { props: { snacks } };
}

export default Snacks;

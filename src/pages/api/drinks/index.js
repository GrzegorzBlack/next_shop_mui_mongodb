import {
  createDrink,
  getDrinks,
  adminDeleteProduct,
} from "@/lib/prisma/drinks";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { drinks, error } = await getDrinks();
      if (error) throw new Error(error);
      return res.status(200).json({ drinks });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { drink, error } = await createDrink(data);
      if (error) throw new Error(error);
      return res.status(200).json({ drink });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const { drinkProduct } = await adminDeleteProduct(id);
      return res.status(200).json({ drinkProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

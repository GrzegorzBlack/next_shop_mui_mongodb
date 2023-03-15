import {
  createSpirit,
  getSpirits,
  adminDeleteProduct,
} from "@/lib/prisma/spirits";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { spirits, error } = await getSpirits();
      if (error) throw new Error(error);
      return res.status(200).json({ spirits });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { spirit, error } = await createSpirit(data);
      if (error) throw new Error(error);
      return res.status(200).json({ spirit });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const { spiritProduct } = await adminDeleteProduct(id);
      return res.status(200).json({ spiritProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

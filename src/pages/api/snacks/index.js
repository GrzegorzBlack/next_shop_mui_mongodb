import {
  createSnack,
  getSnacks,
  adminDeleteProduct,
} from "@/lib/prisma/snacks";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { snacks, error } = await getSnacks();
      if (error) throw new Error(error);
      return res.status(200).json({ snacks });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { snack, error } = await createSnack(data);
      if (error) throw new Error(error);
      return res.status(200).json({ snack });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const { snackProduct } = await adminDeleteProduct(id);
      return res.status(200).json({ snackProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

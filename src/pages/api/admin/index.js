import { createCartProduct, editCartproduct } from "@/lib/prisma/cart";
import deleteAdminproduct from "@/lib/prisma/snacks";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { cart, error } = await createCartProduct(data);
      if (error) throw new Error(error);
      return res.status(200).json({ cart });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      console.log(req.body);

      const { id, quantity } = req.body;
      const { cartProduct } = await editCartproduct(id, quantity);
      console.log(cartProduct);
      return res.status(200).json({ cartProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const { snackProduct } = await deleteAdminproduct(id);
      return res.status(200).json({ snackProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST", "PATCH", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

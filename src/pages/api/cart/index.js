import {
  getCartProducts,
  createCartProduct,
  editCartproduct,
  deleteCartproduct,
  deleteCart,
} from "@/lib/prisma/cart";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { cartProducts, error } = await getCartProducts();
      if (error) throw new Error(error);
      return res.status(200).json({ cartProducts });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

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
      if (id) {
        const { cartProduct } = await deleteCartproduct(id);
        return res.status(200).json({ cartProduct });
      } else {
        const { deletedCart } = await deleteCart();
        return res.status(200).json({ deletedCart });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

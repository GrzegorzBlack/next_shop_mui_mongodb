import client from ".";

export async function getCartProducts() {
  try {
    const cartProducts = await client.cart.findMany();
    return { cartProducts };
  } catch (error) {
    return { error };
  }
}

export async function createCartProduct(cart) {
  try {
    const cartProductFromDB = await client.cart.upsert({
      where: { name: cart.name },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        name: cart.name,
        price: cart.price,
        quantity: 1,
      },
    });
    return { cartProduct: cartProductFromDB };
  } catch (error) {
    return { error };
  }
}

export async function editCartproduct(id, quantity) {
  try {
    const cartProduct = await client.cart.update({
      where: { id: id },
      data: {
        quantity: quantity,
      },
    });
    return { cartProduct };
  } catch (error) {
    return { error };
  }
}
export async function deleteCartproduct(id) {
  try {
    const cartProduct = await client.cart.delete({
      where: { id: id },
    });
    return { cartProduct };
  } catch (error) {
    return { error };
  }
}

export async function deleteCart() {
  try {
    const deletedCart = await client.cart.deleteMany({});
    return { deletedCart };
  } catch (error) {
    return { error };
  }
}

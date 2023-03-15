import client from ".";

export async function getSnacks() {
  try {
    const snacks = await client.snacks.findMany();
    return { snacks };
  } catch (error) {
    return { error };
  }
}

export async function createSnack(snacks) {
  try {
    const snackFromDB = await client.snacks.create({
      data: {
        category: snacks.category,
        name: snacks.name,
        price: snacks.price,
      },
    });
    return { snack: snackFromDB };
  } catch (error) {
    return { error };
  }
}

export async function adminDeleteProduct(id) {
  try {
    const snackProduct = await client.snacks.delete({
      where: { id: id },
    });
    console.log(snackProduct);

    return { snackProduct };
  } catch (error) {
    return { error };
  }
}

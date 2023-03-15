import client from ".";

export async function getSpirits() {
  try {
    const spirits = await client.spirits.findMany();
    return { spirits };
  } catch (error) {
    return { error };
  }
}

export async function createSpirit(spirits) {
  try {
    const spiritFromDB = await client.spirits.create({
      data: {
        category: spirits.category,
        name: spirits.name,
        price: spirits.price,
      },
    });
    return { spirit: spiritFromDB };
  } catch (error) {
    return { error };
  }
}

export async function adminDeleteProduct(id) {
  try {
    const spiritProduct = await client.spirits.delete({
      where: { id: id },
    });
    console.log(spiritProduct);

    return { spiritProduct };
  } catch (error) {
    return { error };
  }
}

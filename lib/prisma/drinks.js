import client from ".";

export async function getDrinks() {
  try {
    const drinks = await client.drinks.findMany();
    return { drinks };
  } catch (error) {
    return { error };
  }
}

export async function createDrink(drinks) {
  try {
    const drinkFromDB = await client.drinks.create({
      data: {
        category: drinks.category,
        name: drinks.name,
        price: drinks.price,
      },
    });
    return { drink: drinkFromDB };
  } catch (error) {
    return { error };
  }
}

export async function adminDeleteProduct(id) {
  try {
    const drinkProduct = await client.drinks.delete({
      where: { id: id },
    });
    console.log(drinkProduct);

    return { drinkProduct };
  } catch (error) {
    return { error };
  }
}

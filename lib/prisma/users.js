import client from ".";

export async function createUser(users) {
  try {
    const userFromDB = await client.users.create({
      data: {
        userName: users.userName,
        email: users.email,
        password: users.password,
        isLogged: users.isLogged,
      },
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function findUser(userName, password) {
  try {
    if (password) {
      const userLogging = await client.users.updateMany({
        where: {
          userName: userName,
          password: password,
        },
        data: {
          isLogged: true,
        },
      });
      return { userLogging };
    } else {
      const userLogging = await client.users.updateMany({
        where: {
          userName: userName,
        },
        data: {
          isLogged: false,
        },
      });
      return { userLogging };
    }
  } catch (error) {
    return { error };
  }
}

import { createUser, findUser } from "@/lib/prisma/users";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { user, error } = await createUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      console.log(req.body);

      const { userName, password } = req.body;
      const { userLogging } = await findUser(userName, password);
      console.log(`Hui ${userLogging.count}`);
      return res.status(200).json({ userLogging });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST", "PATCH"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

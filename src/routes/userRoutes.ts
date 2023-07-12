import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

// create user
router.post("/", async (req, res) => {
  const { name, email, username } = req.body;
  console.log(name, email, username);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "Hello, I'm new on Twitter",
      },
    });
    return res.json(user);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Username or email should be unique" });
  }
});

// get users
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
});

// get one user
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) },
  });
  return res.json(user);
});

// update user
router.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { bio, name, image } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(user_id),
      },
      data: {
        bio,
        name,
        image,
      },
    });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Failed to update the user" });
  }
});

// delete user
router.delete("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: Number(user_id),
      },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete the user" });
  }
});

export default router;

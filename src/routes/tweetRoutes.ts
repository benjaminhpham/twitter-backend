import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = "SUPER_SECRET";

// create tweet
router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;
  // Authentication
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = (await jwt.verify(token, JWT_SECRET)) as {
      tokenId: number;
    };
    const dbToken = await prisma.token.findUnique({
      where: { id: payload?.tokenId },
      include: { user: true },
    });

    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      return res.status(401).json({ error: "API token expired" });
    }

    const tweet = await prisma.tweet.create({
      data: {
        content,
        image,
        userId, // TODO manage based on the auth user
      },
    });
    return res.json(tweet);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Tweetname or email should be unique" });
  }
});

// get tweets
router.get("/", async (req, res) => {
  const allTweets = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });
  return res.json(allTweets);
});

// get one tweet
router.get("/:tweet_id", async (req, res) => {
  const { tweet_id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(tweet_id) },
  });
  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }
  return res.json(tweet);
});

// update tweet
// router.put("/:tweet_id", async (req, res) => {
//   const { tweet_id } = req.params;
//   const { bio, name, image } = req.body;

//   try {
//     const tweet = await prisma.tweet.update({
//       where: {
//         id: Number(tweet_id),
//       },
//       data: {
//         bio,
//         name,
//         image,
//       },
//     });
//     return res.json(tweet);
//   } catch (err) {
//     return res.status(400).json({ error: "Failed to update the tweet" });
//   }
// });

// delete tweet
router.delete("/:tweet_id", async (req, res) => {
  const { tweet_id } = req.params;
  try {
    await prisma.tweet.delete({
      where: {
        id: Number(tweet_id),
      },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete the tweet" });
  }
});

export default router;

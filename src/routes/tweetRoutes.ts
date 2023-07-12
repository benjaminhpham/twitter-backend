import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

// create tweet
router.post("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get tweets
router.get("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get one tweet
router.get("/:tweet_id", (req, res) => {
  const { tweet_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${tweet_id}` });
});

// update tweet
router.put("/:tweet_id", (req, res) => {
  const { tweet_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${tweet_id}` });
});

// delete tweet
router.delete("/:tweet_id", (req, res) => {
  const { tweet_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${tweet_id}` });
});

export default router;

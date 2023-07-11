import { Router } from "express";
const router = Router();

// create user
router.post("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get users
router.get("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get one user
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${user_id}` });
});

// update user
router.put("/:user_id", (req, res) => {
  const { user_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${user_id}` });
});

// delete user
router.delete("/:user_id", (req, res) => {
  const { user_id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${user_id}` });
});

export default router;

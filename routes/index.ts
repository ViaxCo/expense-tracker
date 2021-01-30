import express from "express";
const router = express.Router();
import * as actions from "../controllers/transactions";

router.route("/").get(actions.getTransactions).post(actions.addTransaction);
router.route("/:id").delete(actions.deleteTransaction);

export default router;

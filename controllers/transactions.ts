import { Request, Response } from "express";
import { Transaction, TransactionDoc, User, UserDoc } from "../models";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// @desc GET /api/transactions)
export const getTransactions = async (req: Request, res: Response) => {
  try {
    // Get client ip address
    const ip = req.clientIp;
    const response = await axios.get(
      `http://ip-api.com/json/${ip}?fields=status,country,currency`
    );
    const { currency }: { currency: string } = response.data;
    if (req.session.user) {
      // If user session exists
      const user: UserDoc = await User.findOne({ uuid: req.session.user.uuid });
      const transactions = user.transactions;
      return res.status(200).json({
        success: true,
        items: transactions.length,
        data: { transactions, currency },
      });
    } else {
      // If no user session exists, create user and user session
      req.session.user = { uuid: uuidv4() };
      const newUser = await User.create({
        uuid: req.session.user.uuid,
        transactions: [],
      });
      const transactions = newUser.transactions;
      return res.status(200).json({
        success: true,
        items: transactions.length,
        data: { transactions, currency },
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
// @desc POST /api/transactions
export const addTransaction = async (req: Request, res: Response) => {
  const { text, amount }: TransactionDoc = req.body;
  const transaction = new Transaction({
    text,
    amount,
  });
  try {
    // Find the current user, and push the new transaction into its transactions array
    await User.findOneAndUpdate(
      { uuid: req.session.user.uuid },
      { $push: { transactions: transaction } }
    );
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.log(err.message);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(
        (val: any) => val.message as string
      );
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
// @desc DELETE /api/transactions/:id
export const deleteTransaction = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await User.findOneAndUpdate(
      { uuid: req.session.user.uuid },
      { $pull: { transactions: { _id: id } } }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
      details:
        err.name === "CastError"
          ? "The id paramter is not the correct Mongoose id format"
          : "",
    });
  }
};

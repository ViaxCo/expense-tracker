import mongoose, { Document } from "mongoose";

// Transaction interface
export interface TransactionDoc extends Document {
  text: string;
  amount: number;
}
// User interface
export interface UserDoc extends Document {
  uuid: string;
  transactions: TransactionDoc[];
}

// Transaction schema
const transactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
});
// User schema
const userSchema = new mongoose.Schema({
  uuid: String,
  transactions: [transactionSchema],
});

export const Transaction = mongoose.model<TransactionDoc>(
  "Transaction",
  transactionSchema
);
export const User = mongoose.model<UserDoc>("User", userSchema);

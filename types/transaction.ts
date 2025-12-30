import { Types } from "mongoose";

export interface Transaction {
  _id: string;
  date: string;
  accountId: Types.ObjectId;
  payeeId: Types.ObjectId;
  categoryId: Types.ObjectId;
  toAccountId: Types.ObjectId;
  amountCents: number;
  memo: string;
}

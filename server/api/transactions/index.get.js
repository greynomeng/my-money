import { Transaction } from "#imports";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const accountId = query.account;
    const objectId = new ObjectId(accountId);

    const transactions = await Transaction.find({ accountId: objectId })
      .populate("payeeId")
      .populate("categoryId");
    return {
      statusCode: 200,
      data: transactions
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch accounts: ${error}`
    });
  }
});

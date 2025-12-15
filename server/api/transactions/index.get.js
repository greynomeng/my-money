import { Transaction } from "#imports";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const accountId = query.account;
    const objectId = new ObjectId(accountId);
    const accounts = await Transaction.find({ account_id: objectId })
      .populate("payee_id")
      .populate("category_id");
    return {
      statusCode: 200,
      data: accounts
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch accounts: ${error}`
    });
  }
});

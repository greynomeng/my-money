import { Account } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const accounts = await Account.find().sort({ name: 1 });

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

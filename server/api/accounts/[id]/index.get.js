import { Account } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const account = await Account.findById(id);

    if (!account) {
      throw createError({
        statusCode: 404,
        message: "Account not found"
      });
    }
    return {
      success: true,
      data: account
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch account: ${error}`
    });
  }
});

import { Account } from "#imports";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const updatedAccount = await Account.findByIdAndUpdate(id, body);
    return {
      success: true,
      data: updatedAccount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to update account: ${error}`
    });
  }
});

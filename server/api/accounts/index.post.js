import { Account } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newAccount = await Account.create(body);
    return {
      statusCode: 201,
      message: "Account created",
      data: newAccount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create account: ${error}`
    });
  }
});

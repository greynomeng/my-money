export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newAccount = await prisma.Account.create(body);
    return {
      success: true,
      data: newAccount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create account: ${error}`
    });
  }
});

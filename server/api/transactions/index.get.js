export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const accountId = query.account;
    const accounts = await prisma.Transaction.findAll({
      where: {
        account_id: accountId
      }
    });
    return {
      success: true,
      data: accounts
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch accounts: ${error}`
    });
  }
});

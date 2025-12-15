export default defineEventHandler(async (event) => {
  try {
    const accounts = await prisma.Account.findAll({
      order: [["name", "ASC"]]
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

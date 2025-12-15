export default defineEventHandler(async (event) => {
  try {
    const payees = await prisma.Payee.findAll({
      order: [["name", "ASC"]]
    });
    return {
      success: true,
      data: payees
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch payees: ${error}`
    });
  }
});

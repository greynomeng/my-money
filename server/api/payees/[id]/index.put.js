export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const updatedPayee = await prisma.Payee.update(body, { where: { id: id } });
    return {
      success: true,
      data: updatedPayee
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to update payee: ${error}`
    });
  }
});

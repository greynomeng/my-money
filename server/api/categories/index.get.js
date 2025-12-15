export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.Category.findAll();
    return {
      success: true,
      data: categories
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch categories: ${error}`
    });
  }
});

import { Category } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newCategory = await Category.create(body);
    return {
      success: true,
      data: newCategory
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create category: ${error}`
    });
  }
});

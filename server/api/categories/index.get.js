import { Category } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const categories = await Category.find();
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

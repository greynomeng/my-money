import { Category } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, path } = body;

  try {
    if (!name) {
      throw createError({
        statusCode: 400,
        message: "Name is required"
      });
    }

    const newCategory = Category.create({ name, path });

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

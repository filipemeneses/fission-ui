import { updateFissionFunction } from "../utils/fission/updateFissionFunction";

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);
  const { code } = await readBody(event);

  if (!name) {
    return {
      error: "Missing function name",
    };
  }

  try {
    await updateFissionFunction({
      name,
      code,
    });

    return {
      error: null,
    };
  } catch (e) {
    console.error(e);

    return {
      error: e,
    };
  }
});

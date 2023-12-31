import { createFissionFunction } from "../utils/fission/createFissionFunction";

export default defineEventHandler(async (event) => {
  const { name, env } = getQuery(event);
  const { code } = await readBody(event);

  if (!name) {
    return {
      error: "Missing function name",
    };
  }

  try {
    await createFissionFunction({
      name,
      code,
      env,
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

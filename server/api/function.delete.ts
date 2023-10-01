import { deleteFissionFunction } from "../utils/fission/deleteFissionFunction";

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);

  if (!name) {
    return {
      error: "Missing function name",
    };
  }

  try {
    await deleteFissionFunction(name);
    return {
      error: null,
    };
  } catch (e) {
    console.error(e);

    return {
      code: "",
      error: e,
    };
  }
});

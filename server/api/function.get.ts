import { getFissionFunctionCode } from "../utils/fission/getFissionFunctionCode";

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);

  if (!name) {
    return {
      error: "Missing function name",
    };
  }

  try {
    const code = await getFissionFunctionCode(name);
    return {
      code,
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

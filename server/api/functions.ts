import { getFissionFunctions } from "../utils/fission/getFissionFunctions";

export default defineEventHandler(async (event) => {
  try {
    const functions = await getFissionFunctions();
    return {
      functions,
      error: null,
    };
  } catch (e) {
    console.error(e);

    return {
      functions: [],
      error: e,
    };
  }
});

import { updateFissionFunction } from "../utils/fission/updateFissionFunction";
import { temporaryFile } from "tempy";
import { writeFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);
  const { code } = await readBody(event);

  if (!name) {
    return {
      error: "Missing function name",
    };
  }

  const codeFilepath = temporaryFile();

  await writeFile(codeFilepath, code);

  try {
    await updateFissionFunction({
      name,
      codeFilepath,
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

import { execCmd } from "../cmd/execCmd";
import { temporaryFile } from "tempy";
import { writeFile, unlink } from "fs/promises";

export const updateFissionFunction = async ({
  name,
  code,
}: {
  name: string;
  code: string;
}): Promise<string> => {
  const codeFilepath = temporaryFile();

  await writeFile(codeFilepath, code);

  const cmdOutput = await execCmd(
    `fission function update --name=${name} --code="${codeFilepath}"`
  );

  await unlink(codeFilepath);

  try {
    await execCmd(
      `fission route create --function ${name} --url /${name} --name ${name}`
    );
  } catch (e) {
    if (!(e as Error).message.indexOf("duplicate trigger exists")) {
      throw e;
    }
  }

  return cmdOutput as string;
};

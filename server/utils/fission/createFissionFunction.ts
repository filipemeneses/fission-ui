import { execCmd } from "../cmd/execCmd";
import { temporaryFile } from "tempy";
import { writeFile, unlink } from "fs/promises";

export const createFissionFunction = async ({
  name,
  code,
  env,
}: {
  name: string;
  code: string;
  env: string;
}) => {
  const codeFilepath = temporaryFile();
  await writeFile(codeFilepath, code);

  const entrypoint = env === "go" ? "--entrypoint Handler" : "";

  await execCmd(
    `fission function create --env=${env} --name=${name} --code="${codeFilepath}" ${entrypoint}`
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
};

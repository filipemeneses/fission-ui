import { execCmd } from "../cmd/execCmd";

export const updateFissionFunction = async ({
  name,
  codeFilepath,
}: {
  name: string;
  codeFilepath: string;
}): Promise<string> => {
  const cmdOutput = await execCmd(
    `fission function update --name=${name} --code="${codeFilepath}"`
  );

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

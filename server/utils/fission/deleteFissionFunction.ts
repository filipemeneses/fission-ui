import { execCmd } from "../cmd/execCmd";
export const deleteFissionFunction = async (name: string): Promise<string> => {
  const cmdOutput = await execCmd(`fission function delete --name=${name}`);

  return cmdOutput as string;
};

import { execCmd } from "../cmd/execCmd";

export const getFissionFunctionCode = async (name: string): Promise<string> => {
  const cmdOutput = await execCmd("fission function get --name=" + name);
  return cmdOutput as string;
};

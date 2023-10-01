import { execCmd } from "../cmd/execCmd";
import { sanitizeListStdout } from "./sanitizeListStdout";

export const getFissionFunctions = async () => {
  const cmdOutput = await execCmd("fission function list");
  return sanitizeListStdout(cmdOutput as string);
};

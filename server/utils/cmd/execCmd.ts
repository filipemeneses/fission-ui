import { exec } from "child_process";

export const execCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (_, stdout, stderr) => {
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

import { sanitizeListStdout } from "./sanitizeListStdout";

describe("sanitizeListStdout", () => {
  it("should transform strout to JSON list", async () => {
    const fixture = `NAME           ENV    EXECUTORTYPE MINSCALE MAXSCALE MINCPU MAXCPU MINMEMORY MAXMEMORY SECRETS CONFIGMAPS NAMESPACE
    hello          nodejs poolmgr      1        2        3      4      5         6                            default
    hello-callback nodejs poolmgr      0        0        0      0      0         0                            default
    `;

    expect(sanitizeListStdout(fixture)).toEqual([
      {
        env: "nodejs",
        executorType: "poolmgr",
        maxCpu: 4,
        maxMemory: 6,
        maxScale: 2,
        minCpu: 3,
        minMemory: 5,
        minScale: 1,
        name: "hello",
      },
      {
        env: "nodejs",
        executorType: "poolmgr",
        maxCpu: 0,
        maxMemory: 0,
        maxScale: 0,
        minCpu: 0,
        minMemory: 0,
        minScale: 0,
        name: "hello-callback",
      },
    ]);
  });
});

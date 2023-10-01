export const sanitizeListStdout = (stdout: string) => {
  const [header, ...fns] = stdout.split("\n");

  const NAME_MAPPING: { [k: string]: string } = {
    NAME: "name",
    ENV: "env",
    EXECUTORTYPE: "executorType",
    MINSCALE: "minScale",
    MAXSCALE: "maxScale",
    MINCPU: "minCpu",
    MAXCPU: "maxCpu",
    MINMEMORY: "minMemory",
    MAXMEMORY: "maxMemory",
  };
  const TYPE_MAPPING: { [k: string]: any } = {
    NAME: String,
    ENV: String,
    EXECUTORTYPE: String,
    MINSCALE: Number,
    MAXSCALE: Number,
    MINCPU: Number,
    MAXCPU: Number,
    MINMEMORY: Number,
    MAXMEMORY: Number,
  };

  const sanitizeName = (v: string) => NAME_MAPPING[v] || v;
  const sanitizeValue = (attr: string, v: any) => TYPE_MAPPING[attr](v);
  const toArray = (row: string) =>
    row.split(" ").filter((n: string) => n !== "");

  const headers = toArray(header).slice(0, 9);

  const functions = fns.map((fnRow) => {
    const fnList = toArray(fnRow);

    return headers.reduce(
      (obj: { [k: string]: any }, nextHeader, nextIndex) => {
        obj[sanitizeName(nextHeader)] = sanitizeValue(
          nextHeader,
          fnList[nextIndex]
        );

        return obj;
      },
      {}
    );
  });

  return functions;
};

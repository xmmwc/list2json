const toList = (
  content: string,
  ignoreSpace: number,
  ignoreLines: number[] = []
) => {
  const list = content.split(/\n/).map(line => {
    return line.trim().split(new RegExp(`\\s{${ignoreSpace},}`));
  });
  list.filter((value, index) => ignoreLines.indexOf(index) < 0);
  return list;
};

export const list2Formated = (
  content: string,
  ignoreSpace: number = 1,
  ignoreLines: number[] = []
) => {
  console.log(ignoreSpace, ignoreLines);
  const list = toList(content, ignoreSpace, ignoreLines);
  const firstLine: string[] = list[0];
  const outputList = [];
  for (const line of list) {
    const row = firstLine.map((col, index) => line[index]);
    outputList.push(row);
  }
  return outputList;
};

export const list2Json = (
  content: string,
  titleLine: number = -1,
  ignoreSpace: number = 1,
  ignoreLines: number[] = []
) => {
  console.log(titleLine, ignoreSpace, ignoreLines);
  const list = toList(content, ignoreSpace, ignoreLines);
  const hasTitleLine = titleLine >= 0;
  const firstLine: string[] = hasTitleLine
    ? list.splice(titleLine, 1)[0]
    : list[0];
  const jsonList = [];
  for (const line of list) {
    const row = firstLine.reduce((cols: any[string], colVal, index) => {
      const value = line[index];
      if (hasTitleLine) {
        cols[firstLine[index]] = value;
      } else {
        cols[`${index}`] = value;
      }
      return cols;
    }, {});
    jsonList.push(row);
  }
  return jsonList;
};

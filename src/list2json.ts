const toList = (
  content: string,
  ignoreLast: boolean = false,
  ignoreSpace: number
) => {
  const list = content.split(/\n/).map(line => {
    return line.trim().split(new RegExp(`\\s{${ignoreSpace},}`));
  });
  if (ignoreLast) {
    list.pop();
  }
  return list;
};

export const list2Formated = (
  content: string,
  ignoreLast: boolean = false,
  ignoreSpace: number = 1
) => {
  const list = toList(content, ignoreLast, ignoreSpace);
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
  ignoreLast: boolean = false,
  ignoreSpace: number = 1
) => {
  const list = toList(content, ignoreLast, ignoreSpace);
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

const toList = (content: string, ignoreSpace: number) => {
  return content.split(/\n/).map(line => {
    return line.trim().split(new RegExp(`\\s{${ignoreSpace + 1},}`));
  });
};

export const list2Json = (
  content: string,
  titleLine: number = -1,
  ignoreLast: boolean = false,
  ignoreSpace: number = 1
) => {
  const list = toList(content, ignoreSpace);
  const hasHeadLine = titleLine >= 0;
  const head: string[] = hasHeadLine ? list.splice(titleLine, 1)[0] : [];
  const jsonArr = [];
  for (const [lineIndex, line] of list.entries()) {
    const showThisLine = !ignoreLast || lineIndex !== list.length - 1;
    if (showThisLine) {
      const jsonObject = line.reduce((cols: any[string], colVal, index) => {
        if (hasHeadLine) {
          cols[head[index]] = colVal;
        } else {
          cols[`${index}`] = colVal;
        }
        return cols;
      }, {});
      jsonArr.push(jsonObject);
    }
  }
  return jsonArr;
};

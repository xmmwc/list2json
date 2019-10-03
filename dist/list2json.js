"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toList = (content, ignoreSpace, ignoreLines) => {
    const listFromStr = content.split(/\n/).map(line => {
        return line.trim().split(new RegExp(`\\s{${ignoreSpace},}`));
    });
    const ignoreList = ignoreLines.map(val => {
        return listFromStr.slice(val)[0];
    });
    return listFromStr.filter(val => {
        return ignoreList.indexOf(val) < 0;
    });
};
exports.list2Formated = (content, ignoreSpace, ignoreLines, ignoreCols) => {
    // console.log(ignoreSpace, ignoreLines);
    const list = toList(content, ignoreSpace, ignoreLines);
    const firstLine = list[0];
    const outputList = [];
    for (const line of list) {
        const row = firstLine.reduce((cols, colVal, index) => {
            if (ignoreCols.indexOf(index) < 0) {
                cols.push(line[index]);
            }
            return cols;
        }, []);
        outputList.push(row);
    }
    return outputList;
};
exports.list2Json = (content, titleLine, ignoreSpace, ignoreLines, ignoreCols) => {
    // console.log(titleLine, ignoreSpace, ignoreLines);
    const list = toList(content, ignoreSpace, ignoreLines);
    const hasTitleLine = titleLine >= 0;
    const firstLine = hasTitleLine
        ? list.splice(titleLine, 1)[0]
        : list[0];
    const jsonList = [];
    for (const line of list) {
        const row = firstLine.reduce((cols, colVal, index) => {
            if (ignoreCols.indexOf(index) < 0) {
                const value = line[index];
                if (hasTitleLine) {
                    cols[firstLine[index]] = value;
                }
                else {
                    cols[`${index}`] = value;
                }
            }
            return cols;
        }, {});
        jsonList.push(row);
    }
    return jsonList;
};
//# sourceMappingURL=list2json.js.map
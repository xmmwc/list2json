#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const table_1 = require("table");
const list2json_1 = require("./list2json");
const getObject = (content, titleLine, ignoreSpace, ignoreLines = []) => list2json_1.list2Json(content, titleLine, ignoreSpace, ignoreLines);
const getList = (content, ignoreSpace, ignoreLines = []) => list2json_1.list2Formated(content, ignoreSpace, ignoreLines);
const getContent = (content) => new Promise(resolve => {
    if (content) {
        resolve(content);
    }
    else {
        process.stdin.on("data", chunk => {
            let chunkContent = chunk.toString();
            resolve(chunkContent);
        });
    }
});
const parseArray = (str) => {
    try {
        return JSON.parse(str);
    }
    catch (_a) {
        console.log("please input right array! exp: [1,2,3]");
        return null;
    }
};
commander_1.default.version('1.0.0');
commander_1.default
    .command("json [content]")
    .description("output json string of list")
    .option("-t,--title [number]", "index of title line", 0)
    .option("-s,--space [number]", "number of space between colum to be ignore when split", 1)
    .option("-i,--index [number...]", "ignore n line", parseArray, [])
    .action((content, options) => {
    getContent(content).then(content => {
        const obj = getObject(content, options.title, options.space, options.index);
        console.log(JSON.stringify(obj));
        process.exit(0);
    });
});
commander_1.default
    .command("table [content]")
    .description("draw table of list")
    .option("-s,--space [number]", "number of space between colum to be ignore when split", 1)
    .option("-i,--index [number...]", "ignore n line", parseArray, [])
    .action((content, options) => {
    getContent(content)
        .then(content => {
        const list = getList(content, options.space, options.index);
        const output = table_1.table(list, {});
        console.log(output);
        process.exit(0);
    })
        .catch(err => {
        console.error(err);
        process.exit(0);
    });
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=bin.js.map
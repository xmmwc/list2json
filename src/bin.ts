#!/usr/bin/env npx ts-node

import program from "commander";
import { table } from "table";
import { version } from "../package.json";
import { list2Json, list2Formated } from "./list2json";

const getObject = (
  content: string,
  titleLine: number,
  ignoreSpace: number,
  ignoreLines: number[] = []
) => list2Json(content, titleLine, ignoreSpace, ignoreLines);

const getList = (
  content: string,
  ignoreSpace: number,
  ignoreLines: number[] = []
) => list2Formated(content, ignoreSpace, ignoreLines);

const getContent = (content: string) =>
  new Promise<string>(resolve => {
    if (content) {
      resolve(content);
    } else {
      process.stdin.on("data", chunk => {
        let chunkContent = chunk.toString();
        resolve(chunkContent);
      });
    }
  });

const parseArray = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    console.log("please input right array! exp: [1,2,3]");
    return null;
  }
};

program.version(version);

program
  .command("json [content]")
  .description("output json string of list")
  .option(
    "-t,--title [number]",
    "index of title line",
    0
  )
  .option(
    "-s,--space [number]",
    "number of space between colum to be ignore when split",
    1
  )
  .option("-i,--index [number...]", "ignore n line", parseArray, [])
  .action((content, options) => {
    getContent(content).then(content => {
      const obj = getObject(
        content,
        options.title,
        options.space,
        options.index
      );
      console.log(JSON.stringify(obj));
      process.exit(0);
    });
  });

program
  .command("table [content]")
  .description("draw table of list")
  .option(
    "-s,--space [number]",
    "number of space between colum to be ignore when split",
    1
  )
  .option("-i,--index [number...]", "ignore n line", parseArray, [])
  .action((content, options) => {
    getContent(content)
      .then(content => {
        const list = getList(content, options.space, options.index);
        const output = table(list, {});
        console.log(output);
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(0);
      });
  });

program.parse(process.argv);

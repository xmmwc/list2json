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

program.version(version);

// program
//   .command("json [content]")
//   .description("output json string of list")
//   .option(
//     "-t,--title [number]",
//     "index of title line",
//     value => parseInt(value),
//     0
//   )
//   .option(
//     "-s,--space [number]",
//     "number of space between colum to be ignore when split",
//     value => parseInt(value),
//     0
//   )
//   .option(
//     "-i,--index [number...]",
//     "ignore n line",
//     value => value.split("/s+/"),
//     []
//   )
//   .action(content => {
//     getContent(content).then(content => {
//       const obj = getObject(
//         content,
//         program.title,
//         program.space,
//         program.index
//       );
//       console.log(JSON.stringify(obj));
//       process.exit(0);
//     });
//   });

program
  .command("table [content]")
  .description("draw table of list")
  .option("-s,--space", "number of space between colum to be ignore when split")
  .option("-i,--index", "ignore n line")
  .action(content => {
    console.log(program, program.space, program.index);
    getContent(content)
      .then(content => {
        const list = getList(content, program.space, program.index);
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

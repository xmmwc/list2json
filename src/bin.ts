#!/usr/bin/env npx ts-node

import program from "commander";
import { version } from "../package.json";
import { list2Json } from "./list2json";

const getObject = (userContent: string) =>
  list2Json(userContent, program.title, !program.last, program.space);

const parseContent = (content: string) =>
  new Promise(resolve => {
    if (content) {
      resolve(getObject(content));
    } else {
      process.stdin.on("data", chunk => {
        let userContent = chunk.toString();
        resolve(getObject(userContent));
      });
    }
  });

program.version(version);

program
  .arguments("[content]")
  .option("-d, --display <type>", "display type", "json")
  .option("-t,--title <number>", "index of title line", 0)
  .option(
    "-s,--space <number>",
    "number of space between colum to be ignore when split",
    0
  )
  .option("--no-last", "ignore last line")
  .action(content => {
    parseContent(content).then(result => {
      switch (program.display) {
        case "table":
          console.log("not finish");
          break;
        default:
          console.log(JSON.stringify(result));
          break;
      }
      process.exit(0);
    });
  });

program.parse(process.argv);

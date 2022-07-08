import path from "path";
import fs from "fs";

import { ValidMdxModule } from "./types";
import { getBaseDir } from "~/utils";

export const mdxTextToPlainText = (text: string): string => {
  return text
    .split("\n")
    .map((line) => {
      line = line.replace(/^#+/, "");
      line = line.replace(/^>+/, "");
      line = line.replace(/^>?[ \r\n\t]*- ?/, "");
      return line;
    })
    .join("\n");
};

export const mdxModToPlainText = (mod: ValidMdxModule): string => {
  const fullPath = path.resolve(getBaseDir(), "app", "mdx", mod.filename);
  const rawContent = fs.readFileSync(fullPath).toString("utf8");

  return mdxTextToPlainText(rawContent);
};

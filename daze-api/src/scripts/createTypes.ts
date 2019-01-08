import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";
import { genSchema } from "../utils/genSchema";

const typescriptTypes = generateNamespace("GQL", genSchema());
fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescriptTypes,
  err => {
    console.log(err);
  }
);
fs.readFile(path.join(__dirname, "../types/schema.d.ts"), "utf8", function(
  err,
  data
) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace("declare", "export");

  fs.writeFile(
    path.join(__dirname, "../types/schema.d.ts"),
    result,
    "utf8",
    function(err) {
      if (err) return console.log(err);
    }
  );
});

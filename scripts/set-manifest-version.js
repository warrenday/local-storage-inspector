import fs from "fs";
import packageJson from "../package.json";

const manifestPath = "./dist/manifest.json";

const run = async () => {
  const json = await fs.promises.readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(json);
  manifest.version = packageJson.version;
  manifest.name = "Local Storage Inspector";
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
};
run();

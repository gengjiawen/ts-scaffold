import path from "path";
import test from "ava";
import sao from "sao";
import execa from "execa";
import fs from "fs-extra";

const generator = path.join(__dirname, "..");

// snapshot can not update perfectly in CI env for ava
console.log(process.env.CI);

test("defaults", async (t) => {
  const stream = await sao.mock({ generator });

  t.snapshot(stream.fileList, "template files");
});

const log = (i) => {
  console.log(i.stdout);
  console.log(i.stderr);
};

test("e2e", async (t) => {
  const outDir = path.join(__dirname, "..", "sample_out");
  fs.emptyDirSync(outDir);
  await execa
    .command(`npx sao ${generator} ${outDir} -y`, {
      cwd: path.join(__dirname, ".."),
    })
    .then(log);
  await execa.command(`yarn test`, {
    cwd: outDir,
  });
  await execa
    .command(`yarn format`, {
      cwd: outDir,
    })
    .then(log);
  await execa
    .command(`yarn build`, {
      cwd: outDir,
    })
    .then(log);

  try {
    await execa
      .command(`git add .`, {
        cwd: outDir,
      })
      .then(log);
    await execa
      .command(`git commit -m "test"`, {
        cwd: outDir,
      })
      .then(log);
  } catch (error) {
    console.warn(error)
  }
  t.pass("template e2e works");
});

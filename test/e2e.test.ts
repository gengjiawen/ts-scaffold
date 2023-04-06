import * as path from 'path'
import * as execa from 'execa'
import * as fs from 'fs-extra'

const sao = require('sao')
const generator = path.join(__dirname, '..')

// snapshot can not update perfectly in CI env for ava
console.log(process.env.CI)

test('all files generated', async () => {
  const stream = await sao.mock({ generator })
  expect(stream.fileList).toMatchSnapshot()
})

const log = (i:any) => {
  console.log(i.stdout)
  console.log(i.stderr)
}

test('e2e', async () => {
  const outDir = path.join(__dirname, '..', 'sample_out')
  fs.emptyDirSync(outDir)
  await execa
    .command(`npx sao ${generator} ${outDir} -y`, {
      cwd: path.join(__dirname, '..'),
    })
    .then(log)
  await execa.command(`npm i`, {
    cwd: outDir,
  })
  await execa.command(`yarn test`, {
    cwd: outDir,
  })
  await execa
    .command(`yarn format`, {
      cwd: outDir,
    })
    .then(log)
  await execa
    .command(`yarn build`, {
      cwd: outDir,
    })
    .then(log)

  try {
    await execa
      .command(`git add .`, {
        cwd: outDir,
      })
      .then(log)
    await execa
      .command(`git commit -m "test"`, {
        cwd: outDir,
      })
      .then(log)
  } catch (error) {
    console.warn(error)
  }
})

import path from 'path'
import test from 'ava'
import sao from 'sao'
import execa from 'execa'

const generator = path.join(__dirname, '..')

test('defaults', async t => {
  const stream = await sao.mock({ generator })

  t.snapshot(stream.fileList, 'Generated files')
})

const log = i => {
  console.log(i.stdout)
  console.log(i.stderr)
}

test('e2e', async t => {
  const outDir = path.join(__dirname, '..', 'sample_out')
  await execa(`npx sao ${generator} ${outDir} -y`, {
    cwd: path.join(__dirname, '..'),
  })
    .then(log)
  await execa(`yarn`, {
    cwd: outDir,
  })
    .then(log)
  await execa(`yarn test`, {
    cwd: outDir,
  })
    .then(log)
})

const ncc = require('@vercel/ncc')
const {resolve, join} = require('path')
const {outputFile} = require('fs-extra')

const config = {
  externals: ['electron'],
}

const srcDir = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'build')

async function build (file) {
  const {code, assets} = await ncc(join(srcDir, file), config)
  await outputFile(join(outDir, file), code)

  for (const [assetName, assetCode] of Object.entries(assets)) {
    await outputFile(join(outDir, assetName), assetCode.source.toString('utf8'))
  }
}

async function main () {
  await build('index.js')
  await build('rendererPreload.js')
  return 'success'
}

main().then(console.log).catch(console.error)

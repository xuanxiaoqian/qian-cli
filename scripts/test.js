const path = require('path')

require('esbuild').build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  outfile: './src/index.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node14',
})

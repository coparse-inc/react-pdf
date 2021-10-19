import {build} from 'esbuild';

let makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, args => ({ path: args.path, external: true }))
  },
}

build({
  entryPoints: ['dist/esm/entry.js'],
  bundle: true,
  outfile: 'dist/esm/entry.js',
  allowOverwrite: true,
  format: 'esm',
  plugins: [makeAllPackagesExternalPlugin],
})

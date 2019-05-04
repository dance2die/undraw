// https://github.com/parcel-bundler/parcel/issues/2280#issuecomment-440720611
const Bundler = require('parcel-bundler')
const Path = require('path')

const file = Path.join(__dirname, './public/index.html')

const options = {
  outDir: './dist',
  outFile: 'index.html',
  // Disable content hash from being included on the filename
  // https://parceljs.org/api.html
  contentHash: false,
  watch: true,
  cache: true,
  cacheDir: '.cache',
  minify: false,
  target: 'browser',
  https: false,
  logLevel: 3,
  hmrPort: 0,
  sourceMaps: true,
  hmrHostname: '',
  detailedReport: false,
}

const bundler = new Bundler(file, options)
bundler.serve()

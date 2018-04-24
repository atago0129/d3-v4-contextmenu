const
  rollup = require('rollup'),
  babel = require('rollup-plugin-babel'),
  name = 'd3-v4-contextmenu';

rollup
  .rollup({
    input: 'index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  })
  .then(bundle => {
    bundle.write({ format: 'es', file: `lib/index.js` });
    bundle.write({ format: 'amd', file: `dist/${name}.amd.js` });
    bundle.write({ format: 'cjs', file: `dist/${name}.cjs.js` });
    bundle.write({
      format: 'iife',
      file: `dist/${name}.js`,
      name: 'd3',
      globals: {
        'd3': 'd3'
      },
      extend: true
    })
  })
  .catch(error => {
    console.error(error)
  });

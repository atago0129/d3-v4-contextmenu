import babel from 'rollup-plugin-babel'

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/d3-v4-contextmenu.js',
    format: 'umd',
    name: 'd3',
    globals: {
      'd3': 'd3'
    },
    extend: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
  ]
}];

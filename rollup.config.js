import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from 'rollup-plugin-replace';

export default {
  treeshake: false,
  external: ['react', 'react-dom', 'react-dom/server'],
  plugins: [
    resolve({ browser: true, module: true, jsnext: true }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({ compact: true, exclude: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': '"production"' })
  ],
  output: {
    format: "iife",
    globals: {
      'react': 'ReactVendor.React', // specifically declare name of global React Object and how it's required in our app src. value coming from name delaration in react-vendor-scripts gulp job.
      'react-dom': 'ReactVendor.ReactDOM',  // specifically declare name of global ReactDOM Object and how it's required in our app src. value coming from name delaration in react-vendor-scripts gulp job.
      'react-dom/server': 'ReactVendor.ReactDOMServer'  // specifically declare name of global ReactDOM Object and how it's required in our app src. value coming from name delaration in react-vendor-scripts gulp job.
    }
  }
};

// rollup -c -i js/vendor/react.js -o js/bundle/react.bundle.js --name "ReactVendor"
// rollup -c -i js/components/index.js -o js/bundle/index.bundle.js --name "View"

// Plan: In views kommen die kompontenten rein mittels Path zB Tempalte name : bt-details-page --> bt_details_page
// müssen tmp kopiert werden?
// cache
// render(<$templateName ... />)
// render(<bt_details_page data=dataFromController />, target)

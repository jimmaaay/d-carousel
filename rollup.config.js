import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
  entry: 'src/js/main.js',
  format: 'umd',
	banner: '/** @preserve j-carousel https://github.com/jimmaaay/j-carousel */',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
		uglify({
			output: {
				comments: function(node, comment) {
					const { value, type } = comment;
	        if (type == "comment2") {
	            return /@preserve|@license|@cc_on/i.test(value);
	        }
				}
			}
		}, minify),
  ],
  dest: 'dist/js/main.min.js',
	moduleName: 'onePageBlog',
	sourceMap: true,
};
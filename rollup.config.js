import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
  entry: 'src/js/main.js',
	moduleName: 'dCarousel',
  format: 'umd',
	banner: '/** @preserve d-carousel https://github.com/jimmaaay/d-carousel */',
  plugins: [
    resolve({
			main: true,
		}),
		commonjs({
			include: 'node_modules/**',
		}),
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
  dest: 'dist/js/d-carousel.min.js',
	sourceMap: true,
};
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
    package: {
      files: path => !path.match(/site/),
      exports: path => path.match(/package.json$|index.js$|preprocess.js$/)
    }
	}
}

export default config
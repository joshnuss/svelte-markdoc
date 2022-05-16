import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
    package: {
      exports: path => path.match(/package.json$|index.js$|preprocess.js$/),
      emitTypes: false // todo
    }
	}
}

export default config
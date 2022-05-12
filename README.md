svelte-markdoc
-----------------

A [Markdoc](https://markdoc.io) preprocessor for [svelte](https://svelte.dev). Supports [svelte-kit](https://kit.svelte.dev).

## Setup

Create a [svelte-kit](https://kit.svelte.dev) project:

```bash
mkdir my-markdoc-project
cd my-markdoc-project

pnpm init svelte@next 
```

Install the `svelte-markdoc` package:

```bash
pnpm install -D svelte-markdoc
```

Create a `markdoc.config.js` in the root folder to keep all your markdoc config:

```javascript
export default {
  variables: {
    title: 'My awesome site'
  }
}
```

Configure the preprocessor in `svelte.config.js`:

```javascript
import preprocessMarkdoc from 'svelte-markdoc'
import markdocConfig from './markdoc.config.js'

const config = {
  extensions: ['.svelte', '.markdoc'],
  preprocess: {
    markup: preprocessMarkdoc(markdocConfig)
  },
  kit: {
    // ...
  }
}

export default config
```

Now you can create pages with the `.markdoc` extension in `src/routes`:

```markdown
---
title: Hello from Markdoc
---

# {% $title %}

This is *super* cool.
```

## FAQ

### How is this different than MDX?

MDX is great! It's very flexible, this is a more contrained editing system where docs are treated as data, whereas with mdx, it's more like code.
More info here: https://markdoc.io/docs/faq#why-not-mdx

## License

MIT

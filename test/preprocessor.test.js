import { assert, expect, test } from 'vitest'
import preprocess from '../index.js'

test('processes .markdoc file', () => {
  const handler = preprocess({})
  const {code} = handler({
    filename: 'example.markdoc',
    content: '# Hello World'
  })

  expect(code).eq('<article><h1>Hello World</h1></article>')
})

test('includes config', () => {
  const handler = preprocess({
    variables: {
      title: "Hello World!"
    }
  })
  const {code} = handler({
    filename: 'example.markdoc',
    content: '# {% $title %}'
  })

  expect(code).eq('<article><h1>Hello World!</h1></article>')
})

test('includes frontmatter in variables', () => {
  const handler = preprocess({})
  const {code} = handler({
    filename: 'example.markdoc',
    content: `---
title: Hello World!
---

# {% $title %}
    `
  })

  expect(code).eq('<article><h1>Hello World!</h1></article>')
})

test('merges existing variables with frontmatter', () => {
  const handler = preprocess({
    variables: {
      currentYear: "2022"
    }
  })
  const {code} = handler({
    filename: 'example.markdoc',
    content: `---
title: Best docs
---

# {% $title %} in {% $currentYear %}
    `
  })

  expect(code).eq('<article><h1>Best docs in 2022</h1></article>')
})

test("doesn't touch non-markdoc files")

import { assert, expect, test } from 'vitest'
import preprocessor from '../index.js'

test('processes .markdoc file', () => {
  const process = preprocessor()
  const {code} = process({
    filename: 'example.markdoc',
    content: '# Hello World'
  })

  expect(code).eq('<article><h1>Hello World</h1></article>')
})

test('includes config', () => {
  const process = preprocessor({
    variables: {
      title: "Hello World!"
    }
  })
  const {code} = process({
    filename: 'example.markdoc',
    content: '# {% $title %}'
  })

  expect(code).eq('<article><h1>Hello World!</h1></article>')
})

test('includes frontmatter in variables', () => {
  const process = preprocessor({})
  const {code} = process({
    filename: 'example.markdoc',
    content: `---
title: Hello World!
---

# {% $title %}`
  })

  expect(code).eq('<article><h1>Hello World!</h1></article>')
})

test('merges existing variables with frontmatter', () => {
  const process = preprocessor({
    variables: {
      currentYear: "2022"
    }
  })
  const {code} = process({
    filename: 'example.markdoc',
    content: `---
title: Best docs
---

# {% $title %} in {% $currentYear %}`
  })

  expect(code).eq('<article><h1>Best docs in 2022</h1></article>')
})

test("doesn't touch non-markdoc files", () => {
  const process = preprocessor()
  const output = process({
    filename: 'mc-hammer.svelte',
    content: "can't touch this"
  })

  expect(output).toBeUndefined()
})

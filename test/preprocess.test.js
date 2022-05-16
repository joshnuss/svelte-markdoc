import { assert, expect, test } from 'vitest'
import preprocessMarkdoc from '../src/lib/preprocess.js'

test('processes .markdoc file', () => {
  const process = preprocessMarkdoc()
  const {code} = process({
    filename: 'example.markdoc',
    content: '# Hello World'
  })

  expect(code).eq('<article><h1>Hello World</h1></article>')
})

test('includes config', () => {
  const process = preprocessMarkdoc({
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
  const process = preprocessMarkdoc({})
  const {code} = process({
    filename: 'example.markdoc',
    content: `---
title: Hello World!
---

# {% $markdoc.frontmatter.title %}`
  })

  expect(code).eq('<article><h1>Hello World!</h1></article>')
})

test('merges existing variables with frontmatter', () => {
  const process = preprocessMarkdoc({
    variables: {
      currentYear: "2022"
    }
  })
  const {code} = process({
    filename: 'example.markdoc',
    content: `---
title: Best docs
---

# {% $markdoc.frontmatter.title %} in {% $currentYear %}`
  })

  expect(code).eq('<article><h1>Best docs in 2022</h1></article>')
})

test("doesn't touch non-markdoc files", () => {
  const process = preprocessMarkdoc()
  const output = process({
    filename: 'mc-hammer.svelte',
    content: "can't touch this"
  })

  expect(output).toBeUndefined()
})

test("parses frontmatter", () => {
  const process = preprocessMarkdoc();
  const {code} = process({
    filename: 'example.markdoc',
    content: `---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %} {% #overview %}`
  })

  expect(code).eq('<article><h1 id="overview">What is Markdoc? </h1></article>')
})
import markdoc from '@markdoc/markdoc'
import { addFrontmatter } from './utils.js'

export default function preprocessMarkdoc(config={}) {
  return (input) => {
    if (isMarkdoc(input.filename)) {
      return {
        code: render(input.content, config)
      }
    }
  }
}

function isMarkdoc(path) {
  return /\.markdoc$/.test(path)
}

function render(source, config) {
  const ast = markdoc.parse(source)
  const configWithFrontmatter = addFrontmatter(ast, config)
  const content = markdoc.transform(ast, configWithFrontmatter)
  return markdoc.renderers.html(content)
}
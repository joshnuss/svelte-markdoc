import markdoc from '@markdoc/markdoc'
import { addFrontmatter } from './utils.js'

export default function preprocessMarkdoc(config={}) {
  /** @param {{ filename: string, content: string }} input */
  return (input) => {
    if (isMarkdoc(input.filename)) {
      return {
        code: render(input.content, config)
      }
    }
  }
}

/**
 * @param {string} path 
 * @returns boolean
 */
function isMarkdoc(path) {
  return /\.markdoc$/.test(path)
}

/**
 * @param {string} source 
 * @param {import("@markdoc/markdoc").Config} config 
 * @returns string
 */
function render(source, config) {
  const ast = markdoc.parse(source)
  const configWithFrontmatter = addFrontmatter(ast, config)
  const content = markdoc.transform(ast, configWithFrontmatter)
  return markdoc.renderers.html(content)
}
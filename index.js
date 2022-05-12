import markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

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
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
  const pageConfig = mergeVariables(config, frontmatter)
  const content = markdoc.transform(ast, pageConfig)

  return markdoc.renderers.html(content)
}

function mergeVariables(config, frontmatter) {
  const existing = config.variables || {}
  const variables = {...existing, ...frontmatter}

  return {...config, variables}
}

import markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

function mergeVariables(config, frontmatter) {
  const variables = {...(config.variables || {}), ...frontmatter}

	return {...config, variables}
}

export default function preprocessMarkdoc(config={}) {
  return (input) => {
    const fileType = /\.markdoc$/

    if (fileType.test(input.filename)) {
      const ast = markdoc.parse(input.content)
      const frontmatter = ast.attributes.frontmatter
        ? yaml.load(ast.attributes.frontmatter)
        : {};
      const pageConfig = mergeVariables(config, frontmatter)
      const content = markdoc.transform(ast, pageConfig)
      const html = markdoc.renderers.html(content)

      return {
        code: html
      }
    }
  }
}

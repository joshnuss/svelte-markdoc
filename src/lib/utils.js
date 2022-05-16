import yaml from 'js-yaml'

export function addFrontmatter(ast, config) {
  const frontmatter = ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {}
  const markdoc = Object.assign(config?.variables?.markdoc || {}, { frontmatter })
  const variables = Object.assign(config?.variables || {}, { markdoc })
	return Object.assign(config, { variables })
}
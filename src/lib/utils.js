import yaml from 'js-yaml'

export function addFrontmatter(ast, config) {
  const frontmatter = ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {}
  const markdoc = { ...(config?.variables?.markdoc || {}), frontmatter }
  const variables = { ...(config?.variables || {}), markdoc }
  return {...config, variables };
}
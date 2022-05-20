import yaml from 'js-yaml'

/**
 * @param {import("@markdoc/markdoc").Node} ast 
 * @param {import("@markdoc/markdoc").Config} config 
 * @returns 
 */
export function addFrontmatter(ast, config) {
  const frontmatter = yaml.load(ast?.attributes?.frontmatter || "")
  const markdoc = { ...(config?.variables?.markdoc || {}), frontmatter }
  const variables = { ...(config?.variables || {}), markdoc }
  return {...config, variables };
}
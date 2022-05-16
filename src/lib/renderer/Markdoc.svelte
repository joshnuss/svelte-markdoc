<script>
  export let doc = ""
  export let config = {}
  export let components = new Map

  import Markdoc from "@markdoc/markdoc"
  import Tags from "./Tags.svelte"
  import { addFrontmatter } from "../utils.js"

  const ast = Markdoc.parse(doc)
  const configWithFrontmatter = addFrontmatter(ast, config)
  const content = Markdoc.transform(ast, configWithFrontmatter)
</script>

<Tags children={content.children} {components}></Tags>
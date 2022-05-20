<script>
  export let doc = ""
  export let config = {}
  export let components = new Map

  import Markdoc from "@markdoc/markdoc"
  import Tags from "./Tags.svelte"
  import { addFrontmatter } from "../utils.js"

  $: ast = Markdoc.parse(doc)
  $: configWithFrontmatter = addFrontmatter(ast, config)
  $: content = Markdoc.transform(ast, configWithFrontmatter)
  $: children = (content && typeof content != "string" && content.children) || []
</script>

<Tags {children} {components}></Tags>
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
</script>

<Tags children={content.children} {components}></Tags>
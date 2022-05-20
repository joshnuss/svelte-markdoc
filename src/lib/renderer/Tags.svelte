<script>
  /** @type {import("@markdoc/markdoc").RenderableTreeNode[]}*/
  export let children = []
  export let components = new Map
  // todo: throw error if tag is neither an html element or a component?
</script>

{#each children as child}
  {#if typeof child === "string"}{child}{/if}
  {#if child && typeof child != "string" && child.children}
    {#if components.has(child.name)}
      <svelte:component this={components.get(child.name)} {...child.attributes}>
        <svelte:self children={child.children} />
      </svelte:component>
    {:else}
      <svelte:element this={child.name} {...child.attributes}>
        <svelte:self children={child.children} />
      </svelte:element>
    {/if}
  {/if}
{/each}
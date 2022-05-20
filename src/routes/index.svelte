<script>
	import Markdoc from "$lib/index.js";
	import Callout from "$lib/site/Callout.svelte";

	const doc = `---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %} {% #overview %}

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

{% callout type="check" %}
Markdoc is open-source—check out its [source](http://github.com/markdoc/markdoc) to see how it works.
{% /callout %}

## How is Markdoc different?

Markdoc uses a fully declarative approach to composition and flow control, where other solutions… [Read more](/docs/overview).

## Next steps
- [Install Markdoc](/docs/getting-started)
- [Explore the syntax](/docs/syntax)
`;

	const config = {
		tags: {
			callout: {
				render: "Callout",
				description: "Display the enclosed content in a callout box",
				children: ["paragraph", "tag", "list"],
				attributes: {
					type: {
						type: String,
						default: "note",
						matches: ["check", "error", "note", "warning"]
					}
				}
			}
		}
	};

  const components = new Map([
    ["Callout", Callout]
  ])
</script>

<Markdoc {doc} {config} {components} />
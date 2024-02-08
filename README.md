<center>
    <h1>oftb-md</h1>
</center>
---

Out of the box MD is an improved MD that allows you to customize how should your MD processer work. Let see an example:

```js
// post.md
# Heading

%embed
%embed.header = Post
%embed.description = My own description
%embed.footer = My footer
%end

// index.js
document.body.innerHTML = mdFile("post.md", {
    embed: {
        main: "my embed classes", // Overwrite the default one
        header: "my embed header classes",
        // ...
    }
})
```

- [Installation](#installation)

## Installation

| Installation guide

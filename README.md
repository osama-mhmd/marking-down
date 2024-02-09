<center>
    <h1>marking-down</h1>
    Now you can customize
</center>


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

Installation Guide

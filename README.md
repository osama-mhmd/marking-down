<h1>
  <center>marking-down</center>
</h1>
<p>
  <center>Now you can customize</center>
</p>

`marking-down` is a library that enables you to customize and use components inside of your .md file. See this example:

```md
Hi! Here are my latest blogs :)

{
  ### How to success in life
  @@Some tips to success in life by Osama Mohammed...@@
}

{
  ### How to succeed in programming
  @@Some tips to success in programming by Osama Mohammed...@@
}
```

See the output live:

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)

## Installation

```bash
# using npm
npm install marking-down

# using yarn
yarn add marking-down

# using pnpm
pnpm add marking-down
```

## Quick Start

### React

In your react app, add these lines

```jsx
// page.tsx
import { mdFile } from "marking-down";
import * as path from "path";

export function Blog() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: mdFile(path.resolve(__dirname, "blog.md")),
      }}
    ></div>
  );
}
```

```md
--> blog.md

# Installation

- with [react](#react)
- with next.js
```

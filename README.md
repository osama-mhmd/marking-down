<center>
  <h1>marking-down</h1>
  <p>Now you can customize</p>
</center>

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

## Features

- **⚙ Fully configurable**: You can customize everything you want
- **📦 Lightweight**: The package is only
- **😍 Amazing default styles**: The default styles are very powerful.

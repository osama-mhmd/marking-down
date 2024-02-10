import { describe, expect, test } from "vitest";
import { md, mdFile } from "../src/index";
import * as path from "path";

describe("md()", () => {
  test("should return empty", () => {
    expect(md("")).toBe("");
  });

  test("should return empty for white spaces", () => {
    expect(md("\n \n\n\n\n\n")).toBe("");
  });

  test("should do headings", () => {
    expect(md("# Heading 1")).toBe('<h1 id="heading-1">Heading 1</h1><hr />');
  });

  test("should do headings with levels", () => {
    expect(md("### Heading 3")).toBe('<h3 id="heading-3">Heading 3</h3>');
  });

  test("should return normal text", () => {
    expect(md("My normal text")).toBe("My normal text");
  });

  test("should return heading and normal text", () => {
    expect(
      md(`
      ## Heading 2
      - Bullet 1
      - Bullet 2
    `)
    ).toBe(
      '<h2 id="heading-2">Heading 2</h2><hr /><ul><li>Bullet 1</li><li>Bullet 2</li></ul>'
    );
  });

  test("should do bullets", () => {
    expect(md("- Bullet")).toBe("<ul><li>Bullet</li></ul>");
  });

  test("should hyperlink", () => {
    expect(md("[Installation](#installation)")).toBe(
      "<a href='#installation'>Installation</a>"
    );
  });

  test("should hyperlink (another one)", () => {
    expect(md("- [Installation](#installation)")).toBe(
      "<ul><li><a href='#installation'>Installation</a></li></ul>"
    );
  });

  test("should hyperlink (another one)", () => {
    expect(
      md(`
    - [Installation](#installation)
    - [Guide](#guide)
    `)
    ).toBe(
      "<ul><li><a href='#installation'>Installation</a></li><li><a href='#guide'>Guide</a></li></ul>"
    );
  });

  test("should apply styles", () => {
    expect(
      md("# Heading", {
        styles: {
          heading: "big-heading text-2xl",
        },
      })
    ).toBe('<h1 id="heading" class="big-heading text-2xl">Heading</h1><hr />');
  });

  test("should apply mutliple styles", () => {
    expect(
      md("# Heading\n- Bullet", {
        styles: {
          heading: "big-heading text-2xl",
        },
      })
    ).toBe(
      '<h1 id="heading" class="big-heading text-2xl">Heading</h1><hr /><ul><li>Bullet</li></ul>'
    );
  });

  test("should generate card", () => {
    expect(
      md(`
      {
        ### Post
        Content
      }
    `)
    ).toBe('<div class="card"><h3 id="post">Post</h3>Content</div>');
  });

  test("should make a paragraph", () => {
    expect(md("@@My paragraph@@")).toBe('<p class="muted">My paragraph</p>');
  });

  test("should make a paragraph (another one)", () => {
    expect(md("@@My paragraph@@@@Another paragraph@@")).toBe(
      '<p class="muted">My paragraph</p><p class="muted">Another paragraph</p>'
    );
  });

  test("should make a paragraph (another one) +1", () => {
    expect(
      md(`
      @@My paragraph 
      can wrap@@`)
    ).toBe('<p class="muted">My paragraph can wrap</p>');
  });

  test("should make a full card", () => {
    expect(
      md(`
      {
        ### Heading
        @@
        Content
        @@
      }
    `)
    ).toBe(
      '<div class="card"><h3 id="heading">Heading</h3><p class="muted">Content</p></div>'
    );
  });

  test("shouldn't make a bullet", () => {
    expect(md("Osama Mohammed @ marking-down --- 2024")).toBe(
      "Osama Mohammed @ marking-down --- 2024"
    );
  });

  test("shouldn't make a heading", () => {
    expect(md("Osama Mohammed # marking-down --- 2024")).toBe(
      "Osama Mohammed # marking-down --- 2024"
    );
  });
});

describe("mdFile()", () => {
  test("should return md from a file", () => {
    expect(mdFile(path.resolve(__dirname, "index.spec.md"))).toBe(
      '<h1 id="installation">Installation</h1><hr /><ul><li>Bullet 1</li></ul>'
    );
  });

  test("should return md from a file (another one)", () => {
    expect(mdFile(path.resolve(__dirname, "index-2.spec.md"))).toBe(
      "<h1 id=\"my-library\">My library</h1><hr /><ul><li><a href='#config'>Config</a></li>" +
        "<li><a href='#quick-start'>Quick Start</a></li></ul><h2 id=\"config\">Config</h2><hr />" +
        '<div class="card"><h3 id="some-header">Some header</h3>Some body</div><h2 id="quick-start">Quick Start</h2><hr />'
    );
  });

  test("should return md from a file (another one) +1", () => {
    expect(mdFile(path.resolve(__dirname, "index-3.spec.md"))).toBe(
      '<div class="card"><h3 id="some-header-1">Some header 1</h3>Some body 1</div>' +
        '<div class="card"><h3 id="some-header-2">Some header 2</h3>Some body 2</div>'
    );
  });
});

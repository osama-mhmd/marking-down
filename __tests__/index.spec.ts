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
    expect(md("# Heading 1")).toBe("<h1>Heading 1</h1><hr />");
  });

  test("should do headings with levels", () => {
    expect(md("### Heading 3")).toBe("<h3>Heading 3</h3><hr />");
  });

  test("should return normal text", () => {
    expect(md("My normal text")).toBe("My normal text<br>");
  });

  test("should return heading and normal text", () => {
    expect(
      md(`
      ## Heading 2
      - Bullet 1
      - Bullet 2
    `)
    ).toBe(
      "<h2>Heading 2</h2><hr /><ul><li>Bullet 1</li><li>Bullet 2</li></ul>"
    );
  });

  test("should do bullets", () => {
    expect(md("- Bullet")).toBe("<ul><li>Bullet</li></ul>");
  });

  test("should hyperlink", () => {
    expect(md("[Installation](#installation)")).toBe(
      "<a href='#installation'>Installation</a><br>"
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
    ).toBe('<h1 class="big-heading text-2xl">Heading</h1><hr />');
  });

  test("should apply mutliple styles", () => {
    expect(
      md("# Heading\n- Bullet", {
        styles: {
          heading: "big-heading text-2xl",
        },
      })
    ).toBe(
      '<h1 class="big-heading text-2xl">Heading</h1><hr /><ul><li>Bullet</li></ul>'
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
    ).toBe('<div class="card"><h3>Post</h3><hr />Content</div>');
  });

  test("should make a paragraph", () => {
    expect(md("@@My paragraph@@")).toBe(
      '<p class="muted">My paragraph</p><br>'
    );
  });
});

describe("mdFile()", () => {
  test("should return md from a file", () => {
    expect(mdFile(path.resolve(__dirname, "index.spec.md"))).toBe(
      "<h1>Installation</h1><hr /><ul><li>Bullet 1</li></ul>"
    );
  });

  test("should return md from a file (another one)", () => {
    expect(mdFile(path.resolve(__dirname, "index-2.spec.md"))).toBe(
      "<h1>My library</h1><hr /><ul><li><a href='#config'>Config</a></li>" +
        "<li><a href='#quick-start'>Quick Start</a></li></ul><h2>Config</h2><hr />" +
        '<div class="card"><h3>Some header</h3><hr />Some body</div><h2>Quick Start</h2><hr />'
    );
  });

  test("should return md from a file (another one) +1", () => {
    expect(mdFile(path.resolve(__dirname, "index-3.spec.md"))).toBe(
      '<div class="card"><h3>Some header 1</h3><hr />Some body 1</div>' +
        '<div class="card"><h3>Some header 2</h3><hr />Some body 2</div>'
    );
  });
});

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
});

test("mdFile() should return md from a file", () => {
  expect(mdFile(path.resolve(__dirname, "index.spec.md"))).toBe(
    "<h1>Installation</h1><hr /><ul><li>Bullet 1</li></ul>"
  );
});

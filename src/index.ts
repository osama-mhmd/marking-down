import * as fs from "fs";
import Config from "./config.d";
import defaultConfig from "./config";

function isHeading(text: string) {
  return /\# (.*)/.test(text);
}
function head(text: string, styles: string | undefined) {
  const headingLevel = text.split(" ")[0].length;
  const innerHTML = /\# (.*)/.exec(text)![1];

  return style(
    `<h${headingLevel}>${innerHTML}</h${headingLevel}><hr />`,
    styles
  );
}
function style(el: string, styles: string | undefined) {
  return styles ? el.replace(">", ` class="${styles}">`) : el;
}
function isLi(text: string) {
  return /\- (.*)/.test(text);
}
function bullet(
  lines: string[],
  text: string,
  index: number,
  styles: string | undefined
) {
  const begining = isLi(lines[index - 1]) ? "" : "<ul>";
  const end = isLi(lines[index + 1]) ? "" : "</ul>";

  return (
    begining +
    style(`<li>${text.split(" ").slice(1).join(" ")}</li>`, styles) +
    end
  );
}

function md(text: string, config: Config = defaultConfig) {
  let closeOrOpen = 0;
  const lines = text
    .split("\n")
    .map((el) => el.trim())
    .filter((el) => el != "");

  return lines
    .map((el, index) => {
      el = el.replaceAll(
        /@@(.*)@@/g,
        style("<p>$1</p>", config.styles?.paragraph)
      );
      if (el.indexOf("@@") != -1) {
        el = el.replace(
          "@@",
          closeOrOpen % 2 ? "</p>" : style("<p>", config.styles?.paragraph)
        );
        closeOrOpen++;
      }
      if (isHeading(el)) return head(el, config.styles?.heading);
      if (isLi(el)) return bullet(lines, el, index, config.styles?.li);
      if (el == "{") return style("<div>", config.styles?.card);
      if (el == "}") return "</div>";
      if (lines[index + 1] == "}") return el;
      return el + "<br>";
    })
    .join("")
    .replaceAll(
      /\[(.*?)\]\((.*?)\)/g,
      style(`<a href='$2'>$1</a>`, config.styles?.hyperlink)
    ); // hyperlink()
}

function mdFile(path: string, config?: Config) {
  return md(fs.readFileSync(path, { encoding: "utf8" }), config);
}

export { md, mdFile };

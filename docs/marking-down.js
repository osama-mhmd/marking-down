const g = {
  styles: {
    heading: "",
    li: "",
    hyperlink: "",
    card: "card",
    paragraph: "muted",
  },
};
function y(t) {
  return /\# (.*)/.test(t);
}
function m(t, e) {
  const n = t.split(" ")[0].length,
    i = /\# (.*)/.exec(t)[1];
  return s(
    `<h${n} id="${i.toLowerCase().split(" ").join("-")}">${i}</h${n}>${
      n > 2 ? "" : "<hr />"
    }`,
    e
  );
}
function s(t, e) {
  return e ? t.replace(">", ` class="${e}">`) : t;
}
function l(t) {
  return /\- (.*)/.test(t);
}
function L(t, e, n, i) {
  const a = l(t[n - 1]) ? "" : "<ul>",
    r = l(t[n + 1]) ? "" : "</ul>";
  return a + s(`<li>${e.split(" ").slice(1).join(" ")}</li>`, i) + r;
}
function j(t, e = g) {
  var a;
  let n = 0;
  const i = t
    .split(
      `
`
    )
    .map((r) => r.trim())
    .filter((r) => r != "");
  return i
    .map((r, p) => {
      var u, c, d, o, f, h;
      if (r == "@@") {
        const $ =
          n % 2
            ? "</p>"
            : s("<p>", (u = e.styles) == null ? void 0 : u.paragraph);
        return n++, $;
      }
      return (
        (r = r.replaceAll(
          /@@(.*?)@@/g,
          s("<p>$1</p>", (c = e.styles) == null ? void 0 : c.paragraph)
        )),
        r.indexOf("@@") != -1 &&
          ((r = r.replace(
            "@@",
            n % 2
              ? "</p>"
              : s("<p>", (d = e.styles) == null ? void 0 : d.paragraph)
          )),
          n++),
        y(r)
          ? m(r, (o = e.styles) == null ? void 0 : o.heading)
          : l(r)
          ? L(i, r, p, (f = e.styles) == null ? void 0 : f.li)
          : r == "{"
          ? s("<div>", (h = e.styles) == null ? void 0 : h.card)
          : r == "}"
          ? "</div>"
          : i[p + 1] == "}"
          ? r
          : r + " "
      );
    })
    .join("")
    .trim()
    .replaceAll(
      /\[(.*?)\]\((.*?)\)/g,
      s("<a href='$2'>$1</a>", (a = e.styles) == null ? void 0 : a.hyperlink)
    )
    .replaceAll(/>(.*?) ?</g, ">$1<");
}
function v(t, e) {
  return j((void 0)(t, { encoding: "utf8" }), e);
}
export { j as md, v as mdFile };

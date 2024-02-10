const y = {
  styles: {
    heading: "",
    li: "",
    hyperlink: "",
    card: "card",
    paragraph: "muted",
  },
};
function $(t) {
  return /\# (.*)/.test(t);
}
function m(t, n) {
  const e = t.split(" ")[0].length,
    i = /\# (.*)/.exec(t)[1];
  return s(`<h${e}>${i}</h${e}>${e > 2 ? "" : "<hr />"}`, n);
}
function s(t, n) {
  return n ? t.replace(">", ` class="${n}">`) : t;
}
function u(t) {
  return /\- (.*)/.test(t);
}
function v(t, n, e, i) {
  const a = u(t[e - 1]) ? "" : "<ul>",
    r = u(t[e + 1]) ? "" : "</ul>";
  return a + s(`<li>${n.split(" ").slice(1).join(" ")}</li>`, i) + r;
}
function A(t, n = y) {
  var a;
  let e = 0;
  const i = t
    .split(
      `
`
    )
    .map((r) => r.trim())
    .filter((r) => r != "");
  return i
    .map((r, l) => {
      var p, c, d, f, h, o;
      if (r == "@@") {
        const g =
          e % 2
            ? "</p>"
            : s("<p>", (p = n.styles) == null ? void 0 : p.paragraph);
        return e++, g;
      }
      return (
        (r = r.replaceAll(
          /@@(.*?)@@/g,
          s("<p>$1</p>", (c = n.styles) == null ? void 0 : c.paragraph)
        )),
        r.indexOf("@@") != -1 &&
          ((r = r.replace(
            "@@",
            e % 2
              ? "</p>"
              : s("<p>", (d = n.styles) == null ? void 0 : d.paragraph)
          )),
          e++),
        $(r)
          ? m(r, (f = n.styles) == null ? void 0 : f.heading)
          : u(r)
          ? v(i, r, l, (h = n.styles) == null ? void 0 : h.li)
          : r == "{"
          ? s("<div>", (o = n.styles) == null ? void 0 : o.card)
          : r == "}"
          ? "</div>"
          : i[l + 1] == "}"
          ? r
          : r + " "
      );
    })
    .join("")
    .trim()
    .replaceAll(
      /\[(.*?)\]\((.*?)\)/g,
      s("<a href='$2'>$1</a>", (a = n.styles) == null ? void 0 : a.hyperlink)
    )
    .replaceAll(/>(.*?) ?</g, ">$1<");
}
function L(t, n) {
  return A((void 0)(t, { encoding: "utf8" }), n);
}
export { A as md, L as mdFile };

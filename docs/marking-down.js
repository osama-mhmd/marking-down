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
  return /^#+ (.*)$/.test(t);
}
function m(t, n) {
  const e = t.split(" ")[0].length,
    i = /\# (.*)/.exec(t)[1];
  return s(
    `<h${e} id="${i.toLowerCase().split(" ").join("-")}">${i}</h${e}>${
      e > 2 ? "" : "<hr />"
    }`,
    n
  );
}
function s(t, n) {
  return n ? t.replace(">", ` class="${n}">`) : t;
}
function u(t) {
  return /^\- (.*)$/.test(t);
}
function L(t, n, e, i) {
  const a = u(t[e - 1]) ? "" : "<ul>",
    r = u(t[e + 1]) ? "" : "</ul>";
  return a + s(`<li>${n.split(" ").slice(1).join(" ")}</li>`, i) + r;
}
function j(t, n = g) {
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
    .map((r, p) => {
      var l, c, d, o, f, h;
      if (r == "@@") {
        const $ =
          e % 2
            ? "</p>"
            : s("<p>", (l = n.styles) == null ? void 0 : l.paragraph);
        return e++, $;
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
        y(r)
          ? m(r, (o = n.styles) == null ? void 0 : o.heading)
          : u(r)
          ? L(i, r, p, (f = n.styles) == null ? void 0 : f.li)
          : r == "{"
          ? s("<div>", (h = n.styles) == null ? void 0 : h.card)
          : r == "}"
          ? "</div>"
          : i[p + 1] == "}"
          ? r
          : r == "---"
          ? "<hr />"
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
function v(t, n) {
  return j((void 0)(t, { encoding: "utf8" }), n);
}
export { j as md, v as mdFile };

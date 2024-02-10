import { md } from "./marking-down.js";

document.querySelector(".container").innerHTML = md(
  document.querySelector(".container").innerHTML
);

import { md } from "./marking-down.js";

const markdown = `
  # marking-down

  The website is made by marking-down

  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Examples](#examples)

  ## Installation

  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis
  velit iure ea sunt repudiandae sapiente, reprehenderit voluptatibus. Optio
  voluptatibus, aperiam praesentium fugit consequuntur tempore quam
  repudiandae corporis obcaecati odit.

  ## Quick Start

  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis
  velit iure ea sunt repudiandae sapiente, reprehenderit voluptatibus. Optio
  voluptatibus, aperiam praesentium fugit consequuntur tempore quam
  repudiandae corporis obcaecati odit.

  ## Examples

  ### Example 1

  <div class="card-container">
  Hi! Here are my latest blogs :)

  {
    ### How to succeed in life
    @@Some tips to succeed in life by Osama Mohammed...@@
  }

  {
    ### How to succeed in programming
    @@Some tips to succeed in programming by Osama Mohammed...@@
  }
  </div>
`;

document.querySelector(".container").innerHTML = md(markdown);

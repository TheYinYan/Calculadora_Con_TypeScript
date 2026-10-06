import { Calculadora } from "./Calculadora.js";
import {Time} from "./Time.js";

const contenedorCal = document.querySelector(".calculadoras-container")!;
let contador = 0;

function crearCalculadora(): void {
  const id = `calc-${contador++}`;

  const divCal = document.createElement("div");
  divCal.innerHTML = `<h2>Calculadora ${contador}</h2>
                       <div class="calculadora" id="${id}"></div>`;
  contenedorCal.appendChild(divCal);

  new Calculadora(`#${id}`);
}
document.addEventListener("DOMContentLoaded", () => {
  crearCalculadora();

  document.querySelector("#add-calc")?.addEventListener("click", crearCalculadora);
});

new Time(".tiempo-container");
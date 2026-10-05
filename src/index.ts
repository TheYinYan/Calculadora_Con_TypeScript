import { Calculadora } from "./Calculadora.js";

const contenedor = document.querySelector(".calculadoras-container")!;
let contador = 0;

function crearCalculadora(): void {
  const id = `calc-${contador++}`;

  const divCal = document.createElement("div");
  divCal.innerHTML = `<h2>Calculadora ${contador}</h2>
                       <div class="calculadora" id="${id}"></div>`;
  contenedor.appendChild(divCal);

  new Calculadora(`#${id}`);
}

document.addEventListener("DOMContentLoaded", () => {
  crearCalculadora();

  document.querySelector("#add-calc")?.addEventListener("click", crearCalculadora);
});
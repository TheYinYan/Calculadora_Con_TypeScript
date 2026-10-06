import { interval} from 'rxjs'; 
import { Calculadora } from "./Calculadora.js";
import {Time} from "./Time.js";

const contenedorCal = document.querySelector(".calculadoras-container")!;
const contenedorTiempo = document.querySelector(".tiempo-container")!;
let contador = 0;
let time = interval(1000);

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

const subscription = time.subscribe((value) => {console.log(value);});

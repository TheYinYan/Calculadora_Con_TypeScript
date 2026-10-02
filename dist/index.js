"use strict";
// ─── Estado de la calculadora ──────────────────────────
let valorAct = "0";
let valorAnt = null;
let operadorAct = null;
let resultadoMostrado = false;
let puntodecimal = true;
// ─── Eventos ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const Calculadora = document.querySelector(".calculadora");
    imprimirCalculadora();
    imprimirCalculadora();
    // ─── Referencias al DOM ────────────────────────────────
    const botonesNumeros = [...document.querySelectorAll(".numero")];
    const botonesOperador = [...document.querySelectorAll(".operador")];
    const pantalla = document.querySelector("#panel");
    const botonIgual = document.querySelector("#igual");
    const botonDecimal = document.querySelector("#decimal");
    const borrarEntradas = document.querySelector("#borrar-entrada");
    const borrarTodos = document.querySelector("#borrar-todo");
    const eliminar = document.querySelector("#retroceder");
    botonesNumeros.forEach(boton => {
        boton.addEventListener("click", () => {
            mostrarNumeroPantalla(boton.textContent ?? "0");
        });
    });
    botonesOperador.forEach(boton => {
        boton.addEventListener("click", () => {
            manejarOperador(boton.textContent ?? "+");
        });
    });
    botonIgual.addEventListener("click", calcularOperacion);
    eliminar.addEventListener("click", retroceder);
    botonDecimal.addEventListener("click", mostrarPuntoPantalla);
    borrarEntradas.addEventListener("click", borrarEntrada);
    borrarTodos.addEventListener("click", borrarTodo);
    // ─── Funciones ─────────────────────────────────────────
    function imprimirCalculadora() {
        Calculadora.innerHTML = ` <div class="panel" id="panel">0</div>

    <div class="botonera">

      <button class="boton control" id="borrar-todo">C</button>
      <button class="boton control" id="borrar-entrada">CE</button>
      <button class="boton control" id="retroceder">←</button>
      <button class="boton operador">/</button>

      <button class="boton numero">7</button>
      <button class="boton numero">8</button>
      <button class="boton numero">9</button>
      <button class="boton operador">x</button>

      <button class="boton numero">4</button>
      <button class="boton numero">5</button>
      <button class="boton numero">6</button>
      <button class="boton operador">-</button>

      <button class="boton numero">1</button>
      <button class="boton numero">2</button>
      <button class="boton numero">3</button>
      <button class="boton operador">+</button>

       <button class="boton numero">0</button>
      <button class="boton" id="decimal">.</button>
      <button class="boton igual" id="igual">=</button>

    </div>`;
    }
    function actualizarPantalla() {
        while (valorAct.length > 12) {
            valorAct = valorAct.slice(0, -1);
        }
        if (valorAct.includes(".")) {
            botonDecimal.classList.add("deshabilitado");
            puntodecimal = false;
        }
        else {
            botonDecimal.classList.remove("deshabilitado");
            puntodecimal = true;
        }
        pantalla.textContent = valorAct;
    }
    function mostrarNumeroPantalla(num) {
        if (resultadoMostrado) {
            valorAct = num;
            resultadoMostrado = false;
            operadorAct = null;
            valorAnt = null;
        }
        else if (valorAct === "0") {
            valorAct = num;
        }
        else {
            valorAct += num;
        }
        actualizarPantalla();
    }
    function mostrarPuntoPantalla() {
        if (!puntodecimal)
            return;
        valorAct += ".";
        actualizarPantalla();
    }
    function retroceder() {
        valorAct = valorAct.slice(0, -1);
        if (valorAct === "") {
            valorAct = "0";
        }
        actualizarPantalla();
    }
    function borrarEntrada() {
        valorAct = "0";
        actualizarPantalla();
    }
    function borrarTodo() {
        valorAct = "0";
        valorAnt = null;
        operadorAct = null;
        resultadoMostrado = false;
        actualizarPantalla();
    }
    function manejarOperador(operador) {
        if (operadorAct !== null && valorAnt !== null && !resultadoMostrado) {
            calcularOperacion();
        }
        valorAnt = valorAct;
        operadorAct = operador;
        valorAct = "0";
        resultadoMostrado = false;
        actualizarPantalla();
    }
    function calcularOperacion() {
        if (operadorAct === null || valorAnt === null)
            return;
        const num1 = parseFloat(valorAnt);
        const num2 = parseFloat(valorAct);
        let resultado = 0;
        switch (operadorAct) {
            case "+":
                resultado = num1 + num2;
                break;
            case "-":
                resultado = num1 - num2;
                break;
            case "x":
            case "*":
                resultado = num1 * num2;
                break;
            case "/":
                if (num2 === 0) {
                    valorAct = "Error";
                    operadorAct = null;
                    valorAnt = null;
                    resultadoMostrado = true;
                    pantalla.textContent = valorAct;
                    return;
                }
                resultado = num1 / num2;
                break;
            default:
                return;
        }
        valorAct = String(redondear(resultado));
        resultadoMostrado = true;
        operadorAct = null;
        valorAnt = null;
        actualizarPantalla();
    }
    function redondear(n, decimales = 10) {
        return Number(n.toFixed(decimales));
    }
});

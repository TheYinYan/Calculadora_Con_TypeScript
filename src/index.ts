// ─── Estado de la calculadora ──────────────────────────
let valorAct: string = "0";
let valorAnt: string | null = null;
let operadorAct: string | null = null;
let resultadoMostrado: boolean = false;
let puntodecimal: boolean = true;

// ─── Referencias al DOM ────────────────────────────────
const botonesNumeros = [...document.querySelectorAll<HTMLButtonElement>(".numero")];
const botonesOperador = [...document.querySelectorAll<HTMLButtonElement>(".operador")];

const pantalla = document.querySelector<HTMLDivElement>("#panel")!;
const botonIgual = document.querySelector<HTMLButtonElement>("#igual")!;
const botonDecimal = document.querySelector<HTMLButtonElement>("#decimal")!;
const borrarEntradas = document.querySelector<HTMLButtonElement>("#borrar-entrada")!;
const borrarTodos = document.querySelector<HTMLButtonElement>("#borrar-todo")!;
const eliminar = document.querySelector<HTMLButtonElement>("#retroceder")!;

// ─── Eventos ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
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
});

// ─── Funciones ─────────────────────────────────────────
function actualizarPantalla(): void {
    while (valorAct.length > 12) {
        valorAct = valorAct.slice(0, -1);
    }

    if (valorAct.includes(".")) {
        botonDecimal.classList.add("deshabilitado");
        puntodecimal = false;
    } else {
        botonDecimal.classList.remove("deshabilitado");
        puntodecimal = true;
    }

    pantalla.textContent = valorAct;
}

function mostrarNumeroPantalla(num: string): void {
    if (resultadoMostrado) {
        valorAct = num;
        resultadoMostrado = false;
        operadorAct = null;
        valorAnt = null;
    } else if (valorAct === "0") {
        valorAct = num;
    } else {
        valorAct += num;
    }

    actualizarPantalla();
}

function mostrarPuntoPantalla(): void {
    if (!puntodecimal) return;
    valorAct += ".";
    actualizarPantalla();
}

function retroceder(): void {
    valorAct = valorAct.slice(0, -1);

    if (valorAct === "") {
        valorAct = "0";
    }

    actualizarPantalla();
}

function borrarEntrada(): void {
    valorAct = "0";
    actualizarPantalla();
}

function borrarTodo(): void {
    valorAct = "0";
    valorAnt = null;
    operadorAct = null;
    resultadoMostrado = false;
    actualizarPantalla();
}

function manejarOperador(operador: string): void {
    if (operadorAct !== null && valorAnt !== null && !resultadoMostrado) {
        calcularOperacion();
    }

    valorAnt = valorAct;
    operadorAct = operador;
    valorAct = "0";
    resultadoMostrado = false;

    actualizarPantalla();
}

function calcularOperacion(): void {
    if (operadorAct === null || valorAnt === null) return;

    const num1 = parseFloat(valorAnt);
    const num2 = parseFloat(valorAct);
    let resultado: number = 0;

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

function redondear(n: number, decimales: number = 10): number {
    return Number(n.toFixed(decimales));
}
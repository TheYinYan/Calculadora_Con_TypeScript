export class Calculadora {
    // ─── Estado (propiedades) ────────────────────────────
    valorAct = "0";
    valorAnt = null;
    operadorAct = null;
    resultadoMostrado = false;
    puntodecimal = true;
    // ─── Referencias al DOM ──────────────────────────────
    calculadora;
    pantalla;
    botonesNumeros;
    botonesOperador;
    botonIgual;
    botonDecimal;
    borrarEntradas;
    borrarTodos;
    eliminar;
    constructor(selector) {
        this.calculadora = document.querySelector(selector);
        this.imprimirCalculadora();
        this.cachearElementos();
        this.asignarEventos();
    }
    imprimirCalculadora() {
        this.calculadora.innerHTML = `
      <div class="panel" id="panel">0</div>
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
    cachearElementos() {
        this.pantalla = this.calculadora.querySelector("#panel");
        this.botonesNumeros = [...this.calculadora.querySelectorAll(".numero")];
        this.botonesOperador = [...this.calculadora.querySelectorAll(".operador")];
        this.botonIgual = this.calculadora.querySelector("#igual");
        this.botonDecimal = this.calculadora.querySelector("#decimal");
        this.borrarEntradas = this.calculadora.querySelector("#borrar-entrada");
        this.borrarTodos = this.calculadora.querySelector("#borrar-todo");
        this.eliminar = this.calculadora.querySelector("#retroceder");
    }
    // ─── Asignación de eventos ───────────────────────────
    asignarEventos() {
        this.botonesNumeros.forEach((boton) => {
            boton.addEventListener("click", () => this.mostrarNumeroPantalla(boton.textContent ?? "0"));
        });
        this.botonesOperador.forEach((boton) => {
            boton.addEventListener("click", () => this.manejarOperador(boton.textContent ?? "+"));
        });
        this.botonIgual.addEventListener("click", () => this.calcularOperacion());
        this.eliminar.addEventListener("click", () => this.retroceder());
        this.botonDecimal.addEventListener("click", () => this.mostrarPuntoPantalla());
        this.borrarEntradas.addEventListener("click", () => this.borrarEntrada());
        this.borrarTodos.addEventListener("click", () => this.borrarTodo());
    }
    // ─── Funciones ───────────────────────
    actualizarPantalla() {
        while (this.valorAct.length > 12) {
            this.valorAct = this.valorAct.slice(0, -1);
        }
        if (this.valorAct.includes(".")) {
            this.botonDecimal.classList.add("deshabilitado");
            this.puntodecimal = false;
        }
        else {
            this.botonDecimal.classList.remove("deshabilitado");
            this.puntodecimal = true;
        }
        this.pantalla.textContent = this.valorAct;
    }
    mostrarNumeroPantalla(num) {
        if (this.resultadoMostrado) {
            this.valorAct = num;
            this.resultadoMostrado = false;
            this.operadorAct = null;
            this.valorAnt = null;
        }
        else if (this.valorAct === "0") {
            this.valorAct = num;
        }
        else {
            this.valorAct += num;
        }
        this.actualizarPantalla();
    }
    mostrarPuntoPantalla() {
        if (!this.puntodecimal)
            return;
        this.valorAct += ".";
        this.actualizarPantalla();
    }
    retroceder() {
        this.valorAct = this.valorAct.slice(0, -1);
        if (this.valorAct === "")
            this.valorAct = "0";
        this.actualizarPantalla();
    }
    borrarEntrada() {
        this.valorAct = "0";
        this.actualizarPantalla();
    }
    borrarTodo() {
        this.valorAct = "0";
        this.valorAnt = null;
        this.operadorAct = null;
        this.resultadoMostrado = false;
        this.actualizarPantalla();
    }
    manejarOperador(operador) {
        if (this.operadorAct !== null && this.valorAnt !== null && !this.resultadoMostrado) {
            this.calcularOperacion();
        }
        this.valorAnt = this.valorAct;
        this.operadorAct = operador;
        this.valorAct = "0";
        this.resultadoMostrado = false;
        this.actualizarPantalla();
    }
    calcularOperacion() {
        if (this.operadorAct === null || this.valorAnt === null)
            return;
        const num1 = parseFloat(this.valorAnt);
        const num2 = parseFloat(this.valorAct);
        let resultado = 0;
        switch (this.operadorAct) {
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
                    this.valorAct = "Error";
                    this.operadorAct = null;
                    this.valorAnt = null;
                    this.resultadoMostrado = true;
                    this.pantalla.textContent = this.valorAct;
                    return;
                }
                resultado = num1 / num2;
                break;
            default:
                return;
        }
        this.valorAct = String(this.redondear(resultado));
        this.resultadoMostrado = true;
        this.operadorAct = null;
        this.valorAnt = null;
        this.actualizarPantalla();
    }
    redondear(n, decimales = 10) {
        return Number(n.toFixed(decimales));
    }
}

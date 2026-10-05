export class Calculadora {
  // ─── Estado (propiedades) ────────────────────────────
  private valorAct: string = "0";
  private valorAnt: string | null = null;
  private operadorAct: string | null = null;
  private resultadoMostrado: boolean = false;
  private puntodecimal: boolean = true;

  // ─── Referencias al DOM ──────────────────────────────
  private calculadora: HTMLDivElement;
  private pantalla!: HTMLDivElement;
  private botonesNumeros!: HTMLButtonElement[];
  private botonesOperador!: HTMLButtonElement[];
  private botonIgual!: HTMLButtonElement;
  private botonDecimal!: HTMLButtonElement;
  private borrarEntradas!: HTMLButtonElement;
  private borrarTodos!: HTMLButtonElement;
  private eliminar!: HTMLButtonElement;

  constructor(selector: string) {
    this.calculadora = document.querySelector<HTMLDivElement>(selector)!;
    this.imprimirCalculadora();
    this.cachearElementos();
    this.asignarEventos();
  }

  private imprimirCalculadora(): void {
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

  private cachearElementos(): void {
    this.pantalla = this.calculadora.querySelector<HTMLDivElement>("#panel")!;
    this.botonesNumeros = [...this.calculadora.querySelectorAll<HTMLButtonElement>(".numero")];
    this.botonesOperador = [...this.calculadora.querySelectorAll<HTMLButtonElement>(".operador")];
    this.botonIgual = this.calculadora.querySelector<HTMLButtonElement>("#igual")!;
    this.botonDecimal = this.calculadora.querySelector<HTMLButtonElement>("#decimal")!;
    this.borrarEntradas = this.calculadora.querySelector<HTMLButtonElement>("#borrar-entrada")!;
    this.borrarTodos = this.calculadora.querySelector<HTMLButtonElement>("#borrar-todo")!;
    this.eliminar = this.calculadora.querySelector<HTMLButtonElement>("#retroceder")!;
  }

  // ─── Asignación de eventos ───────────────────────────
  private asignarEventos(): void {
    this.botonesNumeros.forEach((boton) => {
      boton.addEventListener("click", () =>
        this.mostrarNumeroPantalla(boton.textContent ?? "0")
      );
    });

    this.botonesOperador.forEach((boton) => {
      boton.addEventListener("click", () =>
        this.manejarOperador(boton.textContent ?? "+")
      );
    });

    this.botonIgual.addEventListener("click", () => this.calcularOperacion());
    this.eliminar.addEventListener("click", () => this.retroceder());
    this.botonDecimal.addEventListener("click", () => this.mostrarPuntoPantalla());
    this.borrarEntradas.addEventListener("click", () => this.borrarEntrada());
    this.borrarTodos.addEventListener("click", () => this.borrarTodo());
  }

  // ─── Funciones ───────────────────────
  private actualizarPantalla(): void {
    while (this.valorAct.length > 12) {
      this.valorAct = this.valorAct.slice(0, -1);
    }

    if (this.valorAct.includes(".")) {
      this.botonDecimal.classList.add("deshabilitado");
      this.puntodecimal = false;
    } else {
      this.botonDecimal.classList.remove("deshabilitado");
      this.puntodecimal = true;
    }

    this.pantalla.textContent = this.valorAct;
  }

  private mostrarNumeroPantalla(num: string): void {
    if (this.resultadoMostrado) {
      this.valorAct = num;
      this.resultadoMostrado = false;
      this.operadorAct = null;
      this.valorAnt = null;
    } else if (this.valorAct === "0") {
      this.valorAct = num;
    } else {
      this.valorAct += num;
    }

    this.actualizarPantalla();
  }

  private mostrarPuntoPantalla(): void {
    if (!this.puntodecimal) return;
    this.valorAct += ".";
    this.actualizarPantalla();
  }

  private retroceder(): void {
    this.valorAct = this.valorAct.slice(0, -1);
    if (this.valorAct === "") this.valorAct = "0";
    this.actualizarPantalla();
  }

  private borrarEntrada(): void {
    this.valorAct = "0";
    this.actualizarPantalla();
  }

  private borrarTodo(): void {
    this.valorAct = "0";
    this.valorAnt = null;
    this.operadorAct = null;
    this.resultadoMostrado = false;
    this.actualizarPantalla();
  }

  private manejarOperador(operador: string): void {
    if (this.operadorAct !== null && this.valorAnt !== null && !this.resultadoMostrado) {
      this.calcularOperacion();
    }

    this.valorAnt = this.valorAct;
    this.operadorAct = operador;
    this.valorAct = "0";
    this.resultadoMostrado = false;

    this.actualizarPantalla();
  }

  private calcularOperacion(): void {
    if (this.operadorAct === null || this.valorAnt === null) return;

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

  private redondear(n: number, decimales: number = 10): number {
    return Number(n.toFixed(decimales));
  }
}
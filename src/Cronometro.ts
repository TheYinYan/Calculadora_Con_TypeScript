import { fromEvent, interval, Subscription } from "rxjs";

export class Cronometro {
  private cronometro: HTMLDivElement;
  private panel!: HTMLDivElement;
  private playBtn!: HTMLButtonElement;
  private detenerBtn!: HTMLButtonElement;
  private reiniciarBtn!: HTMLButtonElement;

  private tiempo = 0;
  private suscripcion?: Subscription;

  constructor(div: string) {
    this.cronometro = document.querySelector<HTMLDivElement>(div)!;
    this.imprimirCronometro();
    this.cachearElementos();
    this.asignarEventos();
  }

  private imprimirCronometro(): void {
    this.cronometro.innerHTML = `
            <h1>Cronómetro</h1>
            <div class="panel">00:00:00.00</div>
            <div class="botonera">
                <button class="boton iniciar">Play</button>
                <button class="boton detener">Detener</button>
                <button class="boton reiniciar">Reiniciar</button>
            </div>`;
  }

  private cachearElementos(): void {
    this.panel = this.cronometro.querySelector<HTMLDivElement>(".panel")!;
    this.playBtn = this.cronometro.querySelector<HTMLButtonElement>(".iniciar")!;
    this.detenerBtn = this.cronometro.querySelector<HTMLButtonElement>(".detener")!;
    this.reiniciarBtn = this.cronometro.querySelector<HTMLButtonElement>(".reiniciar")!;
  }

  private asignarEventos(): void {
    fromEvent(this.playBtn, "click").subscribe(() => {
      this.iniciarCronometro();
    });

    fromEvent(this.detenerBtn, "click").subscribe(() => {
      this.detenerCronometro();
    });

    fromEvent(this.reiniciarBtn, "click").subscribe(() => {
      this.reiniciarCronometro();
    });
  }

  private iniciarCronometro(): void {
    if (this.suscripcion) return;
    let oldTiempo = new Date().getTime();
    this.suscripcion = interval(1).subscribe(() => {
      let newTiempo = new Date().getTime();
      this.tiempo += newTiempo - oldTiempo;
      oldTiempo = newTiempo;
      this.mostrarTiempo();
    });
  }

  private detenerCronometro(): void {
    this.suscripcion?.unsubscribe();
    this.suscripcion = undefined;
  }

  private reiniciarCronometro(): void {
    this.detenerCronometro();
    this.tiempo = 0;
    this.mostrarTiempo();
  }

  private mostrarTiempo(): void {
    const centesimas = Math.floor(this.tiempo / 10) % 100;
    const segundos = Math.floor(this.tiempo / 1000) % 60;
    const minutos = Math.floor(this.tiempo / 60000) % 60;
    const horas = Math.floor(this.tiempo / 3600000);

    this.panel.textContent =
      `${String(horas).padStart(2, "0")}:` +
      `${String(minutos).padStart(2, "0")}:` +
      `${String(segundos).padStart(2, "0")}.` +
      `${String(centesimas).padStart(2, "0")}`;
  }
}

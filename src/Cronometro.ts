
export class Cronometro {
    private cronometro: HTMLDivElement;
    private panel!: HTMLDivElement;
    private playBtn!: HTMLButtonElement;
    private detenerBtn!: HTMLButtonElement;
    private reiniciarBtn!: HTMLButtonElement;

    constructor(div: string) {
        this.cronometro = document.querySelector<HTMLDivElement>(div)!;
        this.imprimirCronometro();
        this.cachearElementos();
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
        this.panel = this.cronometro.querySelector<HTMLDivElement>('.panel')!;
        this.playBtn = this.cronometro.querySelector<HTMLButtonElement>('.iniciar')!;
        this.detenerBtn = this.cronometro.querySelector<HTMLButtonElement>('.detener')!;
        this.reiniciarBtn = this.cronometro.querySelector<HTMLButtonElement>('.reiniciar')!;
    }

    

}
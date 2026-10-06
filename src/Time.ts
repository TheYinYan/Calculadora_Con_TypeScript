import { interval, Observable, map } from 'rxjs';
export class Time {
    private Time: HTMLDivElement;

    constructor(div: string) {
        this.Time = document.querySelector<HTMLDivElement>(div)!;
        this.imprimirTime();
    }
    private imprimirTime(): void {
        this.observableTime().subscribe(value => {
            this.Time.innerHTML = `<h1>La hora actual: ${value}</h1>`
        });
    }

    private observableTime(): Observable<string> {
        return interval(1000).pipe(
            map(() => {
                const fecha = new Date();
                return `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
            })
        )
    }
}
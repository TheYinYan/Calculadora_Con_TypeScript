import { interval, Observable, map } from 'rxjs';
export class Time {
    private Time: HTMLDivElement;

    constructor(div: string) {
        this.Time = document.querySelector<HTMLDivElement>(div)!;
        this.imprimirTime();
    }

    private imprimirTime(): void {
        this.observableTime().subscribe(value => {
            this.Time.textContent = value
        })
    }
    
    private observableTime(): Observable<string> {
        return interval(1000).pipe(
            map(() => {
                const fecha = new Date;
                const hh = fecha.getHours();
                const mm = fecha.getMinutes();
                const ss = fecha.getSeconds();
                return `${hh}:${mm}:${ss}`
            })
        )
    }
}
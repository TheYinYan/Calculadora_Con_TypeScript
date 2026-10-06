import { interval, Observable  } from 'rxjs'; 
export class Time {
    private time = interval(1000);
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'Hace mucho tiempo';
    }

    let valueSplit = value.split(' ');
    let dateItem = valueSplit[0];
    let hourItem = valueSplit[1];

    let date = dateItem.split('/');
    let hour = hourItem.split(':');

    const newDate = new Date(
      Date.UTC(
        Number(date[2]),
        Number(date[1]),
        Number(date[0]),
        Number(hour[0]),
        Number(hour[1]),
        Number(hour[2])
      )
    ).getTime();

    let time = (Date.now() - newDate) / 1000;
    if (time < 10) {
      return 'Justo ahora';
    } else if (time < 60) {
      return 'Hace un momento';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' segundo', ' minuto', ' hora', ' día', ' mes', ' año'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return 'Hace ' + Math.floor(time) + string[i] + plural;
  }
}

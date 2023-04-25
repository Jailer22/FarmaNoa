import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefjMoneda'
})
export class PrefjMonedaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

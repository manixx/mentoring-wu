import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectOrder'
})
export class ObjectOrderPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.sort((a, b) => {
      return b.value - a.value
    });
  }

}

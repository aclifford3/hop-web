import { Pipe, PipeTransform } from '@angular/core';
import {Reservation} from './hop-api.service';

@Pipe({
  name: 'propertyName'
})
export class PropertyNamePipe implements PipeTransform {

  transform(reservations: Reservation[], propertyName: string): any {
    if (propertyName === undefined || propertyName === 'All') {
      return reservations;
    }
    return reservations.filter(reservation => reservation.propertyName === propertyName);
  }

}

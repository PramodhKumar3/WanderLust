import { Pipe, PipeTransform } from '@angular/core';
import { Destination } from '../models/Package';

@Pipe({
  name: 'packages'
})
export class PackagePricePipe implements PipeTransform {
  /**
   * Sorts packages by price (low to high)
   * @param destinations Array of destinations to sort
   * @returns Sorted array of destinations by price
   */
  transform(destinations: Destination[]): Destination[] {
    if (!destinations || destinations.length === 0) {
      return [];
    }
    
    return [...destinations].sort((a: Destination, b: Destination) => {
      return a.chargePerPerson - b.chargePerPerson;
    });
  }
}
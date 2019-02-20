import {    Pipe,
            PipeTransform   } from '@angular/core';

import { Car } from '../model/car';

export function searchFilter (value: Car, filter: string): boolean {
    if (!filter || filter.length == 0) return true;
    if (!value) return false;
    return  (   (value.year.toString()).indexOf(filter) !== -1 ||
                value.manufacturer.indexOf(filter) !== -1 ||
                value.model.indexOf(filter) !== -1
            );
}

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: Car[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(
        	item => (  searchFilter(item, filter)  )
        );
    }
}
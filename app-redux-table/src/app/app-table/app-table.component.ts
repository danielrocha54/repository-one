import {	Component,
			OnInit,
			OnChanges,
			Input,
			SimpleChanges,
			EventEmitter,
			Output,
			QueryList,
			ViewChildren	} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs/operators';

import { NgbdSortableHeader, SortDirection, SortEvent, rotate } from './app-table-sort.directive';
import { searchFilter } from './app-table-filter.pipe';
import { Car } from '../model/car';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
  providers: [DecimalPipe]
})
export class AppTableComponent implements OnInit {

	private strFilter: string;

	private page = 1;
	private pageSize = 20;
	private collectionSize: number;

	@Input() data: Array<Car>;
	@Output() appDataLoaded: EventEmitter<any> = new EventEmitter();
	@Output() sortAppData: EventEmitter<SortEvent> = new EventEmitter();

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.data) {
			this.collectionSize = (changes.data.currentValue)? changes.data.currentValue.length : 0;
		}
	}

	onSort({column, direction}: SortEvent) {
		if (direction == '') {
			this.sortAppData.emit({'column': 'internalId', 'direction': 'asc'});
		} else {
			this.sortAppData.emit({'column': column, 'direction': direction});
		}
	}

	onSearchChange(searchValue : string ) {
		this.strFilter = searchValue;
	}

	get dataRows(): Car[] {
		let result: Car[];
		result = (!this.data)? null : this.data
			.map((car: Car, i) => {
					if (searchFilter(car, this.strFilter)) {
						return car;
					}
				}
			).filter(element => element !== undefined);
		this.collectionSize = (!this.data)? 0 : (this.strFilter)? result.length : this.data.length;
		return (result)? result.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize) : result;
	}

}

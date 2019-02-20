import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import * as appActions from "../../store/actions/data.actions";
import * as fromAppData from "../../store/reducers/data.reducer";
import * as fromStore from "../../store";
import { Car } from "../model/car";

@Component({
  selector: 'app-app-main-page',
  templateUrl: './app-main-page.component.html',
  styleUrls: ['./app-main-page.component.css']
})
export class AppMainPageComponent implements OnInit {

  private tableRows$: Observable<Car[]>;
  private counter$: Observable<number>;

  constructor(private _store: Store<fromStore.AppState>,
              private _router: Router,
              private _spinner: NgxSpinnerService) {
    this.tableRows$ = this._store.pipe(select(fromStore.selectCars));
    this.counter$ = this._store.pipe(select(fromStore.selectCounter));
  }
 
  ngOnInit() {
    this._store.dispatch(new appActions.LoadData());
    this._spinner.show();
  }

  private dispatchSort(event: any){
    this._store.dispatch(new appActions.SortData(event.direction, event.column));
  }

  private dispatchIncrement() {
    this._store.dispatch(new appActions.IncrementCounter());
  }

  private dispatchDecrement() {
    this._store.dispatch(new appActions.DecrementCounter());
  }

  private dispatchRestart() {
    this._store.dispatch(new appActions.RestartCounter());
  }

}

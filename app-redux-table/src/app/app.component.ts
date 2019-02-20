import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as fromStore from "../store";
import * as appActions from "../store/actions/data.actions";
import { User } from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user$: Observable<User>;

  constructor(private _store: Store<fromStore.AppState>,
  			  private _router: Router) { }
 
  ngOnInit() {
  	this.user$ = this._store.pipe(select(fromStore.selectUser));
  }

  logout() {
  	this._store.dispatch(new appActions.LogOutUser());
  	this.gologinpage();
  }

  gologinpage() {
  	this._router.navigate(['login']);
  }
}

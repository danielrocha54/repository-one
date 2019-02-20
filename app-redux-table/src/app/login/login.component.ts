import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import * as fromStore from "../../store";
import * as appActions from "../../store/actions/data.actions";
import { User } from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted: boolean = false;

  private username: string;
  private password: string;

  private loginAttempts$: Observable<number>;

  constructor(private _store: Store<fromStore.AppState>,
              private _router: Router,
              private _formBuilder: FormBuilder,
              private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(6) ] ]
    });
    this.loginAttempts$ = this._store.pipe(select(fromStore.selectLoginAttempts));
  }

  get f() { return this.registerForm.controls; }

  goRegister(): void {
  	this._router.navigate(['register']);
  }

  doLogin(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.invalid) {
      this._spinner.show();
      this._store.dispatch(new appActions.LoginUser(this.username, this.password));
    }
    
  }

}

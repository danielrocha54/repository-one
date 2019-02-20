import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import * as fromStore from "../../store";
import * as appActions from "../../store/actions/data.actions";
import { User } from "../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted: boolean = false;

  private firstname: string;
  private lastname: string;
  private username: string;
  private password: string;

  constructor(	private _store: Store<fromStore.AppState>,
  				      private _router: Router,
                private _formBuilder: FormBuilder,
                private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(6) ] ]
    });
  }

  get f() { return this.registerForm.controls; }

  register(event): void {
    
    this.submitted = true;

    if (!this.registerForm.invalid) {
      this._spinner.show();
      let user: User = new User(this.username, this.password, this.firstname, this.lastname);
      this._store.dispatch(new appActions.RegisterUser(user));
    }
  }

}

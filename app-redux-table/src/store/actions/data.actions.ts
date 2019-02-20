import { Action } from '@ngrx/store';

import { Car } from '../../app/model/car';
import { User } from '../../app/model/user';

export enum AppDataActionTypes {
  RegisterUser = '[AppDataAction] Register User',
  LoginUser = '[AppDataAction] Login User',
  Authenticate = '[AppDataAction] Authenticate',
  LogOutUser = '[AppDataAction] LogOut User',
  LoadData = '[AppDataAction] Load Data',
  SetData = '[AppDataAction] Set Data',
  SortData = '[AppDataAction] Sort Data',
  IncrementCounter = '[AppDataAction] Increment Counter',
  DecrementCounter = '[AppDataAction] Decrement Counter',
  RestartCounter = '[AppDataAction] Restart Counter'
}

export class RegisterUser implements Action {
  readonly type = AppDataActionTypes.RegisterUser;

  constructor(public payload: User) {}
}

export class LoginUser implements Action {
  readonly type = AppDataActionTypes.LoginUser;

  constructor(public username: string, public password: string) {}
}

export class Authenticate implements Action {
  readonly type = AppDataActionTypes.Authenticate;

  constructor(public user: User, public token: string) {}
}

export class LogOutUser implements Action {
  readonly type = AppDataActionTypes.LogOutUser;
}

export class LoadData implements Action {
  readonly type = AppDataActionTypes.LoadData;
}

export class SetData implements Action {
  readonly type = AppDataActionTypes.SetData;
 
  constructor(public payload: Car[]) {}
}

export class SortData implements Action {
  readonly type = AppDataActionTypes.SortData;
 
  constructor(public direction: string, public column: string) {}
}

export class IncrementCounter implements Action {
  readonly type = AppDataActionTypes.IncrementCounter;
}

export class DecrementCounter implements Action {
  readonly type = AppDataActionTypes.DecrementCounter;
}

export class RestartCounter implements Action {
  readonly type = AppDataActionTypes.RestartCounter;
}

export type AppDataActions =
    RegisterUser
  | LoginUser
  | Authenticate
  | LogOutUser
	| LoadData
	|	SetData
  | SortData
	|	IncrementCounter
	|	DecrementCounter
	|	RestartCounter
	;


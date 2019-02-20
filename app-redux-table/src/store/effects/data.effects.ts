import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { Store, Action, select } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import * as appActions from '../actions/data.actions';
import * as fromStore from "../../store";
import { Car } from '../../app/model/car';
import { User } from '../../app/model/user';


@Injectable()
export class AppDataEffects {

private NO_SERVER_ERROR = 'Unable to communicate with server';

constructor(private actions$: Actions,
            private http: HttpClient,
            private _store: Store<fromStore.AppState>,
            private _router: Router,
            private _spinner: NgxSpinnerService,
            private _modalService: NgbModal) {}

private getSessionToken(): String {

  let sessionToken$: Observable<String> = this._store.pipe(select(fromStore.selectSessionToken));
  let token = null;

  let sessionTokenSubscription: Subscription = sessionToken$.subscribe( value => token = value );

  sessionTokenSubscription.unsubscribe();

  return token;
}

private openModalError(content): void {

  this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

}

@Effect()
  loadCars$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppDataActionTypes.LoadData),
    map((action) => action),
    switchMap(( payload ) => {

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Lang');;
      headers = headers.set('Access-Control-Allow-Headers','*');
      headers = headers.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
      headers = headers.set('Access-Control-Allow-Origin', '*');
      headers = headers.set('Authorization', 'Bearer' + this.getSessionToken());

      return this.http.get<any>('http://localhost:8080/api/cars', { headers })
        .pipe(
          map((response) => {

            this._spinner.hide();

            if (!response || !response.data || (response.httpstatus != 200)) {
              this.openModalError(response.errorMessage);
              new appActions.SetData(null)
            } else {
              var id = 1;
              let carsLoaded = response.data.map(data =>
                {
                  return new Car(id++, data['year'], data['manufacturer'], data['model']);
                }
              );

              return new appActions.SetData(carsLoaded);
            }

          }),
          catchError((error) => {

            this._spinner.hide();
            this.openModalError(this.NO_SERVER_ERROR);
            return of(
              new appActions.SetData(null)
            )

          })
        );
    })
  );


/*@Effect()
  loadCars$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppDataActionTypes.LoadData),
    switchMap(() => {
      return this.http.get<any>('./../../assets/cars.json')
        .pipe(
          map((response) => {
            var id = 1;
            let carsLoaded = response.data.map(data =>
              {
                return new Car(id++, data['year'], data['manufacturer'], data['model']);
              }
            );
            this._spinner.hide();
            return new appActions.SetData(carsLoaded);
          })
        )
    })
  );*/

@Effect()
  loginUser$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppDataActionTypes.LoginUser),
    map((action) => action),
    switchMap(( payload ) => {

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Lang');;
      headers = headers.set('Access-Control-Allow-Headers','*');
      headers = headers.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
      headers = headers.set('Access-Control-Allow-Origin', '*');
      headers = headers.set('Authorization', 'Basic' + btoa(payload['username'] + ':' + payload['password']));

      return this.http.get<any>('http://localhost:8080/api/authenticate', { headers })
        .pipe(
          map((response) => {

            this._spinner.hide();

            if (!response || !response.data || (response.httpstatus != 200)) {
              return new appActions.Authenticate(null, null);
            } else {
              this._router.navigate(['main']);
              return new appActions.Authenticate(response.data.user, response.data.token);
            }

          }),
          catchError((error) => {
            this._spinner.hide();
            this.openModalError(this.NO_SERVER_ERROR);
            return of(
              new appActions.Authenticate(null, null)
            )
          })
        );
    })
  );

@Effect({ dispatch: false })
  registerUser$ = this.actions$.pipe(
    ofType(appActions.AppDataActionTypes.RegisterUser),
    map(({ payload }) => {
      
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Lang');;
      headers = headers.set('Access-Control-Allow-Headers','*');
      headers = headers.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
      headers = headers.set('Access-Control-Allow-Origin', '*');

      return this.http.post<any>('http://localhost:8080/api/user', {
        'firstName': payload['firstname'],
        'lastName':  payload['lastname'],
        'username':  payload['username'],
        'password':  payload['password']
      } , { headers })
        .subscribe(
          res => {
            this._spinner.hide();
            if (res.httpstatus == 200) {
              this._router.navigate(['login']);
            } else {
              this.openModalError(res.data.errorMessage);
            }
          },
          err => {
            this._spinner.hide();
            this.openModalError(this.NO_SERVER_ERROR);
          }
        );
      })
  );

/*@Effect()
loginUser$: Observable<Action> = this.actions$.pipe(
  ofType(appActions.AppDataActionTypes.LoginUser),
  switchMap((payload) => {

    return this.http.get<any>("./../../assets/users.json")
      .pipe(
        map((response) => {

          var username: string = null;

          for (var i = 0; (i < response['users'].length) && !username; i++) {
            if (response['users'][i]['user'] == payload['username'] &&
                response['users'][i]['password'] == payload['password']) {
              username = response['users'][i]['user'];
            }
          }

          if (!username) {
            //this._router.navigate(['register']);
            return new appActions.Authenticate(null, null);
          } else {
            this._router.navigate(['main']);
            return new appActions.Authenticate(null, null);
          }
          
        })
      )
    })
  );*/

}

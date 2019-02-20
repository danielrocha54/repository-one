import * as appActions from '../actions/data.actions';
import { Car } from '../../app/model/car';
import { User } from '../../app/model/user';

export interface State {
  user: User,
  token: string,
  loginAttempts: number,
  appdata: Car[],
  counter: number
}

export const initialState: State = {
	user: null,
  token: null,
  loginAttempts: 0,
  appdata: null,
  counter: 0
};

export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export function reducer(state = initialState, action: appActions.AppDataActions): State {
	let newState: State;

	switch (action.type) {

      case appActions.AppDataActionTypes.IncrementCounter:
        newState = {
            ...state,
            counter: state.counter + 1
          };
        break;
      case appActions.AppDataActionTypes.DecrementCounter:
        newState = {
            ...state,
            counter: state.counter - 1
          };
        break;
      case appActions.AppDataActionTypes.RestartCounter:
        newState = {
            ...state,
            counter: 0
          };
        break;
      case appActions.AppDataActionTypes.Authenticate:
        newState = {
            ...state,
            user: action.user,
            token: action.token,
            loginAttempts: state.loginAttempts + 1
          };
        break;
      case appActions.AppDataActionTypes.LogOutUser:
        newState = {
            ...state,
            user: null,
            token: null,
            loginAttempts: 0
          };
        break;
  		case appActions.AppDataActionTypes.SetData:
  			newState = {
  					...state,
  					appdata: action.payload
  				};
  			break;
      case appActions.AppDataActionTypes.SortData:
        newState = {
            ...state,
            appdata: state.appdata.sort((a, b) => {
              const res = compare(a[action.column], b[action.column]);
              return action.direction === 'asc' ? res : -res;
            })
          }
        break;
    	default:
    		newState = state;
        break;
    }

    console.log("===== NEW STATE =====");
    console.log(newState);

    return newState;
}
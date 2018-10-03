import { ofType } from 'redux-observable';
import { fromJS } from 'immutable';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

const freezeObject = (...keys) => Object.freeze(
  keys.reduce((obj, key) => {
    obj[key] = Symbol(key);
    return obj;
  }, {})
);

const mkAction = (type, payload) => ({
  type, payload
});

const STAGE = freezeObject(
  'READY', 'LOADING', 'ERROR', 'LOAD_ERROR', 'DONE'
);

const TYPES = freezeObject(
  'GET_APOD',
  'SET_APOD',
  'ERROR'
);

export const Actions = Object.freeze({
  getAPOD: date => mkAction(TYPES.GET_APOD, date),
  setAPOD: data => mkAction(TYPES.SET_APOD, data),
  getAPODFailure: error => mkAction(TYPES.ERROR, error),
});

export const EpicCreators = Object.freeze({
  getApod: action$ =>
    action$.pipe(
      ofType(TYPES.GET_APOD),
      switchMap(action =>
        ajax.getJSON(`${APOD_URL}&date=${action.payload}`).pipe(
          map( res =>
            Actions.setAPOD(res)
          ),
          catchError(error =>
            of({
              type: TYPES.ERROR,
              payload: Actions.getAPODFailure(error.response.error.message),
              error: true,
            })
          )
        )
      )
    )
})

const initialState = fromJS({
  data: {},
  stage: STAGE.READY,
  error: ""
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_APOD: {
      return state.set('stage', STAGE.LOADING);
    }
    case TYPES.SET_APOD: {
      return state.merge({
        stage: STAGE.DONE,
        data: action.payload,
      });
    }
    case TYPES.ERROR: {
      return state.merge({
        stage: STAGE.ERROR,
        error: action.payload.payload,
      });
    }
    default:
      return state;
  }
};

export default reducer;

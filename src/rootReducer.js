import { combineReducers } from 'redux';

import APODReducer from './APOD/APODDuck';

const rootReducer = combineReducers({
  APODReducer,
});

export default rootReducer;
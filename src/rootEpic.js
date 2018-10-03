import { combineEpics } from 'redux-observable';

import { EpicCreators } from './APOD/APODDuck';

const rootEpic = combineEpics(
  EpicCreators.getApod,
);

export default rootEpic;

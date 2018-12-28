import { combineReducers } from 'redux';

import scores from './modules/Scores';
import events from './modules/Events';
import players from './modules/Players';
import authUser from './modules/AuthUser';
import meta from './modules/Meta';

export default combineReducers({
  authUser,
  scores,
  events,
  players,
  meta,
});

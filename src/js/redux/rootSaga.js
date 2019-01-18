import { fork, all } from 'redux-saga/effects';

import watchScores from './modules/Scores/sagas/watchScores';
import watchEvents from './modules/Events/sagas/watchEvents';
import watchPlayers from './modules/Players/sagas/watchPlayers';
import watchAuthUser from './modules/AuthUser/sagas/watchAuthUser';
import watchMeta from './modules/Meta/sagas/watchMeta';
import watchSponsors from './modules/Sponsors/sagas/watchSponsors';
import watchNewsFeed from './modules/NewsFeed/sagas/watchNewsFeed';
import watchClubInformation from './modules/ClubInformation/sagas/watchClubInformation';

function* rootSaga() {
    yield all([
        fork(watchScores),
        fork(watchAuthUser),
        fork(watchEvents),
        fork(watchPlayers),
        fork(watchMeta),
        fork(watchSponsors),
        fork(watchNewsFeed),
        fork(watchClubInformation),
    ]);
}

export default rootSaga;

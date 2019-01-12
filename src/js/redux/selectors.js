import _ from 'lodash';
import moment from 'moment';
import memoizeOne from 'memoize-one';

export const getActiveGames = memoizeOne((state) => {
    const obj = {};
    _.map(state.scores.games, (game, index) => {
        if (game.active) obj[index] = game;
    });
    return obj;
});

export const getScoresByGameId = memoizeOne((state, id) => {
    const game = _.find(state.scores.games, { event_id: id });
    const event = state.events.items[id];
    if (event && game) return { ...game, id: event.game_id };
    return null;
});

export const getEventById = memoizeOne((state, id) => (
    state.events.items
        ? state.events.items[id]
        : null));

export const getEventPlayers = memoizeOne(
    (state, id) => state.events.items[id].players || [],
);

export const getUpcomingGameEvents = memoizeOne((state) => {
    const ascendingFeed = _.sortBy(state.events.items, ['start_time']);
    const upcomingEvents = _.filter(ascendingFeed, item => item.start_time >= moment(0, 'HH').format());
    return _.filter(upcomingEvents, event => event.game);
});

export const getActiveGameEvents = memoizeOne((state) => {
    const activeGames = _.filter(state.scores.games, game => game.active);
    return activeGames.map(game => state.events.items[game.event_id]);
});

export const getPastGameEvents = memoizeOne((state) => {
    const ascendingFeed = _.sortBy(state.events.items, ['start_time']);
    const descendingFeed = ascendingFeed.reverse();
    const pastEvents = _.filter(descendingFeed, item => item.start_time < moment(0, 'HH').format());
    return _.filter(pastEvents, event => event.game);
});

export const getAllGameEvents = memoizeOne(
    state => _.filter(state.events.items, event => event.game),
);

export const getPlayerGamesById = memoizeOne(
    (state, id) => _.filter(state.events.items, event => _.indexOf(event.players, id) > -1),
);

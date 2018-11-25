import _ from 'lodash';
import moment from 'moment';

export const getActiveGames = (state) => {
  const obj = {};
  _.map(state.scores.games, (game, index) => {
    if (game.active) obj[index] = game;
  });
  return obj;
};

export const getScoresByGameId = (state, id) => {
  const game = _.find(state.scores.games, { event_id: id });
  const event = state.events.items[id];
  if (event && game) return { ...game, id: event.game_id };
  return null;
};

export const getEventById = (state, id) => (state.events.items ? state.events.items[id] : null);

export const getEventPlayers = (state, id) => state.events.items[id].players || [];

export const getUpcomingGameEvents = (state) => {
  const ascendingFeed = _.sortBy(state.events.items, ['start_time']);
  return _.filter(ascendingFeed, item => item.start_time >= moment(0, 'HH').format());
};

export const getActiveGameEvents = (state) => {
  const activeGames = _.filter(state.scores.games, game => game.active);
  return _.map(activeGames, game => state.events.items[game.event_id]);
};

export const getPastGameEvents = (state) => {
  const ascendingFeed = _.sortBy(state.events.items, ['start_time']);
  const descendingFeed = ascendingFeed.reverse();
  return _.filter(descendingFeed, item => item.start_time < moment(0, 'HH').format());
};

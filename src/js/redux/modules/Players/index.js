// ACTION
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const REQUEST_PLAYERS_SUCCESS = 'REQUEST_PLAYERS_SUCCESS';
export const REQUEST_PLAYERS_FAILURE = 'REQUEST_PLAYERS_FAILURE';
export const EDIT_PLAYER = 'EDIT_PLAYER';
export const EDIT_PLAYER_SUCCESS = 'EDIT_PLAYER_SUCCESS';
export const EDIT_PLAYER_FAILURE = 'EDIT_PLAYER_FAILURE';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS';
export const DELETE_PLAYER_FAILURE = 'DELETE_PLAYER_FAILURE';

const initialState = {
    loading: false,
    error: null,
    items: [],
};

// REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_PLAYERS: {
        return {
            ...state,
            loading: true,
        };
    }
    case REQUEST_PLAYERS_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: action.payload,
        };
    }
    case REQUEST_PLAYERS_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }
    case EDIT_PLAYER: {
        return {
            ...state,
            loading: true,
        };
    }
    case EDIT_PLAYER_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: state.items.map(player => (
                player.id === action.payload.id
                    ? action.payload
                    : player)),
        };
    }
    case EDIT_PLAYER_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    }
    case DELETE_PLAYER: {
        return {
            ...state,
            loading: true,
        };
    }
    case DELETE_PLAYER_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: state.items.map(player => (
                player.id === action.payload.id
                    ? action.payload
                    : player)),
        };
    }
    case DELETE_PLAYER_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    }
    default:
        return state;
    }
}

// ACTION CREATOR
export function requestPlayers() {
    return {
        type: REQUEST_PLAYERS,
    };
}

export function requestPlayersSuccess(payload) {
    return {
        type: REQUEST_PLAYERS_SUCCESS,
        payload,
    };
}

export function requestPlayersFailure(error) {
    return {
        type: REQUEST_PLAYERS_FAILURE,
        error,
    };
}

export function editPlayer(payload) {
    return {
        type: EDIT_PLAYER,
        payload,
    };
}

export function editPlayerSuccess(payload) {
    return {
        type: EDIT_PLAYER_SUCCESS,
        payload,
    };
}

export function editPlayerFailure(payload) {
    return {
        type: EDIT_PLAYER_FAILURE,
        payload,
    };
}

export function deletePlayer(payload) {
    return {
        type: DELETE_PLAYER,
        payload,
    };
}

export function deletePlayerSuccess(payload) {
    return {
        type: DELETE_PLAYER_SUCCESS,
        payload,
    };
}

export function deletePlayerFailure(payload) {
    return {
        type: DELETE_PLAYER_FAILURE,
        payload,
    };
}

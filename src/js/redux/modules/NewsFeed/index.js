// ACTION
export const REQUEST_FEED = 'newsFeed/REQUEST';
export const REQUEST_FEED_SUCCESS = 'newsFeed/REQUEST_SUCCESS';
export const REQUEST_FEED_FAILURE = 'newsFeed/REQUEST_FAILURE';
export const UPDATE_FEED = 'UPDATE_FEED';
export const UPDATE_FEED_SUCCESS = 'UPDATE_FEED_SUCCESS';
export const UPDATE_FEED_FAILURE = 'UPDATE_FEED_FAILURE';


const initialState = {
    loading: false,
    error: null,
    feed: {},
};

// REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_FEED: {
        return {
            ...state,
            loading: true,
        };
    }
    case REQUEST_FEED_SUCCESS: {
        return {
            ...state,
            loading: false,
            feed: action.payload,
        };
    }
    case REQUEST_FEED_FAILURE: {
        return {
            ...state,
            loading: false,
        };
    }
    case UPDATE_FEED: {
        return {
            ...state,
            loading: true,
        };
    }
    case UPDATE_FEED_SUCCESS: {
        return {
            ...state,
            loading: false,
            feed: {
                ...state.feed,
                [action.payload.id]: action.payload,
            },
        };
    }
    case UPDATE_FEED_FAILURE: {
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
export function requestFeed() {
    return { type: REQUEST_FEED };
}

export function requestFeedSuccess(payload) {
    return {
        type: REQUEST_FEED_SUCCESS,
        payload,
    };
}

export function requestFeedFailure(payload) {
    return {
        type: REQUEST_FEED_FAILURE,
        payload,
    };
}

export function updateItem(payload) {
    return {
        type: UPDATE_FEED,
        payload,
    };
}

export function updateItemSuccess(payload) {
    return {
        type: UPDATE_FEED_SUCCESS,
        payload,
    };
}

export function updateItemFailure(payload) {
    return {
        type: UPDATE_FEED_FAILURE,
        payload,
    };
}

// ACTION
export const REQUEST_FEED = 'newsFeed/REQUEST';
export const REQUEST_FEED_SUCCESS = 'newsFeed/REQUEST_SUCCESS';
export const REQUEST_FEED_FAILURE = 'newsFeed/REQUEST_FAILURE';

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

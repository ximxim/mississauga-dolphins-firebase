// ACTION
export const REQUEST_SPONSORS = 'REQUEST_SPONSORS';
export const REQUEST_SPONSORS_SUCCESS = 'REQUEST_SPONSORS_SUCCESS';
export const REQUEST_SPONSORS_FAILURE = 'REQUEST_SPONSORS_FAILURE';
export const ADD_SPONSORS = 'ADD_SPONSORS';
export const ADD_SPONSORS_SUCCESS = 'ADD_SPONSORS_SUCCESS';
export const ADD_SPONSORS_FAILURE = 'ADD_SPONSORS_FAILURE';
export const EDIT_SPONSORS = 'EDIT_SPONSORS';
export const EDIT_SPONSORS_SUCCESS = 'EDIT_SPONSORS_SUCCESS';
export const EDIT_SPONSORS_FAILURE = 'EDIT_SPONSORS_FAILURE';
export const DELETE_SPONSORS = 'DELETE_SPONSORS';
export const DELETE_SPONSORS_SUCCESS = 'DELETE_SPONSORS_SUCCESS';
export const DELETE_SPONSORS_FAILURE = 'DELETE_SPONSORS_FAILURE';

const initialState = {
    loading: false,
    error: null,
    items: [],
};

// REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_SPONSORS: {
        return {
            ...state,
            loading: true,
        };
    }
    case REQUEST_SPONSORS_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: action.payload,
        };
    }
    case REQUEST_SPONSORS_FAILURE: {
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
export function requestSponsors() {
    return {
        type: REQUEST_SPONSORS,
    };
}

export function requestSponsorsSuccess(payload) {
    return {
        type: REQUEST_SPONSORS_SUCCESS,
        payload,
    };
}

export function requestSponsorsFailure(payload) {
    return {
        type: REQUEST_SPONSORS_FAILURE,
        payload,
    };
}

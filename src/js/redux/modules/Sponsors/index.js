// ACTION
export const REQUEST_SPONSORS = 'REQUEST_SPONSORS';
export const REQUEST_SPONSORS_SUCCESS = 'REQUEST_SPONSORS_SUCCESS';
export const REQUEST_SPONSORS_FAILURE = 'REQUEST_SPONSORS_FAILURE';
export const ADD_SPONSOR = 'ADD_SPONSOR';
export const ADD_SPONSOR_SUCCESS = 'ADD_SPONSOR_SUCCESS';
export const ADD_SPONSOR_FAILURE = 'ADD_SPONSOR_FAILURE';
export const EDIT_SPONSOR = 'EDIT_SPONSOR';
export const EDIT_SPONSOR_SUCCESS = 'EDIT_SPONSOR_SUCCESS';
export const EDIT_SPONSOR_FAILURE = 'EDIT_SPONSOR_FAILURE';
export const DELETE_SPONSOR = 'DELETE_SPONSOR';
export const DELETE_SPONSOR_SUCCESS = 'DELETE_SPONSOR_SUCCESS';
export const DELETE_SPONSOR_FAILURE = 'DELETE_SPONSOR_FAILURE';

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
    case ADD_SPONSOR: {
        return {
            ...state,
            loading: true,
        };
    }
    case ADD_SPONSOR_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: [
                ...state.items,
                action.payload,
            ],
        };
    }
    case ADD_SPONSOR_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    }
    case EDIT_SPONSOR: {
        return {
            ...state,
            loading: true,
        };
    }
    case EDIT_SPONSOR_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: state.items.map(sponsor => (
                sponsor.ID === action.payload.ID
                    ? action.payload
                    : sponsor)),
        };
    }
    case EDIT_SPONSOR_FAILURE: {
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

export function addSponsor(payload) {
    return {
        type: ADD_SPONSOR,
        payload,
    };
}

export function addSponsorSuccess(payload) {
    return {
        type: ADD_SPONSOR_SUCCESS,
        payload,
    };
}

export function addSponsorFailure(payload) {
    return {
        type: ADD_SPONSOR_FAILURE,
        payload,
    };
}

export function editSponsor(payload) {
    return {
        type: EDIT_SPONSOR,
        payload,
    };
}

export function editSponsorSuccess(payload) {
    return {
        type: EDIT_SPONSOR_SUCCESS,
        payload,
    };
}

export function editSponsorFailure(payload) {
    return {
        type: EDIT_SPONSOR_FAILURE,
        payload,
    };
}

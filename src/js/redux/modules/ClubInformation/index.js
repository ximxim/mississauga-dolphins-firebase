// ACTION
export const REQUEST_INFORMATION = 'REQUEST_INFORMATION';
export const REQUEST_INFORMATION_SUCCESS = 'REQUEST_INFORMATION_SUCCESS';
export const REQUEST_INFORMATION_FAILURE = 'REQUEST_INFORMATION_FAILURE';
export const UPDATE_INFORMATION = 'UPDATE_INFORMATION';
export const UPDATE_INFORMATION_SUCCESS = 'UPDATE_INFORMATION_SUCCESS';
export const UPDATE_INFORMATION_FAILURE = 'UPDATE_INFORMATION_FAILURE';

const initialState = {
    loading: false,
    error: null,
    information: {},
};

// REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_INFORMATION: {
        return {
            ...state,
            loading: true,
        };
    }
    case REQUEST_INFORMATION_SUCCESS: {
        return {
            ...state,
            loading: false,
            information: action.payload,
        };
    }
    case REQUEST_INFORMATION_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    }
    case UPDATE_INFORMATION: {
        return {
            ...state,
            loading: true,
        };
    }
    case UPDATE_INFORMATION_SUCCESS: {
        return {
            ...state,
            loading: false,
            information: action.payload,
        };
    }
    case UPDATE_INFORMATION_FAILURE: {
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
export function request() {
    return {
        type: REQUEST_INFORMATION,
    };
}

export function requestSuccess(payload) {
    return {
        type: REQUEST_INFORMATION_SUCCESS,
        payload,
    };
}

export function requestFailure(payload) {
    return {
        type: REQUEST_INFORMATION_FAILURE,
        payload,
    };
}

export function update(payload) {
    return {
        type: UPDATE_INFORMATION,
        payload,
    };
}

export function updateSuccess(payload) {
    return {
        type: UPDATE_INFORMATION_SUCCESS,
        payload,
    };
}

export function updateFailure(payload) {
    return {
        type: UPDATE_INFORMATION_FAILURE,
        payload,
    };
}

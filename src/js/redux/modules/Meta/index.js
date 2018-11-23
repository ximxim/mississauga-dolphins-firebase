// ACTION
export const REQUEST_META = 'REQUEST_META';
export const REQUEST_META_SUCCESS = 'REQUEST_META_SUCCESS';
export const REQUEST_META_FAILURE = 'REQUEST_META_FAILURE';

const initialState = {
  loading: false,
  error: null,
  Admin: {
    Navbar: {
      information: false,
      user: false,
      notifications: false,
    },
    Sidebar: {
      games: false,
      newsfeed: false,
      players: false,
      settings: false,
      sponsors: false,
    },
  },
};

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_META: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_META_SUCCESS: {
      return {
        ...state,
        loading: false,
        Admin: action.payload.Admin,
      };
    }
    case REQUEST_META_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

// ACTION CREATOR
export function requestMeta() {
  return {
    type: REQUEST_META,
  };
}

export function requestMetaSuccess(payload) {
  return {
    type: REQUEST_META_SUCCESS,
    payload,
  };
}

export function requestMetaFailure(error) {
  return {
    type: REQUEST_META_FAILURE,
    error,
  };
}

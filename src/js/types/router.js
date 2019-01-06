export type match = {
    params: {
        id: string,
    },
    isExact: Boolean,
    path: string,
    url: string,
};

export type location = {
    pathname: string,
    search: string,
    hash: string,
    state: Object,
};

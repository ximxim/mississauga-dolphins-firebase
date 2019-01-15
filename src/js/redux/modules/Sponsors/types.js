export type Sponsor = {
    IMAGE: string,
    NAME: string,
    TAG_LINE: string,
    WEBSITE: string,
};

export type Sponsors = {
    loading: Boolean,
    error: string,
    items: Array<Sponsor>,
};

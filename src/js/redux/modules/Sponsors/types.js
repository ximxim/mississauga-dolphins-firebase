export type Sponsor = {
    IMAGE: string,
    NAME: string,
    TAG_LINE: string,
    WEBSITE: string,
    ID: number,
};

export type Sponsors = {
    loading: Boolean,
    error: string,
    items: Array<Sponsor>,
};

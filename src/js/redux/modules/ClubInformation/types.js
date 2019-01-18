export type Information = {
    EMAIL: string,
    FACEBOOK: string,
    INSTAGRAM: string,
    NAME: string,
    PHONE: string,
    TWITTER: string,
    WEBSITE: string,
    YOUTUBE: string,
};

export type ClubInformation = {
    loading: Boolean,
    error: string,
    information: Information,
};

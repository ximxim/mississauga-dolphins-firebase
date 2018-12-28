export type Sidebar = {
    games: Boolean,
    newsfeed: Boolean,
    players: Boolean,
    settings: Boolean,
    sponsors: Boolean,
};

export type Navbar = {
    information: Boolean,
    user: Boolean,
    notifications: Boolean,
};

export type Admin = {
    Sidebar: Sidebar,
    Navbar: Navbar,
};

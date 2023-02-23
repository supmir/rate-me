export const statsList = [
    "Looks",
    "Creativity",
    "Humor",
    "Mental Health",
    "Empathy",
    "Patience",
    "Social Skills",
    "Memory",
];

export interface Rating {
    statName: string,
    self: number,
    average: number
}

export interface UserInfo {
    username: string;
    ratings: Array<Rating>
}
export const userInfoDefault = { username: "", ratings: [] }

export interface AppContextInterface {
    userInfo: UserInfo;
    updateUserInfo: () => void;
    replaceUserInfo: (userInfo: UserInfo) => void;
    session: boolean,
    setSession: (session: boolean) => void,
}

export const appContextDefault: AppContextInterface = {
    userInfo: userInfoDefault,
    updateUserInfo: () => { },
    replaceUserInfo: () => { },
    session: false,
    setSession: () => { },
}
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
    updateUserInfo: (userInfo: UserInfo) => void;
    session: boolean,
    setSession: (session: boolean) => void,
}

export const appContextDefault: AppContextInterface = {
    userInfo: userInfoDefault,
    updateUserInfo: () => { },
    session: false,
    setSession: () => { },
}
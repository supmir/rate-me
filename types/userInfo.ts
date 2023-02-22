
export interface UserInfo {
    username: string;
}
export const userInfoDefault = { username: "" }

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
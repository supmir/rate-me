import {
  appContextDefault,
  AppContextInterface,
  UserInfo,
  userInfoDefault,
} from "@/types/userInfo";
import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext<AppContextInterface>(appContextDefault);

export function useAppContext() {
  return useContext(AppContext);
}
type Props = {
  children: ReactNode;
};

export function AppWrapper({ children }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoDefault);
  const [session, setSession] = useState<boolean>(false);

  const value = {
    userInfo: userInfo,
    updateUserInfo: async () => {
      const data = await fetch("/api/userinfo");
      setUserInfo(await data.json());
    },
    replaceUserInfo: (userInfo: UserInfo) => {
      setUserInfo(userInfo);
    },
    session: session,
    setSession: setSession,
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

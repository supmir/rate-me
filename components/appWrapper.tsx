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

  const value = {
    userInfo: userInfo,
    updateUserInfo: (userInfo: UserInfo) => {
      setUserInfo(userInfo);
    },
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

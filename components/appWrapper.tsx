import {
  appContextDefault,
  AppContextInterface,
  statsList,
  UserInfo,
  userInfoDefault,
} from "@/types/userInfo";
import axios from "axios";
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
      const resp = await axios.get("/api/userinfo");
      if (resp.status === 200) {
        const new_user_info: UserInfo = {
          username: resp.data.username,
          ratings: statsList.map((statName) => {
            return {
              statName: statName,
              self: resp.data.self[statName] || 0,
              average: resp.data.average[statName] || 0,
            };
          }),
        };

        setUserInfo(new_user_info);
      }
    },
    // replaceUserInfo: (userInfo: UserInfo) => {
    //   setUserInfo(userInfo);
    // },
    session: session,
    setSession: setSession,
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

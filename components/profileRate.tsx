import { UserInfo } from "@/types/userInfo";
import { Fragment } from "react";
import Bar from "./bar";

export default function ProfileRate(props: { userInfo: UserInfo }) {
  const { userInfo } = props;
  return (
    <div className="flex flex-col gap-x-2">
      {userInfo.ratings.map(({ statName, self, average }, i) => {
        return (
          <Bar statName={statName} self={self} average={average} key={i} />
        );
      })}
    </div>
  );
}

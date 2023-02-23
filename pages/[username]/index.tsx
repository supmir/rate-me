import Bar from "@/components/bar";
import Layout from "@/components/layout";
import { UserInfo, userInfoDefault } from "@/types/userInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoDefault);

  async function fetchUserInfo() {
    const data = await fetch(
      `/api/publicuserinfo?username=${username?.slice(1)}`
    );
    const data_json = await data.json();
    setUserInfo(data_json);
  }

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  return (
    <Layout>
      <div className="w-full flex my-4 justify-between">
        <div className="text-3xl font-bold text-center">
          {username}&#39;s profile
        </div>
        <Link
          href={`/${username}/rate`}
          className="border border-neutral-100 px-2 py-1"
        >
          <button>Rate this user!</button>
        </Link>
      </div>
      {!userInfo.ratings || userInfo.ratings.length === 0 ? (
        <div>User is unrated</div>
      ) : (
        userInfo.ratings.map(({ statName, self, average }, i) => {
          return (
            <Bar statName={statName} self={self} average={average} key={i} />
          );
        })
      )}
    </Layout>
  );
}

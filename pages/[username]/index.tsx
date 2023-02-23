import Bar from "@/components/bar";
import Layout from "@/components/layout";
import ShareField from "@/components/shareField";
import { share } from "@/lib/site";
import { UserInfo, userInfoDefault } from "@/types/userInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoDefault);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchUserInfo() {
    const data = await fetch(
      `/api/publicuserinfo?username=${username?.slice(1)}`
    );
    const data_json = await data.json();
    setUserInfo(data_json);
    setIsLoading(false);
  }

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  return (
    <Layout>
      <div className="w-full flex my-4 justify-between">
        {isLoading && "Loading..."}
        <div className="text-3xl font-bold text-left">
          {username}&#39;s profile
        </div>
        {!userInfo.ratings || userInfo.ratings.length === 0 ? (
          <button
            className="border border-neutral-100 px-2 py-1 my-auto"
            onClick={(e) => {
              const action = share(
                "Mirror Rate",
                "You should make a Mirror Rate Profile",
                "https://mirrorrate.vercel.app/"
              );
              e.currentTarget.innerHTML = action;
            }}
          >
            Invite
          </button>
        ) : (
          <Link
            href={`/${username}/rate`}
            className="border border-neutral-100 px-2 py-1 my-auto"
          >
            <button>Rate!</button>
          </Link>
        )}
      </div>
      {(!userInfo.ratings || userInfo.ratings.length === 0) && !isLoading ? (
        <div className="text-center">
          {username} does not have an account. Invite them!
        </div>
      ) : (
        <Fragment>
          {userInfo.ratings.map(({ statName, self, average }, i) => {
            return (
              <Bar statName={statName} self={self} average={average} key={i} />
            );
          })}
          <div className="py-4">
            The upper bar represents the user&#39;s average rating. <br />
            The lower bar represents the user&#39;s self rating.
          </div>
          <div className="py-3">
            <ShareField
              message="Share this profile"
              shareMessage="Check out this Mirror Rate Profile:"
            />
          </div>
        </Fragment>
      )}
    </Layout>
  );
}

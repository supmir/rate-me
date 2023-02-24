import { useAppContext } from "@/components/appWrapper";
import Bar from "@/components/bar";
import Layout from "@/components/layout";
import ShareField from "@/components/shareField";
import { share } from "@/lib/site";
import { UserInfo, userInfoDefault } from "@/types/userInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
export default function UserProfile() {
  const { session } = useAppContext();
  const router = useRouter();
  const { username } = router.query;
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoDefault);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const profileRef = useRef() as MutableRefObject<HTMLInputElement>;
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
      <div ref={profileRef} className="px-2">
        <div className="w-full flex my-4 justify-between gap-x-2">
          <div className="text-2xl font-bold text-left overflow-clip break-words">
            {username}&#39;s profile
          </div>
          {!userInfo.ratings || userInfo.ratings.length === 0 ? (
            <button
              className="border border-neutral-100 px-2 py-1 my-auto bg-violet-500 min-w-min"
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
              className="border border-neutral-100 px-2 py-1 my-auto bg-violet-500 min-w-min"
            >
              <button>{session ? "Rate!" : "Login to rate"}</button>
            </Link>
          )}
        </div>
        {isLoading && "Loading..."}
        {(!userInfo.ratings || userInfo.ratings.length === 0) && !isLoading ? (
          <div className="text-center">
            {username} does not have an account. Invite them!
          </div>
        ) : (
          <Fragment>
            {userInfo.ratings.map(({ statName, self, average }, i) => {
              return (
                <Bar
                  statName={statName}
                  self={self}
                  average={average}
                  key={i}
                />
              );
            })}

            <div className="flex flex-col py-2">
              <ShareField
                message="Share this profile"
                shareMessage="Check out this Mirror Rate Profile:"
              />
            </div>
          </Fragment>
        )}
      </div>

      {(!userInfo.ratings || userInfo.ratings.length === 0) &&
      !isLoading &&
      !document.fullscreenEnabled ? (
        ""
      ) : (
        <div className="w-full flex flex-col my-4 gap-y-1">
          <button
            onClick={() => {
              profileRef.current.requestFullscreen();
            }}
            className="border border-neutral-100 px-2 py-1 mx-auto"
          >
            View in fullsreen
          </button>
          <div className="text-xs italic text-center">
            (iPhones do not support this feature)
          </div>
        </div>
      )}
    </Layout>
  );
}

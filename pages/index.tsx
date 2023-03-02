import { useAppContext } from "@/components/appWrapper";
import Layout from "@/components/layout";
import ShareField from "@/components/shareField";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment, MutableRefObject, useRef, useState } from "react";

import axios, { AxiosError } from "axios";
import ProfileRate from "@/components/profileRate";

export default function Home() {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const { userInfo, session, updateUserInfo } = useAppContext();
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getUsername() {
    if (ref.current.value === "") {
      setUsernameMessage("This can't be empty");
      return;
    }
    const username = ref.current.value;
    try {
      const resp = await axios.post("/api/username", { username });
      if (resp.status === 200) {
        updateUserInfo();
      } else {
        setUsernameMessage(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setUsernameMessage(
          error.response?.data.message ||
            "An error occurred while checking the username."
        );
        // setUsernameMessage(error);
      } else {
        setUsernameMessage("An error occurred while checking the username.");
      }
    }
  }

  return (
    <Layout>
      <div className="flex h-full">
        <div className="m-auto flex flex-col gap-y-2">
          <div className="text-xl font-bold text-center">
            Rate yourself, and then others rate you.
          </div>
          {!session ? (
            <Fragment>
              <div className="text-xl text-center">Sign in to start rating</div>
              <Link
                href={`/auth`}
                className="text-xl font-bold text-center border px-2 py-1"
              >
                <button>Let&#39;s go!</button>
              </Link>
            </Fragment>
          ) : userInfo.username === "" || !userInfo.username ? (
            <div className="">
              <div>Select a username</div>
              <div className="text-sm text-red-600">{usernameMessage}</div>
              <form
                className="flex w-full"
                onSubmit={(e) => {
                  setIsLoading(true);
                  e.preventDefault();
                  getUsername();
                }}
              >
                <input
                  className="bg-neutral-900 border-neutral-100 border p-2 grow"
                  ref={ref}
                />
                <button
                  type="submit"
                  className="border grid w-12 bg-neutral-100 text-neutral-900"
                >
                  {isLoading ? (
                    <ArrowPathIcon className="w-8 h-8 m-auto animate-spin" />
                  ) : (
                    <CheckIcon className="w-8 h-8 m-auto" />
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-y-5 m-auto">
              <Link
                href={`/@${userInfo.username}`}
                className="text-3xl font-bold text-center border px-2 py-1 mx-auto"
              >
                <button>Rate yourself!</button>
              </Link>

              <ShareField
                message="Share your profile to your friends!"
                shareMessage="Check out my Mirror Rate Profile:"
              />
              <div className="text-xl font-bold text-center">
                Your current rating:
              </div>
              <ProfileRate userInfo={userInfo} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

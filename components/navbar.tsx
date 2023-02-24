import { Fragment, useEffect, useState } from "react";

import { doesSessionExist } from "supertokens-website";
import { useAppContext } from "@/components/appWrapper";
import Link from "next/link";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function Navbar() {
  const { userInfo, updateUserInfo, session, setSession } = useAppContext();
  async function updateSession() {
    setSession(await doesSessionExist());
  }

  async function clickSignOut() {
    await signOut();
    window.location.href = "/";
  }

  useEffect(() => {
    updateSession();
  }, []);
  useEffect(() => {
    if (session) {
      updateUserInfo();
    }
  }, [session]);

  return (
    <div className="flex justify-between bg-black py-2 px-4 h-16">
      <Link href="/" className="my-auto">
        <div>Mirror Rate</div>
      </Link>
      <div className="flex my-auto gap-x-2">
        {session ? (
          <Fragment>
            <Link href="/" className="border border-neutral-100 px-2 py-1">
              <div>@{userInfo.username}</div>
            </Link>
            <button
              className="border border-neutral-100 px-2 py-1"
              onClick={clickSignOut}
            >
              Sign Out
            </button>
          </Fragment>
        ) : (
          <Link href="/auth">
            <button className="border border-neutral-100 px-2 py-1">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

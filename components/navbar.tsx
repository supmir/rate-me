import { useEffect, useState } from "react";

import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import { doesSessionExist } from "supertokens-website";
import { useAppContext } from "@/components/appWrapper";
import Link from "next/link";

export default function Navbar() {
  const { userInfo, updateUserInfo, session, setSession } = useAppContext();
  async function updateSession() {
    setSession(await doesSessionExist());
  }
  async function getUserInfo() {
    const data = await fetch("/api/userinfo");
    updateUserInfo(await data.json());
  }

  function clickSignIn() {
    window.location.href = "/auth";
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
      getUserInfo();
    }
  }, [session]);

  return (
    <div className="flex justify-between bg-black py-2 px-4">
      <Link href="/" className="my-auto">
        <div>@{userInfo.username}</div>
      </Link>
      {session ? (
        <button
          className="border border-neutral-100 px-2 py-1"
          onClick={clickSignOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="border border-neutral-100 px-2 py-1"
          onClick={clickSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

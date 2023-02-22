import { useEffect, useState } from "react";

import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import { doesSessionExist } from "supertokens-website";

export default function Navbar() {
  const [session, setSession] = useState(false);
  async function updateSession() {
    setSession(await doesSessionExist());
  }

  function clickSignIn() {
    console.log("here");
    window.location.href = "/auth";
  }
  async function clickSignOut() {
    await signOut();
    window.location.href = "/";
  }

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <div className="flex justify-end bg-black py-2 px-4">
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

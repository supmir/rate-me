import { useAppContext } from "@/components/appWrapper";
import Layout from "@/components/layout";
import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MutableRefObject, useRef, useState } from "react";
export default function Home() {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const { userInfo, session } = useAppContext();
  const [usernameMessage, setUsernameMessage] = useState("");
  return (
    <Layout>
      {/* TODO: Username selection */}
      <div className="grid">
        {!session ? (
          <Link
            href={`/auth`}
            className="text-3xl font-bold text-center border m-auto px-2 py-1"
          >
            <button>Sign in First!</button>
          </Link>
        ) : userInfo.username === "" || !userInfo.username ? (
          <div className="mx-auto">
            <div>Select a username</div>
            <div className="text-sm text-red-600">{usernameMessage}</div>
            <div className="flex">
              <input
                className="bg-neutral-900 border-neutral-100 border p-2"
                ref={ref}
              />
              <button
                className="border grid w-12 bg-neutral-100 text-neutral-900"
                onClick={async () => {
                  const resp = await fetch(
                    `/api/username?username=${ref.current.value}`
                  );
                  if (resp.ok) {
                    window.location.href = "/";
                  } else {
                    setUsernameMessage("Username taken");
                  }
                  // TODO: refresh page error handling etc
                }}
              >
                <CheckIcon className="w-8 h-8 m-auto" />
              </button>
            </div>
          </div>
        ) : (
          <Link
            href={`/@${userInfo.username}`}
            className="text-3xl font-bold text-center border m-auto px-2 py-1"
          >
            <button>Rate yourself!</button>
          </Link>
        )}
        {/* TODO: link share */}
        {/* <div>
        <div>Share your link:</div>
      </div> */}
      </div>
    </Layout>
  );
}

import { useAppContext } from "@/components/appWrapper";
import Layout from "@/components/layout";
import { sleep } from "@/lib/site";
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { MutableRefObject, useRef, useState } from "react";
export default function Home() {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const { userInfo, session } = useAppContext();
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Layout>
      <div className="flex h-full">
        {!session ? (
          <Link
            href={`/auth`}
            className="text-3xl font-bold text-center border m-auto px-2 py-1"
          >
            <button>Sign in First!</button>
          </Link>
        ) : userInfo.username === "" || !userInfo.username ? (
          <div className="m-auto">
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
                  if (ref.current.value === "") {
                    setUsernameMessage("This can't be empty");
                    return;
                  }
                  const resp = await fetch(
                    `/api/username?username=${ref.current.value}`
                  );
                  if (resp.ok) {
                    window.location.href = "/";
                  } else {
                    setUsernameMessage("Username taken");
                  }
                }}
              >
                <CheckIcon className="w-8 h-8 m-auto" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-y-5 m-auto">
            <Link
              href={`/@${userInfo.username}`}
              className="text-3xl font-bold text-center border px-2 py-1 mx-auto"
            >
              <button>Rate yourself!</button>
            </Link>
            <div className="flex flex-col">
              <div className="mx-auto">Share your profile to your friends!</div>
              <button
                className="border p-2 rounded-xl mx-auto flex gap-x-2 select-none"
                onClick={async () => {
                  navigator.clipboard.writeText(
                    `https://mirrorrate.vercel.app/@${userInfo.username}`
                  );
                  setIsCopied(true);
                  await sleep(3000);
                  setIsCopied(false);
                }}
              >
                {`https://mirrorrate.vercel.app/@${userInfo.username}`}
                {isCopied ? (
                  <ClipboardDocumentCheckIcon className="h-6 w-6" />
                ) : (
                  <ClipboardDocumentIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        )}
        {/* TODO: link share */}
        {/* <div>
        <div>Share your link:</div>
      </div> */}
      </div>
    </Layout>
  );
}

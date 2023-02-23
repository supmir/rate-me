import { sleep } from "@/lib/site";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppContext } from "./appWrapper";

export default function ShareField(props: { message: string }) {
  const { userInfo } = useAppContext();
  const { message } = props;
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mx-auto">{message}</div>
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
  );
}
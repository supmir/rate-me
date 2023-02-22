import { AppWrapper } from "@/components/appWrapper";
import { frontendConfig } from "@/config/frontendConfig";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SuperTokensWrapper>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </SuperTokensWrapper>
  );
}

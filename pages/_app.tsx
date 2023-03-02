import { AppWrapper } from "@/components/appWrapper";
import { frontendConfig } from "@/config/frontendConfig";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SuperTokensWrapper>
      <AppWrapper>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6871496328627568"
          crossOrigin="anonymous"
        ></Script>
        <Component {...pageProps} />
      </AppWrapper>
    </SuperTokensWrapper>
  );
}

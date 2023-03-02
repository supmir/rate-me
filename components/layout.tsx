import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Navbar from "./navbar";

export default function Layout(props: any) {
  return (
    <div className="flex flex-col gap-y-2 h-screen">
      <Navbar />

      <Head>
        <title>Mirror Rate</title>
        <meta
          name="description"
          content="Rate yourself, then friends rate you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6871496328627568"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <div className="w-full h-full flex flex-col">
        <div className="p-2 w-full max-w-2xl mx-auto grow">
          {props.children}
        </div>
        {/* <div className="text-center p-4 bg-black min-h-12">
          <span className="my-auto">
            I&#39;m a solo developer, if you like what you see,{" "}
          </span>
          <span>
            <Link
              href="https://ko-fi.com/twitchy77"
              className="my-auto underline"
            >
              buy me a coffee
            </Link>
          </span>
        </div> */}
      </div>
    </div>
  );
}

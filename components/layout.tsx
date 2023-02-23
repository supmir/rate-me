import Head from "next/head";
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

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6871496328627568"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="w-full max-w-2xl mx-auto p-2 h-full overflow-y-scroll">
        {props.children}
      </div>
    </div>
  );
}

import Head from "next/head";
import Navbar from "./navbar";

export default function Layout(props: any) {
  return (
    <div className="grid gap-y-2">
      <Navbar />

      <Head>
        <title>Mirror Rate</title>
        <meta
          name="description"
          content="Rate yourself, then friends rate you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6871496328627568"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="w-full max-w-2xl mx-auto p-2">{props.children}</div>
    </div>
  );
}

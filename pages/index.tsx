import Layout from "@/components/layout";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO: Username selection */}
      <button className="text-3xl font-bold text-center w-full">
        <Link href="@user">Start rating yourself!</Link>
      </button>
      {/* TODO: link share */}
      {/* <div>
        <div>Share your link:</div>
      </div> */}
    </Layout>
  );
}

import Head from "next/head";

export default function UserRating() {
  const user = "Example User";
  const title = `Rate ${user}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className="text-3xl text-center">Rate {user}</h1>
    </>
  );
}

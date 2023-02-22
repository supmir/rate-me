import Slider from "@/components/slider";
import Head from "next/head";

export default function UserRating() {
  const user = "Example User";
  const title = `Rate ${user}`;
  const stats = [
    { statName: "Looks" },
    { statName: "Creativity" },
    { statName: "Humor" },
    { statName: "Mental Health" },
    { statName: "Empathy" },
    { statName: "Patience" },
    { statName: "Social Skills" },
    { statName: "Memory" },
  ];
  return (
    <div className="grid gap-y-2">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className="text-3xl text-center">Rate {user}</h1>
      <div className="grid gap-y-3">
        {stats.map(({ statName }) => {
          return <Slider statName={statName} />;
        })}
      </div>
      <button className="border border-neutral-100">RATE!</button>
    </div>
  );
}

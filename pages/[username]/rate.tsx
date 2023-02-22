import Layout from "@/components/layout";
import Slider from "@/components/slider";
import { statsList } from "@/types/userInfo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function UserRating() {
  const router = useRouter();
  const { username } = router.query;

  const title = `Rate ${username}`;

  const stats = statsList.map((statName) => {
    const [value, setValue] = useState<number>(0);

    return { statName: statName, value: value, setValue: setValue };
  });

  function rate() {
    const payload = {
      targetUser: username?.slice(1),
      rating: stats.map(({ statName, value }) => {
        return { statName: statName, value: value };
      }),
    };
    fetch("/api/rate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    window.location.href = `/${username}`;
  }

  return (
    <SessionAuth>
      <Layout>
        <div className="grid gap-y-4 select-none">
          <Head>
            <title>{title}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <h1 className="text-3xl text-center">Rate {username}</h1>
          <div className="grid gap-y-3">
            {stats.map(({ statName, value, setValue }, i) => {
              return (
                <Slider
                  statName={statName}
                  value={value}
                  setValue={setValue}
                  key={i}
                />
              );
            })}
          </div>
          <button className="border border-neutral-100" onClick={rate}>
            RATE!
          </button>
        </div>
      </Layout>
    </SessionAuth>
  );
}
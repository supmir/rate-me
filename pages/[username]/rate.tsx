import Layout from "@/components/layout";
import Slider from "@/components/slider";
import { statsList } from "@/types/userInfo";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function UserRating() {
  const router = useRouter();
  const { username } = router.query;

  const title = `Rate ${username}`;
  const [values, setValues] = useState<{ [key: string]: number }>({});
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  function updateValue(statName: string, new_value: number) {
    setValues({ ...values, [statName]: new_value });
  }

  const stats = statsList.map((statName) => {
    return {
      statName: statName,
      setValue: (new_value: number) => {
        updateValue(statName, new_value);
      },
    };
  });

  async function rate() {
    setLoading(true);
    const payload = {
      targetUser: username?.slice(1),
      rating: statsList.map((statName) => {
        return { statName: statName, value: values[statName] || 0 };
      }),
    };
    const resp = await axios.post("/api/rate", payload);
    if (resp.status === 200) {
      window.location.href = `/${username}`;
    } else {
      setMessage("An error has occured please try again later");
      setMessage(resp.data);
      setLoading(false);
    }
  }
  async function fetchUserInfo() {
    const data = await fetch(
      `/api/publicuserinfo?username=${username?.slice(1)}`
    );
    if (!data.ok) {
      router.push(`/${username}`);
    }
  }

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  return (
    <SessionAuth>
      <Layout>
        <div className="flex flex-col gap-y-4 select-none w-full">
          <Head>
            <title>{title}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <div className="text-2xl text-center max-w-full overflow-clip break-words">
            Rate {username}
          </div>
          <div className="grid gap-y-3">
            {stats.map(({ statName, setValue }, i) => {
              return (
                <Slider
                  statName={statName}
                  values={values}
                  setValue={setValue}
                  key={i}
                />
              );
            })}
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-red-600 text-center">{message}</div>
            <button
              className="border border-neutral-100"
              onClick={() => {
                rate();
              }}
            >
              {loading ? (
                <ArrowPathIcon className="w-8 h-8 m-auto animate-spin" />
              ) : (
                "RATE!"
              )}
            </button>
          </div>
        </div>
      </Layout>
    </SessionAuth>
  );
}

import Bar from "@/components/bar";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [userInfo, setUserInfo] = useState<[]>([]);

  async function fetchUserInfo() {
    const data = await fetch(
      `/api/publicuserinfo?username=${username?.slice(1)}`
    );
    const data_json = await data.json();
    setUserInfo(data_json);
  }

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  return (
    <Layout>
      <div className="text-3xl font-bold text-center">{username}'s profile</div>
      {userInfo.map(({ statName, value }) => {
        return <Bar statName={statName} value={value} />;
      })}
    </Layout>
  );
}

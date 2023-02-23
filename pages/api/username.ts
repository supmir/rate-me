// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { getUserById } from 'supertokens-node/recipe/thirdpartyemailpassword';

export default async function handler(
  req: SessionRequest,
  res: any
) {


  await superTokensNextWrapper(
    async (next) => {
      await verifySession()(req, res, next);
    },
    req,
    res
  )

  let userId = req.session!.getUserId();
  let email = (await getUserById(userId || ""))?.email || ""

  const { username } = req.query;
  const user = await db.collection("users").doc(userId).get()
  if (user.exists && (user.get("username") !== undefined)) {
    res.status(422).json({ message: "Username has been set before" })
    return
  }

  const snapshot = await db.collection("users").where("username", "==", username).get()

  const data = {
    username: username,
    email: email,
    self: {},
    average: {},
    count: 0
  }

  if (snapshot.empty) {
    if (user.exists) {
      db.collection("users").doc(userId).update(data)
    } else if (!user.exists) {
      db.collection("users").doc(userId).set(data)
    }
    res.status(200).json({ message: "Username set" })
  } else {
    res.status(422).json({ message: "Username taken" })
  }


}

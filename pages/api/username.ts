// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { getUserById } from 'supertokens-node/recipe/thirdpartyemailpassword';
import { Timestamp } from "firebase/firestore"

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

  const username = (req.body.username || "") as string;


  if (/[^a-zA-Z0-9._]/.test(username)) {
    res.status(422).json({ message: "Only letters, numbers, underscores and periods are allowed." })
    return
  }
  if (username.length < 4) {
    res.status(422).json({ message: "You gotta be friends with me if you want a username that short 😤" })
    return
  }



  const user = await db.collection("users").doc(userId).get()
  if (user.exists && (user.get("username") !== undefined)) {
    res.status(422).json({ message: "Username has been set before. Please refresh the page" })
    return
  }

  const snapshot = await db.collection("users").where("username_lowercase", "==", username.toLowerCase()).get()

  let data: { [key: string]: any } = {
    username: username,
    username_lowercase: username.toLowerCase(),
    email: email,
    self: {},
    average: {},
    count: 0,
    modifiedAt: Timestamp.now()
  }

  if (snapshot.empty) {
    if (user.exists) {
      db.collection("users").doc(userId).update(data)
    } else {
      data.createdAt = Timestamp.now()
      db.collection("users").doc(userId).set(data)
    }
    res.status(200).json({ message: "Username set" })
  } else {
    res.status(422).json({ message: "Username taken" })
  }


}

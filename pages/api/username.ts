// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = req.query;
  const snapshot = await db.collection("users").where("username", "==", username).get()

  if (snapshot.empty) {

    db.collection("users").doc("123").set({ username: username })
    res.status(200).json({ message: "Username set" })
  } else {
    res.status(422).json({ message: "Username taken" })
  }


}

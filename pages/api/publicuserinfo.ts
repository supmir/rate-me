// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { SessionRequest } from "supertokens-node/framework/express";

export default async function handler(
    req: SessionRequest,
    res: any
) {
    const { username } = req.query
    const snapshot = await db.collection("users").where("username", "==", username).get()

    if (!snapshot.empty) {
        res.status(200).json(snapshot.docs[0].data())
        // res.status(200).json([
        //     { statName: "Looks", value: 10 },
        //     { statName: "Creativity", value: 10 },
        //     { statName: "Humor", value: 10 },
        //     { statName: "Mental Health", value: 10 },
        //     { statName: "Empathy", value: 10 },
        //     { statName: "Patience", value: 10 },
        //     { statName: "Social Skills", value: 10 },
        //     { statName: "Memory", value: 10 },
        // ]
        // )
    } else {
        res.status(404).json({})
    }


}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { Rating, statsList } from '@/types/userInfo';

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
    const payload = JSON.parse(req.body)
    console.log(payload)
    const snapshot = await db.collection("users").where("username", "==", payload.targetUser).get()
    const targetUserId = snapshot.docs[0].id

    let ratings: { [key: string]: number } = {}
    for (const statName of statsList) {
        ratings[statName] = payload.rating.find((rate: Rating) => {
            return rate.statName === statName
        }).value
    }
    const data = {
        byUserId: userId,
        targetUserId: targetUserId,
        ratings: ratings,
    }

    await db.collection("ratings").add(data)

    res.status(200).json({ "message": "bruh" })


}

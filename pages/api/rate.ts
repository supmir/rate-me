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
    const snapshot = await db.collection("users").where("username", "==", payload.targetUser).get()
    const targetUser = snapshot.docs[0]
    const targetUserId = targetUser.id

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

    if (userId === targetUserId) {
        db.collection("users").doc(userId).update("self", ratings)
    } else {
        const count = targetUser.data().count || 0
        let new_average: { [key: string]: number } = {}
        for (const statName of statsList) {
            const cur_av = targetUser.data().average[statName] ? targetUser.data().average[statName] : 0
            console.log(statName, targetUser.data().average[statName], cur_av, count)

            new_average[statName] = (ratings[statName] + (cur_av * count)) / (count + 1)
        }
        console.log(new_average)
        db.collection("users").doc(targetUserId).update({
            average: new_average,
            count: count + 1
        })

    }

    res.status(200).json({ "message": "bruh" })


}

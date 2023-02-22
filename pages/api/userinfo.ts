// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";

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

    const user = await db.collection("users").doc(userId).get()
    if (user.exists) {
        res.status(200).json(user.data())
    } else {
        await db.collection("users").doc(userId).set({})
        res.status(200).json({})
    }


}

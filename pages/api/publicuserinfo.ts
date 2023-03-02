// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore as db } from '@/lib/firebase-util'
import { Rating, statsList, UserInfo } from '@/types/userInfo';
import { SessionRequest } from "supertokens-node/framework/express";

import supertokens from "supertokens-node";
import { backendConfig } from "@/config/backendConfig";
// import NextCors from "nextjs-cors";

supertokens.init(backendConfig());

export default async function handler(
    req: SessionRequest,
    res: any
) {
    const username = (req.query.username) as string
    if (!username) {
        res.status(404).json({})
    }

    const snapshot = await db.collection("users").where("username_lowercase", "==", username.toLowerCase()).get()

    if (!snapshot.empty) {
        const data = await snapshot.docs[0].data()
        const self: { [key: string]: number } = data.self || {}
        const average: { [key: string]: number } = data.average || {}
        const ratings: Array<Rating> = statsList.map((statName) => {
            return {
                statName: statName,
                self: self[statName] || 0,
                average: average[statName] || 0
            }
        })
        const userInfo: UserInfo = {
            username: data.username,
            ratings: ratings
        }


        res.status(200).json(userInfo)
    } else {
        res.status(404).json({})
    }


}

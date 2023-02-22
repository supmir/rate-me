
import ThirdPartyNode from 'supertokens-node/recipe/thirdparty'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";
// TODO: Generate own api keys https://supertokens.com/docs/thirdparty/nextjs/init step 5
export const backendConfig = (): TypeInput => {
    return {
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.com
            connectionURI: "https://dev-80e22a81b2af11ed8700c1806f55c5d8-ap-southeast-1.aws.supertokens.io:3572",
            apiKey: "iJVFOGK6FwVCf2mLsqp31fCoQn4RJk",
        },
        appInfo,
        recipeList: [
            ThirdPartyNode.init({
                signInAndUpFeature: {
                    providers: [
                        // We have provided you with development keys which you can use for testing.
                        // IMPORTANT: Please replace them with your own OAuth keys for production use.
                        ThirdPartyNode.Google({
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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",
                        }),
                        ThirdPartyNode.Github({
                            clientId: "467101b197249757c71f",
                            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                        }),
                        ThirdPartyNode.Apple({
                            clientId: "4398792-io.supertokens.example.service",
                            clientSecret: {
                                keyId: "7M48Y4RYDL",
                                privateKey:
                                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                                teamId: "YWQCXGJRJL",
                            },
                        }),
                        // ThirdPartyNode.Facebook({
                        //   clientSecret: "FACEBOOK_CLIENT_SECRET",
                        //   clientId: "FACEBOOK_CLIENT_ID",
                        // }),
                    ],
                }
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    }
}

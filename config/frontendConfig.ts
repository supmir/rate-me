
import ThirdPartyReact, { Google, Facebook } from 'supertokens-auth-react/recipe/thirdparty'
import ThirdPartyReactEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            ThirdPartyReactEmailPasswordReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyReact.Google.init(),
                        // ThirdPartyReact.Facebook.init(),
                        // ThirdPartyReact.Apple.init(),
                        // ThirdPartyReact.Github.init(),
                    ],
                },
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href)
                    },
                },
            }
        },
    }
}

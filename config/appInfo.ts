const port = process.env.APP_PORT || 3000

const apiBasePath = '/api/auth/'

export const websiteDomain =
    process.env.APP_URL ||
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NODE_ENV === "production" ?
        "https://mirrorrate.vercel.app"
        :
        `http://localhost:${port}`

export const appInfo = {
    appName: 'rate-me',
    websiteDomain,
    apiDomain: websiteDomain,
    apiBasePath,
}
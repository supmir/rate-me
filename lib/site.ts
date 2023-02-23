export const sleep = (t: number) => new Promise((s) => setTimeout(s, t));

export function share(
    title: string, text: string, url: string
) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        return "Shared"
    } else {
        navigator.clipboard.writeText(
            `${text}\n${title}\n${url}`
        );
        return "Copied"
    }
}
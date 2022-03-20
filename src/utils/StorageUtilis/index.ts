import Cookie from 'js-cookie'

export const ACCESS_TOKEN = `jwt_token`


export function getCookie(key: string) {
    return Cookie.get(key)
}


export function setCookie(key: string, value: string) {
    Cookie.set(key, value, {
        expires: 30,
        path: '/'
    })
}


export function getAccessToken() {
    return getCookie(ACCESS_TOKEN)
}


export function setAccessToken(accessToken: string) {
    setCookie(ACCESS_TOKEN, accessToken)
}


export function clearUserSession() {
    Cookie.remove(ACCESS_TOKEN, { path: '/' })
}
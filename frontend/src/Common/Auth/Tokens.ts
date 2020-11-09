export const getAccessToken = () => {
    return localStorage.getItem('actk')
}

export const setAccessToken = (token: string) => {
    localStorage.setItem('actk', token)
}

export const getRefreshToken = () => {
    return localStorage.getItem('rftk')
}

export const setRefreshToken = (token: string) => {
    localStorage.setItem('rftk', token)
}
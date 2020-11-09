import axios, {AxiosError} from 'axios'
import { getRefreshToken, getAccessToken ,setAccessToken } from 'Common/Auth/Tokens'

export const refreshAccessToken = async () => {
  const API_REFRESH_TOKEN =  `http://${process.env.REACT_APP_BACKEND}/api/auth/refresh_token`

  const newAccessToken = await axios.get(API_REFRESH_TOKEN, {
    headers: {
      'Authorization': `Bearer ${getRefreshToken()}`
    }}).catch((err: AxiosError) => {
      console.log(err.response)
      // refresh token has expired
      return err.response
    })

  setAccessToken(newAccessToken?.data.access_token)
  return newAccessToken
}

export const userRequset = async () => {
  const API_USER = `http://${process.env.REACT_APP_BACKEND}/api/auth/user`

  const response = await axios.get(API_USER, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
  }}).catch((err: AxiosError) => {
    return err.response
  })

  return response
}
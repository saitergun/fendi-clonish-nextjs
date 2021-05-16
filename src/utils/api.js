import axios from 'axios'
// import cookie from 'js-cookie'

const IS_BROWSER = typeof window !== 'undefined'

// set api instance
const API = axios.create({
  baseURL: process.env.API_HOST
})

// set authorization
// set saved access token
// const savedToken = IS_BROWSER && cookie.get(process.env.COOKIE_NAME_JWT)

// if (savedToken) {
//   API.defaults.headers.common.Authorization = `Bearer ${savedToken}`
// }

// export const setAuthorization = (jwt) => {
//   if (jwt) {
//     cookie.set(process.env.COOKIE_NAME_JWT, jwt)

//     API.defaults.headers.common.Authorization = `Bearer ${jwt}`
//   }
// }

// export const removeAuthorization = () => {
//   cookie.remove(process.env.COOKIE_NAME_JWT)

//   delete API.defaults.headers.common.Authorization
// }

export default API

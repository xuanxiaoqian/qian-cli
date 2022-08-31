import http from '@/utils/http'
import * as T from './types'

const loginApi: T.LoginApi = {
  login(params) {
    return http.post('/login', params)
  }
}
export default loginApi

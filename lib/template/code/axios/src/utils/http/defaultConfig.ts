import { AxiosRequestConfig } from 'axios'

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    tokenValue: localStorage.getItem('tokenValue') ?? '',
    'Content-Type': 'application/json;charset=UTF-8',
  }
}

export default defaultConfig

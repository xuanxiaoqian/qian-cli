import Axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

import defaultConfig from './defaultConfig'

export class Interceptors {
  public instance: AxiosInstance

  constructor() {
    this.instance = Axios.create(defaultConfig)

    this.init()
  }

  init() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (err: AxiosError) => {
        console.log(err)
        return Promise.reject(err)
      },
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return Promise.resolve(response)
      },
      (err: AxiosError) => {
        console.log(err)
        return Promise.reject(err)
      },
    )
  }

  getInterceptors() {
    return this.instance
  }
}
const instance = new Interceptors().getInterceptors()

export default instance

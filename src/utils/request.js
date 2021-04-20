/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-20 22:27:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) { "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQYWluQXNodXJhIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjE4MzE1NDgyfQ.nF08dBESGfhdl6nlOXdA7paur0qhFAn84r5mr0ZMRAU"
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const request = {
  post(url, params) {
    return service.post(url, params, {
        transformRequest: [(params) => {
            return tansParams(params)
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
  },
  postFd(url, params) {
      return service.post(url, params, {
          transformRequest: [(params) => {
              return tansParams(params)
          }],
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
  },
  postNormal(url, params) {
      return service.post(url, params);
  },
  put(url, params) {
      return service.put(url, params, {
          transformRequest: [(params) => {
              return tansParams(params)
          }],
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
  },
  putNormal(url, params) {
      return service.put(url, params);
  },
  get(url, params) {
    return service.get(url, {params}, {
        transformRequest: [(params) => {
            return tansParams(params)
        }],
    });
  },
  delete(url, params) {
      let _params
      if (Object.is(params, undefined)) {
          _params = ''
      } else {
          _params = '?'
          for (const key in params) {
              // eslint-disable-next-line no-prototype-builtins
              if (params.hasOwnProperty(key) && params[key] !== null) {
                  _params += `${key}=${params[key]}&`
              }
          }
      }
      return service.delete(`${url}${_params}`)
  },
  delNormal(url, params) {
      return service.delete(url, {data:params});
  },
}

function tansParams(params) {
  let result = ''
  Object.keys(params).forEach((key) => {
      if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
      }
  })
  return result
}

export default request

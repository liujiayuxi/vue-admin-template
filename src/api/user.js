/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-20 22:16:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\user.js
 */
import request from '@/utils/request'

export function login(params = {}) {
  return request.postNormal('/library/auth/login', params)
}

export function getInfo(username, params = {}) {
  return request.get(`/library/auth/success/${username}`, params)
}

export function logout(params = {}) {
  return request.postNormal('/library/auth/logout', params)
}

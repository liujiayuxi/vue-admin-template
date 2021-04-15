/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-13 21:48:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/library/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token, username) {
  return request({
    url: `/library/auth/success/${username}`,
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function logout(token) {
  return request({
    url: '/library/auth/logout',
    method: 'post',
    headers: { 'Authorization': token }
  })
}

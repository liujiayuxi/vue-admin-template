/*
 * @Author: your name
 * @Date: 2021-04-19 13:37:54
 * @LastEditTime: 2021-04-20 22:40:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\singleInfo.js
 */
import request from '@/utils/request'

export function checkStudentNum(studentNum, params = {}) {
  return request.get(`/library/auth/checkStudent/${studentNum}`, params)
}

export function getSingleInfo(id, params = {}) {
    return request.get(`/library/auth/info/${id}`, params)
  }

  export function editInfo(params = {}) {
    return request.putNormal('/library/auth/edit', params)
  }
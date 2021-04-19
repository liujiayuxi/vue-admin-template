/*
 * @Author: your name
 * @Date: 2021-04-19 13:37:54
 * @LastEditTime: 2021-04-19 13:46:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\singleInfo.js
 */
import request from '@/utils/request'

export function getSingleInfo(token, id) {
    return request({
      url: `/library/auth/info/${id}`,
      method: 'get',
      headers: { 'Authorization': token }
    })
  }
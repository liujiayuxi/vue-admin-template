/*
 * @Author: your name
 * @Date: 2021-04-22 22:37:28
 * @LastEditTime: 2021-04-22 22:42:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\borrowListApi.js
 */
import request from '@/utils/request'

// 查询借还类型
export function searchRecordsType(params = {}) {
  return request.get('/library/borrowBook/status', params)
}
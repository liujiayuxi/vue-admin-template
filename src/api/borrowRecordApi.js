/*
 * @Author: your name
 * @Date: 2021-04-22 21:51:49
 * @LastEditTime: 2021-04-28 19:44:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\borrowRecord.js
 */
import request from '@/utils/request'

// 查询借还类型
export function searchRecordsType(params = {}) {
  return request.get('/library/borrowBook/status', params)
}

// 查询图书类型
export function searchBookRecords(params = {}) {
  return request.get('/library/borrowBook/list', params)
}

// 借还记录-批准/拒绝申请
export function handleRequest(params = {}) {
  return request.putNormal('/library/borrowBook/approval', params)
}

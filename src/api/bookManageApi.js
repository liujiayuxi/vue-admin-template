/*
 * @Author: your name
 * @Date: 2021-04-21 18:48:33
 * @LastEditTime: 2021-04-21 18:51:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\bookManageApi.js
 */
import request from '@/utils/request'

// 查询图书类型
export function searchBookType(params = {}) {
  return request.get('/library/bookSort/list', params)
}

// 查询图书状态
export function searchBookStatus(params = {}) {
    return request.get('/library/book/status', params)
  }
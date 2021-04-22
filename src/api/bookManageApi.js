/*
 * @Author: your name
 * @Date: 2021-04-21 18:48:33
 * @LastEditTime: 2021-04-22 13:44:07
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

// 查询图书列表
export function searchBookList(params = {}) {
    return request.get('/library/book/list', params)
}

// 下架（删除）图书
export function deleteBook(id, params = {}) {
    return request.delete(`/library/book/remove/${id}`, params)
}

// 上架（添加）图书
export function addBook(params = {}) {
    return request.postNormal('/library/book/add', params)
}
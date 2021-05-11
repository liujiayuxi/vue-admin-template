/*
 * @Author: your name
 * @Date: 2021-05-11 11:30:39
 * @LastEditTime: 2021-05-11 21:08:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\ruleManage.js
 */
import request from '@/utils/request'

// 分页查询规则
export function ruleList( params = {}) {
    return request.get(`/library/rule/list`, params)
}

// 新增借书规则
export function addRule(params = {}) {
    return request.postNormal('/library/rule', params)
  }

// 删除借书规则
export function deleteRule(id, params = {}) {
    return request.delNormal(`/library/rule/${id}`, params)
  }

// 修改借书规则
export function editRule(params = {}) {
  return request.putNormal('/library/rule', params)
}
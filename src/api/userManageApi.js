/*
 * @Author: LikSeven
 * @Date: 2021-04-22 19:46:33
 * @LastEditTime: 2021-04-22 21:37:58
 * @LastEditors: LikSeven
 * @Description: 
 * @FilePath: \vue-admin-template\src\api\userManageApi.js
 * 下面的代码没有bug!!!
 */
import request from '@/utils/request'

export function userList( params = {}) {
    return request.get(`/library/user/list`, params)
}

export function addUser(params = {}) {
    return request.postNormal('/library/user/add', params)
}

export function editUser(params = {}) {
    return request.putNormal('/library/user/edit', params)
}

export function resetPwd(id,params = {}) {
    return request.putNormal(`/library/user/resetPassword/${id}`, params)
}

export function delUser(ids,params = {}) {
    return request.delete(`/library/user/${ids}`, params)
}

export function ruleList( params = {}) {
    return request.get(`/library/rule/list`, params)
}
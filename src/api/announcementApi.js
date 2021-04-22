/*
 * @Author: your name
 * @Date: 2021-04-22 22:51:35
 * @LastEditTime: 2021-04-22 23:20:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\announcementApi.js
 */
import request from '@/utils/request'

// 查询公告
export function searchAnnouncementList(params = {}) {
  return request.get('/library/announcement/list', params)
}

// 新增公告
export function addAnnouncement(params = {}) {
    return request.postNormal('/library/announcement/add', params)
  }

// 删除公告
export function deleteAnnouncement(id, params = {}) {
    return request.delNormal(`/library/announcement/remove/${id}`, params)
  }
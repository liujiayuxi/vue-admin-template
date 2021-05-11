/*
 * @Author: your name
 * @Date: 2021-04-13 19:03:10
 * @LastEditTime: 2021-05-11 11:31:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\api\index.js
 */
import * as singleInfoApi from './singleInfoApi';
import * as bookManageApi from './bookManageApi';
import * as userApi from './user';
import * as borrowRecordApi from './borrowRecordApi';
import * as userManageApi from './userManageApi';
import * as announcementApi from './announcementApi';
import * as ruleManageApi from './ruleManageApi';


export default {
    singleInfoApi,
    bookManageApi,
    userApi,
    borrowRecordApi,
    userManageApi,
    announcementApi,
    ruleManageApi
}
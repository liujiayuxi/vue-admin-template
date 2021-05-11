/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-05-11 19:21:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user
  },
  getters
})

export default store

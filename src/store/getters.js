/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-05-11 19:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters

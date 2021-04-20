/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-20 21:42:04
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
  // userInfo: state => state.user.userInfo,
}
export default getters

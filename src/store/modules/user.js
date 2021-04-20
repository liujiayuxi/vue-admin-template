/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-20 22:18:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\store\modules\user.js
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { authorizationValue } from '@/settings'

const getDefaultState = () => {
  return {
    token: getToken(),
    // userInfo: '',
    id: '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_USER: (state, userObj) => {
  //   state.userInfo = userObj
  // },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { identity, password, loginType } = userInfo
    return new Promise((resolve, reject) => {
      login({ identity: identity.trim(), password: password, loginType: loginType}).then(response => {
        commit('SET_TOKEN', authorizationValue + response.token)
        commit('SET_NAME', response.username)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.name).then(response => {
        console.log(response)
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        console.log(data)

        // const { name, avatar } = data

        // commit('SET_NAME', name)SET_ID
        // commit('SET_USER', data.userInfo)
        commit('SET_ID', data.userInfo.id)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


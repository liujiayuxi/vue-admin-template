/*
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-13 19:21:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\utils\validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * PainAshura => admin管理员
 */
export function validUsername(str) {
  const valid_map = ['PainAshura', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

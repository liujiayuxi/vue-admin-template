import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

{
    path: '/changePassword',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'changePassword',
        component: () => import('@/views/changePassword/index'),
        meta: { title: '修改密码', icon: 'password' }
      },
    ]
  },

  {
    path: '/singleInfo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'singleInfo',
        component: () => import('@/views/singleInfo/index'),
        meta: { title: '个人信息', icon: 'password' }
      },
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/info',
    children: [{
        path: 'info',
        name: 'info',
        component: () => import('@/views/libraryInfo/index'),
        meta: { title: '图书馆信息', icon: 'el-icon-document-copy' }
      }]
  },
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
      path: '/dashboard',
      component: Layout,
      meta: { title: '图书管理', icon: 'dashboard', roles: ['superAdmin'] },
      children: [
        {
          path: 'index',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '图书管理', icon: 'dashboard', roles: ['superAdmin'] }
        },
        {
          path: 'add-book',
          name: 'Dashboard',
          hidden: true,
          component: () => import('@/views/dashboard/views/add-book.vue'),
          meta: { title: '图书管理', icon: 'dashboard', roles: ['superAdmin'] }
        },
      ]
  },

  {
    path: '/form',
    component: Layout,
    prems: 'superAdmin',
    meta: { title: '用户管理', icon: 'user', roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '用户管理', icon: 'user', roles: ['superAdmin'] }
      }
    ]
  },
  
  {
    path: '/records',
    component: Layout,
    meta: { title: '借还记录', icon: 'link', roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        name: 'records',
        component: () => import('@/views/records/index'),
        meta: { title: '借还记录', icon: 'link', roles: ['superAdmin'] }
      }
    ]
  },

  {
    path: '/announcement',
    component: Layout,
    meta: { title: '公告管理', icon: 'eye-open', roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: () => import('@/views/announcement/index'),
        meta: { title: '公告管理', icon: 'eye-open', roles: ['superAdmin'] }
      }
    ]
  },

  {
    path: '/admin-rules',
    component: Layout,
    meta: { title: '读者规则', icon: 'table', roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        name: 'Admin-rules',
        component: () => import('@/views/adminrules/index'),
        meta: { title: '读者规则', icon: 'table', roles: ['superAdmin'] }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    prems: 'normal',
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '查询图书', icon: 'dashboard', roles: ['normal'] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/search/index'),
        meta: { title: '查询图书', icon: 'dashboard', roles: ['normal'] }
      },
    ]
  },

  {
    path: '/list',
    component: Layout,
    meta: { title: '借还列表', icon: 'link', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'List',
        component: () => import('@/views/list/index'),
        meta: { title: '借还列表', icon: 'link', roles: ['normal'] }
      }
    ]
  },

  {
    path: '/announce-reader',
    component: Layout,
    meta: { title: '查看公告', icon: 'eye-open', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'Announcement-reader',
        component: () => import('@/views/announcereader/index'),
        meta: { title: '查看公告', icon: 'eye-open', roles: ['normal'] }
      }
    ]
  },

  {
    path: '/rules',
    component: Layout,
    meta: { title: '读者规则', icon: 'table', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'Rules',
        component: () => import('@/views/rules/index'),
        meta: { title: '读者规则', icon: 'table', roles: ['normal'] }
      }
    ]
  },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

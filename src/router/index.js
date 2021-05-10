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

  {
      path: '/dashboard',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '图书管理', icon: 'dashboard' }
        },
        {
          path: 'add-book',
          name: 'Dashboard',
          hidden: true,
          component: () => import('@/views/dashboard/views/add-book.vue'),
          meta: { title: '图书管理', icon: 'dashboard' }
        },
      ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  
  {
    path: '/records',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'records',
        component: () => import('@/views/records/index'),
        meta: { title: '借还记录', icon: 'link' }
      }
    ]
  },

  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: () => import('@/views/announcement/index'),
        meta: { title: '公告管理', icon: 'eye-open' }
      }
    ]
  },

  {
    path: '/admin-rules',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Admin-rules',
        component: () => import('@/views/adminrules/index'),
        meta: { title: '读者规则', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/edit-user',
  //   name: 'edit-user',
  //   component: () => import('@/views/form/edit-user.vue'),
  //   meta: { title: '用户管理', icon: 'user' }
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '操作', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/search/index'),
        meta: { title: '查询图书', icon: 'dashboard' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/buy/index'),
      //   meta: { title: '购买图书', icon: 'form' }
      // },
      // {
      //   path: 'borrow',
      //   name: 'borrow',
      //   component: () => import('@/views/borrow/index'),
      //   meta: { title: '借阅图书', icon: 'link' }
      // },
      // {
      //   path: 'give',
      //   name: 'give',
      //   component: () => import('@/views/give/index'),
      //   meta: { title: '归还图书', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/list',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'List',
        component: () => import('@/views/list/index'),
        meta: { title: '借还列表', icon: 'link' }
      }
    ]
  },

  {
    path: '/rules',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Rules',
        component: () => import('@/views/rules/index'),
        meta: { title: '读者规则', icon: 'table' }
      }
    ]
  },

  {
    path: '/announce-reader',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement-reader',
        component: () => import('@/views/announcereader/index'),
        meta: { title: '查看公告', icon: 'eye-open' }
      }
    ]
  },

  
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

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

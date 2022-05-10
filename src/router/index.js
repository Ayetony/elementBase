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
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    name: 'dashboard',
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '数据汇总',
      icon: 'dashboard'
    }
  }]
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/testpaper',
    component: Layout,
    children: [{
      name: 'testpaper',
      path: '',
      component: () => import('@/views/testpaper/index'),
      meta: {
        title: '试卷管理',
        icon: 'el-icon-s-order',
        roles: ['teacher']
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      name: 'user',
      path: '',
      component: () => import('@/views/user/index'),
      meta: {
        title: '用户管理',
        icon: 'el-icon-user-solid',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/adminuser',
    component: Layout,
    redirect: '/adminuser',
    children: [{
      name: 'adminuser',
      path: '',
      component: () => import('@/views/admin-user/index'),
      meta: {
        title: '管理员管理',
        icon: 'el-icon-s-platform',
        roles: ['admin']
      }
    }]
  },
  // {
  //   path: '/roles',
  //   component: Layout,
  //   redirect: '/roles',
  //   children: [{
  //     name: 'roles',
  //     path: '',
  //     component: () => import('@/views/roles/index'),
  //     meta: {
  //       title: '角色管理',
  //       icon: 'el-icon-menu',
  //       roles: ['admin']
  //     }
  //   }]
  // },
  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    name: 'system',
    meta: { title: '系统设置', icon: 'el-icon-s-tools', roles: ['admin'] },
    children: [
      {
        path: 'about',
        component: () => import('@/views/system/about'),
        name: 'about',
        meta: { title: '关于我们' }
      },
      {
        path: 'config',
        component: () => import('@/views/system/config'),
        name: 'config',
        meta: { title: '小程序设置' }
      }
    ]
  },
]

/**
 * 这里是静态权限，全局都会显示
 */
const createRouter = () => new Router({
  // mode: 'history', // 路由的模式暂时使用hash兼容性高点  history需要后端配合
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

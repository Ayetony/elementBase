# elemtentBase
整体说明


## [element-admin线上官方预览地址](https://panjiachen.github.io/vue-element-admin/#/dashboard)

## 读前必看！！！

使⽤vue-element-admin之前建议先阅读[⼿摸⼿，带你⽤vue撸后台](https://juejin.cn/post/6844903476661583880)

## 后台管理端推荐使用模板
[vue-admin-template-permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)
此模板带基础的角色权限控制，简单的后台管理权限足够了

## 关于使用[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)的说明

    * 推荐使用i18n分支
    * 项目开发过程中可以参考此模板的功能ctrl+c ctrl+v到基础模板中
    * 基于element-ui风格统一
    * 可以快速搭建一套功能齐全的后端管理

## 目录结构说明
[整体结构<-查看官方说明->](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
> 重点目录说明
* src(开发目录)
    * api   （所有数据的请求接⼝，建议已模块划分结构）
    * components （全局公⽤组件）
    * filters （全局过滤器）
    * router (路由,建议已模块划分结构)
    * store (状态管理Vuex,建议已模块划分结构)
    * utils (常⽤⼯具类,网络请求，公用验证，cookie存储...)

## 编码规范指南
已官方为主-->[官方风格指南](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/style-guide.html#%E9%A3%8E%E6%A0%BC%E6%8C%87%E5%8D%97)

## 项目登陆--->首页代码逻辑说明
1. 点击登录
2. 调⽤ user/login -> dispatch("user/login")
3. 在store action中调⽤ api login -> 设置全局token -> 成功（设置stroe的token，cookie中的token）->跳转到根路由/
4. 触发全局路由守卫（前置 ） router.beforeach
5. 调⽤store permission模块取得需要鉴权的对应⻆⾊的路由
6. 把对应的路由地址对象插⼊到vm.router中
7. next({ ... to, replace:true}) 先替换所有路由，然后继续⾛⼀遍beforeach直到next()
8. ⻚⾯展示

## 项目中实现一个后端api请求
1. 在@/src/api文件夹中创建test.js
2. 引入import request from '@/utils/request'
3. 测试环境修改根目录下的.env.development中VUE_APP_BASE_API为api的基础url
4. 在@/src/api/test.js中创建方法testRequest调用@/utils/request的request
5. views中页面或组件中先引入在调用test.js的testRequest

## 关于本项目中的测试数据说明
----->[查看mock接口数据](https://www.apifox.cn/apidoc/shared-ed8f3e0c-d463-4834-8c24-b53d1b593f75/api-18951077)

接口测试软件apifox
项目中基于apifox的mock接口可在mock中获取**element.apifox.json**

## element-ui表单可视化快速生成工具

### [Form Generator ](https://mrhj.gitee.io/form-generator/#/)

## DEMO-试卷管理实现流程

> 1、@/src/views/ 下创建testpaper目录
-------
> 2、@/src/views/testpaper 下创建index.vue做为此模块的page视图
-------
> 3、在[vue-element-admin](https://panjiachen.github.io/vue-element-admin/#/dashboard)中找到类似的页面这里已[@/src/views/table/complex-table.vue]为例
-------
> 4、在@/src/router/index.js添加页面路由，这里把testpaper做为动态路由
```
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
  }
]
```
-------
> 5、@/src/api/ 创建test-paper.js文件的api接口
```
import request from '@/utils/request'

export function paperList(token) {
  return request({
    url: '/paperlist',
    method: 'get',
    params: { token }
  })
}
```
-------
> 6、在@/src/views/table/complex-table.vue引入@/api/test-paper使用
```
import { paperList } from '@/api/test-paper'
paperList({ page:1,pageSize:20 }).then(response => {
        const { data } = response     
 })
```
-------
> 7、如果需要请求中加入header头token信息，修改 @/src/utils/request.js文件中的方法
```
service.interceptors.request.use(
  config => {
    // 请求之前配置
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    //请求错误回调
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
```
-------
> 8、如果需要请求中加入header头token信息，修改 @/src/utils/request.js文件中的方法
-------

## 项目测试环境运行
```
#### clone the project
git clone https://github.com/Ayetony/elementBase.git

#### 进入文件夹
cd elementBase

#### 安装依赖
npm install

#### 运行测试环境
npm run dev
```







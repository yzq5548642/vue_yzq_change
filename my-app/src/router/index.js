import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'//1、创建路由
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import pageA from '../views/pageA.vue'
import pageB from '../views/pageB.vue'

Vue.use(VueRouter)

//router的使用
//1、创建路由
//2、将路由与组件进行映射
//3、创建router实例
//4、挂载到根节点上，在main.js中

const routes = [//2、将路由与组件进行映射
    //主路由
    {
        path: '/',
        component: Main,
        redirect:'/home',//重定向，让他自动跳转到首页
        children: [
            //子路由
            { path: 'home', component: Home },
            { path: 'user', component: User },
            { path: 'mall', component: Mall },
            { path: 'page1', component: pageA },
            { path: 'page2', component: pageB },
        ]
    },
]

const router = new VueRouter({//3、创建router实例
    mode:'history',
    routes // (缩写) 相当于 routes: routes
})

export default router


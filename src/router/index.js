import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/Main'
import login from '@/components/login'
import content from '@/components/content_manage/content'
import contenttwo from '@/components/content_manage/contenttwo'
import user from '@/components/user_manage/user'
import usertwo from '@/components/user_manage/usertwo'
import fenxi from '@/components/fenxi/fenxi'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path:'/',
    	name:'login',
    	component:login
    }
    ,{
      path: '/main',
      name: 'main',
      component: main,
      children:[
      	{
	      path: '/',
	      title: '首页',
	      name: '/main/home',
	      component: home
	    },
      	{
	      path: '/main/content',
	      title: '内容管理',
	      name: 'content',
	      component: content
	    },
	    {
	      path: '/main/contenttwo',
	      title: '内容管理',
	      name: 'contenttwo',
	      component: contenttwo
	    },
	    {
	      path: '/main/user',
	      title: '用户管理',
	      name: 'user',
	      component: user
	    },
	    {
	      path: '/main/usertwo',
	      title: '用户管理2',
	      name: 'usertwo',
	      component: usertwo
	    },
	    {
	      path: '/main/fenxi',
	      title: '分析管理',
	      name: 'fenxi',
	      component: fenxi
	    }
      ]
    }
    
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import labels from '@/components/labels'
import file from '@/components/file'
import oneLabel from '@/components/oneLabel'
import details from '@/components/details'
import mark from '@/components/markdown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },    
    {
      path: '/labels',
      name: 'labels',
      component: labels      
    },
    {
      path: '/file',
      name: 'file',
      component: file      
    }, 
    {
      path: '/oneLabel/:id',
      name: 'oneLabel',
      component: oneLabel      
    },
    {
      path: '/details',
      name: 'details',
      component: details      
    },
    {
      path: '/mark',
      name: 'mark',
      component: mark      
    }    
  ]
})

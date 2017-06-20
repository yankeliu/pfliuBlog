import Vue from 'vue'
import Router from 'vue-router'
import articleList from '@/components/articleList'
import newArticle from '@/components/newArticle'
import articleDetails from '@/components/articleDetails'
import labelsList from '@/components/labelsList'
import draftList from '@/components/draftList'
import labelDetails from '@/components/labelDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: articleList
    },
    {
      path: '/newArticle',
      name: 'newArticle',
      component: newArticle
    },    
    {
      path: '/artDetails/:index',
      name: 'artDetails',
      component: articleDetails
    },
    {
      path: '/labelDetails/:id',
      name: 'labelDetails',
      component: labelDetails
    },    
    {
      path: '/labelsList',
      name: 'labelsList',
      component: labelsList
    }, 
    {
      path: '/draftList',
      name: 'draftList',
      component: draftList
    }    
  ]
})

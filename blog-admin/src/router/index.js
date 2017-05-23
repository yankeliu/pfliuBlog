import Vue from 'vue'
import Router from 'vue-router'
import articleList from '@/components/articleList'
import newArticle from '@/components/newArticle'
import articleDetails from '@/components/articleDetails'
import labelsList from '@/components/labelsList'

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
      path: '/labelsList',
      name: 'labelsList',
      component: labelsList
    }    
  ]
})

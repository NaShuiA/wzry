import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main'
import Login from '../components/login.vue'
import CategoryEdit from '../components/categories/CategoryEdit'
import CategoryList from '../components/categories/CategoryList'

import ItemEdit from '../components/item/ItemEdit.vue'
import ItemList from '../components/item/ItemList.vue'

// 英雄
import HeroEdit from '../components/heroes/HeroEdit'
import HeroList from '../components/heroes/HeroList'

import ArticleEdit from '../components/articles/ArticleEdit'
import ArticleList from '../components/articles/ArticleList'

import AdsEdit from '../components/ads/AdsEdit'
import AdsList from '../components/ads/AdsList'

import AdminUserEdit from '../components/users/adminUserEdit'
import AdminUserList from '../components/users/adminUserList'
Vue.use(VueRouter)

  const routes = [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true},
      { path: '/categories/list', component: CategoryList },
      // 物品
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true},
      { path: '/items/list', component: ItemList },
      // 英雄
      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true},
      { path: '/heroes/list', component: HeroList },
       // 文章
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true},
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true},
      { path: '/ads/list', component: AdsList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true},
      { path: '/admin_users/list', component: AdminUserList }
    ]
  }
]


const router = new VueRouter({
  routes
})
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router

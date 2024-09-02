import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import HomeView from '@/views/HomeView.vue'
import FAQView from '@/views/static/FAQView.vue'
import OrderShippingView from '@/views/static/OrderShippingView.vue'
import AboutView from '@/views/static/AboutView.vue'
import PrivacyPolicyView from '@/views/static/PrivacyPolicyView.vue'
import TermsConditionsView from '@/views/static/TermsConditionsView.vue'
import ContactUsView from '@/views/static/ContactUsView.vue'
import DesignersView from '@/views/DesignersView.vue'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import WishlistView from '@/views/WishlistView.vue'
import CartView from '@/views/CartView.vue'
import PageNotFoundView from '@/views/static/PageNotFoundView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AccountView from '@/views/AccountView.vue'
import AccountDetailView from '@/views/AccountDetailView.vue'
import OrderView from '@/views/OrderView.vue'
import AddressView from '@/views/AddressView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/account',
      redirect: 'account/account-detail',
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
        {
          path: 'faq',
          name: 'faq',
          component: FAQView,
        },
        {
          path: 'order-shipping',
          name: 'order-shipping',
          component: OrderShippingView,
        },
        {
          path: 'privacy-policy',
          name: 'privacy-policy',
          component: PrivacyPolicyView,
        },
        {
          path: 'terms-conditions',
          name: 'terms-conditions',
          component: TermsConditionsView,
        },
        {
          path: 'contact-us',
          name: 'contact-us',
          component: ContactUsView,
        },
        {
          path: 'designers',
          name: 'designers',
          component: DesignersView,
        },
        {
          path: 'product-list',
          name: 'product-list',
          component: ProductListView,
        },
        {
          path: 'product-detail',
          name: 'product-detail',
          component: ProductDetailView,
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: WishlistView,
        },
        {
          path: 'cart',
          name: 'cart',
          component: CartView,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'page-not-found',
          component: PageNotFoundView,
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView,
        },
        {
          path: 'order-detail',
          name: 'order-detail',
          component: OrderDetailView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account',
          name: 'account',
          component: AccountView,
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              path: 'account-detail',
              name: 'account-detail',
              component: AccountDetailView,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'order',
              name: 'order',
              component: OrderView,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'address',
              name: 'address',
              component: AddressView,
              meta: {
                requiresAuth: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

function isAuthenticated() {
  return localStorage.getItem('KPublicToken') != null
}

export default router

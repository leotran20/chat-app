import {createRouter, createWebHistory} from 'vue-router';
import {useUserStore} from '@/stores/UserStore.js';

const routes = [
    {
        path: '/login', name: 'Login',
        components: {
            auth: () => import('@/views/LoginView.vue'),
        },
    },
    {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
        alias: '/home',
        children: [
            {
                path: '',
                redirect: 'messages',
            },
            {
                path: 'messages',
                name: 'Messages',
                component: () => import('@/views/MessagesView.vue'),
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('@/views/AboutView.vue'),
            },
        ],
        meta:{
            requiresAuth: true,
        }
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound', redirect: {name: 'Home'},
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        return {name: 'Login'};
    }
});

export default router;

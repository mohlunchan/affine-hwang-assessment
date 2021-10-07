const routes = [
    {
        path: '/',
        component: () => import('@/views/customer/list.vue')
    },
    {
        path: '/:id(\\d+)',
        name: 'user-details',
        props: true,
        component: () => import('@/views/customer/details.vue')
    },
    {
        path: '/add',
        name: 'user-add',
        props: true,
        component: () => import('@/views/customer/details.vue')
    },
    // {
    //     path: '/add',
    //     name: 'user-details',
    //     component: () => import('@/views/customer/details.vue')
    // }
]

export default routes
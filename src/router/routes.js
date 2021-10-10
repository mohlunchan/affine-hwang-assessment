const routes = [
    {
        path: '', redirect: '/customers',
    },
    {
        path: '/customers',
        name: 'customer-list',
        component: () => import('@/views/customer/list.vue')
    },
    {
        path: '/customer',
        name: 'customer',
        component: () => import('@/views/customer/details/index.vue'),
        children: [
            {
                path: ':id',
                name: 'customer-details',
                component: () => import('@/views/customer/details/update.vue')
            },
            {
                path: 'create',
                name: 'customer-create',
                component: () => import('@/views/customer/details/create.vue')
            },
        ]
    },
    {
        path: '/:id(4\\d{2})',
        component: () => import('@/views/error.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default routes
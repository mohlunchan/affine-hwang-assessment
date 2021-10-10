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
]

export default routes
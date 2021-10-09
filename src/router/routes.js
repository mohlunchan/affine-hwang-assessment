const routes = [
    {
        path: '/',
        name: 'customer-list',
        component: () => import('@/views/customer/list.vue')
    },
    {
        path: '/:id',
        name: 'customer-details',
        component: () => import('@/views/customer/details.vue')
    },
    {
        path: '/add',
        name: 'customer-add',
        component: () => import('@/views/customer/details.vue')
    },
]

export default routes
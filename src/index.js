import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        name: '', 
        component: () => import('./components/Sample.vue')
    },
    {
        path: '/assets',
        name: 'assets', 
        component: () => import('./components/Sample.vue')
    },
    {
        path: '/asset-creation',
        name: 'assetCreation', 
        component: () => import('./components/AssetCreation.vue')
    },
    {
        path: '/history',
        name: 'history', 
        component: () => import('./components/History.vue')
    },
    {
        path: '/store',
        name: 'store', 
        component: () => import('./components/Store.vue')
    },
    {
        path: '/department',
        name: 'department', 
        component: () => import('./components/Department.vue')
    },
    {
        path: '/supplier',
        name: 'supplier', 
        component: () => import('./components/Supplier.vue')
    },
    {
        path: '/assetType',
        name: 'assetType', 
        component: () => import('./components/AssetType.vue')
    },
    {
        path: '/storeCreation',
        name: 'storeCreation', 
        component: () => import('./components/StoreCreation.vue')
    },
    {
        path: '/departmentCreation',
        name: 'departmentCreation', 
        component: () => import('./components/DepartmentCreation.vue')
    },
    {
        path: '/supplierCreation',
        name: 'supplierCreation', 
        component: () => import('./components/SupplierCreation.vue')
    },
];
  
const router = new VueRouter({
    routes,
});

export default router;

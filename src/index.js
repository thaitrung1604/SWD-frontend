import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        name: 'login', 
        component: () => import('./components/Login.vue')
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
    {
        path: '/minuteOfHandover',
        name: 'minuteOfHandover', 
        component: () => import('./components/MinuteOfHandover.vue')
    },
    {
        path: '/minuteCreation',
        name: 'minuteCreation', 
        component: () => import('./components/MinuteCreation.vue')
    },
    {
        path: '/supplierUpdate',
        name: 'supplierUpdate', 
        component: () => import('./components/SupplierUpdate.vue')
    },
    {
        path: '/storeUpdate',
        name: 'storeUpdate', 
        component: () => import('./components/StoreUpdate.vue')
    },
    {
        path: '/departmentUpdate',
        name: 'departmentUpdate', 
        component: () => import('./components/DepartmentUpdate.vue')
    },
    {
        path: '/assetUpdate',
        name: 'assetUpdate', 
        component: () => import('./components/AssetUpdate.vue')
    },
    {
        path: '/userCreation',
        name: 'userCreation', 
        component: () => import('./components/UserCreation.vue')
    },
    {
        path: '/userUpdate',
        name: 'userUpdate', 
        component: () => import('./components/UserUpdate.vue')
    },
];
  
const router = new VueRouter({
    routes,
});

export default router;

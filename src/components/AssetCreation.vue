<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-plus"></i>
                    Thêm mới tài sản
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Giá tài sản</p>
                        <el-input type="text" v-model="newAsset.price" require></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Tên tài sản</p>
                        <el-input type="text" v-model="newAsset.name"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Phân loại</p>
                        <el-select v-model="selectedType" placeholder="Select">
                            <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Nhà cung cấp</p>
                        <el-select v-model="selectedSupplier" placeholder="Select">
                            <el-option
                            v-for="item in supplierList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã người quản lý</p>
                        <el-select v-model="selectedUser" placeholder="Select">
                            <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã phòng ban quản lý</p>
                        <el-select v-model="selectedDepartment" placeholder="Select">
                            <el-option
                            v-for="item in departmentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã cửa hàng</p>
                        <el-select v-model="selectedStore" placeholder="Select">
                            <el-option
                            v-for="item in storeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Trạng thái</p>
                        <el-select v-model="selectedStatus" placeholder="Select">
                            <el-option
                            v-for="item in statusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày nhập tài sản</p>
                        <el-date-picker type="date" format="yyyy-MM-dd" v-model="newAsset.purchaseDate"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày bảo hành</p>
                        <el-date-picker type="date" format="yyyy-MM-dd" v-model="newAsset.nextWarrantyDate"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày hết hạn bảo hành</p>
                        <el-date-picker type="date" format="yyyy-MM-dd" v-model="newAsset.expiryWarrantyDate"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="width: 202px">
                        
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <p>Mô tả tài sản</p>
                        <el-input type="textarea" style="width: 500px" v-model="newAsset.description"></el-input>
                    </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container>
        <el-container style="background: #FAFAFA;">
            <el-row class="button-container">
                <el-button type="primary" @click="insertAsset">Thêm mới</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';
import { MessageBox } from 'element-ui';
import axios from "axios";

export default {
    name: 'assetCreation',
    components: {
        Menu,
    },
    data() {
        return {
            newAsset: {
                name:'',
                description:'',
                price:'',
                purchaseDate:'',
                expiryWarrantyDate:'',
                nextWarrantyDate:'',
                type:{
                    id:''
                },
                status:{
                    id:''
                },
                department:{
                    id:''
                },
                supplier:{
                    id:''
                },
                store:{
                    id:''
                },
                user:{
                    id:''
                }
            },
            typeList: [],
            supplierList: [],
            statusList: [],
            departmentList: [],
            storeList: [],
            userList: [],
            selectedType: '',
            selectedSupplier: '',
            selectedStatus: '',
            selectedDepartment: '',
            selectedStore: '',
            selectedUser: '',

        }
    },
    mounted() {
        this.getAssetTypes();
        this.getSuppliers();
        this.getStatus();
        this.getDepartments();
        this.getStores();
        this.getUsers();
    },
    methods: {
        getAssetTypes() {
            axios({
                method: 'GET',
                url: `http://localhost:8080/api/v1/types`
                }).then(
                result => {
                    this.typeList = result.data;
                    this.selectedType = this.typeList[0].id;
                },
                error => {
                    console.error(error);
                }
            )
        },
        getSuppliers() {
            axios({
                method: 'GET',
                url: `http://localhost:8080/api/v1/suppliers`
            }).then(
                result => {
                    this.supplierList = result.data.content;
                    this.selectedSupplier = this.supplierList[0].id;
                },
                error => {
                    console.error(error);
            })
        },
        getStatus() {
            axios({
                method: 'GET',
                url: `http://localhost:8080/api/v1/statuses`
            }).then(
                result => {
                    this.statusList = result.data;
                    this.selectedStatus = this.statusList[0].id;
                },
                error => {
                    console.error(error);
                })
        },
        getDepartments() {
            axios({
            method: 'GET',
            url: `http://localhost:8080/api/v1/departments`
            }).then(
            result => {
                this.departmentList = result.data.content;
                this.selectedDepartment = this.departmentList[0].id;
            },
            error => {
                console.error(error);
            }
            )
        },
        getStores() {
            axios({
            method: "GET",
            url: `http://localhost:8080/api/v1/stores`
            }).then(
            result => {
                this.storeList = result.data.content;
                this.selectedStore = this.storeList[0].id;
            },
            error => {
                console.error(error);
            }
            ) 
        },
        getUsers() {
            axios({
            method: "GET",
            url: `http://localhost:8080/api/v1/users`
            }).then(
            result => {
                this.userList = result.data.content;
                this.selectedUser = this.userList[0].id;
            },
            error => {
                console.error(error);
            }
            ) 
        },
        validateAsset() {
            var matcher = new RegExp(`^(?!0*[.,]0*$|[.,]0*$|0*$)\\d+[,.]?\\d{0,2}$`, 'g');
            let price = this.newAsset.price;
            let name = this.newAsset.name;
            let nextWarrantyDate = this.newAsset.nextWarrantyDate;
            let expiryWarrantyDate = this.newAsset.expiryWarrantyDate;
            let purchaseDate = this.newAsset.purchaseDate;
            let isValidPrice = matcher.test(price);

            if (!price || !name || !isValidPrice || !nextWarrantyDate || !expiryWarrantyDate || !purchaseDate) {
                return false;
            }

            return true;
        },
        insertAsset() {
            this.newAsset.type.id = this.selectedType;
            this.newAsset.supplier.id = this.selectedSupplier;
            this.newAsset.status.id = this.selectedStatus;
            this.newAsset.department.id = this.selectedDepartment;
            this.newAsset.store.id = this.selectedStore;
            this.newAsset.user.id = this.selectedUser;

            if (!this.validateAsset()) {
                MessageBox.alert('Xin vui lòng điền đầy đủ thông tin tài sản hợp lệ!', 'Thông báo', {
                    confirmButtonText: 'Đóng'
                });
            } else {
                console.log(this.validateAsset());
                axios({
                    method: 'POST',
                    url: `http://localhost:8080/api/v1/assets`,
                    data: this.newAsset,
                }).then(
                    result => {
                        if (result.data) {
                            MessageBox.alert('Thêm mới thành công!', 'Thông báo', {
                                confirmButtonText: 'Đóng'
                            });
                        }
                    },
                    error => {
                        console.error(error);
                        MessageBox.alert('Thêm mới thất bại. Vui lòng thử lại!', 'Thông báo', {
                            confirmButtonText: 'Đóng'
                        });
                    }
                )
            }
        },
    },
}
</script>

<style scoped>
    .grid-content{
        text-align: left;
        margin-left: 30px;
    }
    .el-aside {
        height: 636px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select {
        width: 202px;
    }
    .button-container {
        width: 100%;
        margin: 30px;
    }
</style>
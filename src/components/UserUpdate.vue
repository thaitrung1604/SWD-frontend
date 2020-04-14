<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-edit"></i>
                    Chỉnh sửa thông tin
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
            <el-row style="margin-left: 30px;">
                <el-input
                    style="width: 50%; float: left"
                    placeholder="Type something"
                    prefix-icon="el-icon-search"
                    v-model="searchValue">
                </el-input>
                <el-button icon="el-icon-search" primary @click="searchUser">Tìm kiếm</el-button>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Tên truy cập</p>
                        <el-input type="text" disabled v-model="newUser.account.username"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Mật khẩu (nhập nếu thay đổi)</p>
                        <el-input type="text" show-password maxlength = "20" v-model="newUser.account.password"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Họ tên</p>
                        <el-input type="text" v-model="newUser.name"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Số điện thoại</p>
                        <el-input type="text" v-model="newUser.phone"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Email</p>
                        <el-input type="text" v-model="newUser.email"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
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
            </el-row>
        </el-container>
        <!-- <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container> -->
        <!-- <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container> -->
        <el-container style="background: #FAFAFA;">
            <el-row class="button-container">
                <el-button type="primary" @click="insertUser">Cập nhật</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';

export default {
    name: 'userUpdate',
    components: {
        Menu,
    },
    data() {
        return {
            newUser: {
                name:'',
                phone:'',
                email:'',
                account:{
                    username:'',
                    password:''
                },
                role:{
                    id:"2"
                },
                store: {
                    id: '',
                }
            },
            storeList: [],
            selectedStore: '',
            searchValue: '',
        }
    },
    mounted() {
        this.getStores();
    },
    methods: {
        validate() {
            var name, email, phone, username, password, checkPhone, checkEmail;
            name = this.newUser.name;
            email = this.newUser.email;
            phone = this.newUser.phone;
            username = this.newUser.account.username;
            password = this.newUser.account.password;
            
            var matcher1 = new RegExp(`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`);
            var matcher = new RegExp(`[0-9]{10}`);
            checkPhone = matcher.test(phone);
            checkEmail = matcher1.test(email);
            if (!name || !checkEmail || !checkPhone || !username) {
                return false;
            }
            if (password && password.length < 5) {
                return false;
            }

            return true;
        },
        insertUser() {
            this.newUser.store.id = this.selectedStore;
            if (this.validate()) {
                axios({
                    method: 'PUT',
                    url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/admin/users/${this.searchValue}`,
                    data: this.newUser,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
                    }
                }).then(
                    result => {
                        if (result.data) {
                            MessageBox.alert('Chỉnh sửa thành công!', 'Thông báo', {
                                confirmButtonText: 'Đóng'
                            });
                        }
                    },
                    error => {
                        console.error(error);
                        MessageBox.alert('Chỉnh sửa thất bại. Vui lòng thử lại!', 'Thông báo', {
                            confirmButtonText: 'Đóng'
                        });
                    }
                )
            } else {
                MessageBox.alert('Xin vui lòng điền đầy đủ thông tin hợp lệ!', 'Thông báo', {
                    confirmButtonText: 'Đóng'
                });
            }
        },
        searchUser() {
            const self = this;
            axios({
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/users/${this.searchValue}`,
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
            }
            }).then(
            result => {
                self.newUser.account.username = result.data.account.username;
                self.newUser.name = result.data.name;
                self.newUser.phone = result.data.phone;
                self.newUser.email = result.data.email;
                self.selectedStore = result.data.store.id;
            },
            ).catch(function(error) {
                if (error.response && error.response.status === 404) {
                    MessageBox.alert('Người dùng không tồn tại', 'Thông báo', {
                        confirmButtonText: 'Đóng'
                    });
                }
            })
        },
        getStores() {
            axios({
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/stores`,
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
            }
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
    },
}
</script>

<style scoped>
    .grid-content{
        text-align: left;
        margin-left: 30px;
    }
    .el-input, .el-input__inner, .el-select {
        width: 304px;
    }
    .button-container {
        width: 100%;
        margin: 30px;
    }
    .el-aside {
        height: 680px;
    }
</style>
<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-edit"></i>
                    Chỉnh sửa cửa hàng
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
                <el-button icon="el-icon-search" primary @click="searchStore">Tìm kiếm</el-button>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Tên cửa hàng</p>
                        <el-input type="text" v-model="newStore.name"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Địa chỉ</p>
                        <el-input type="text" v-model="newStore.address"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Số điện thoại</p>
                        <el-input type="text" v-model="newStore.phone"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container>
        <!-- <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container> -->
        <el-container style="background: #FAFAFA;">
            <el-row class="button-container">
                <el-button type="primary" @click="insertStore">Cập nhật</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';

export default {
    name: 'storeUpdate',
    components: {
        Menu,
    },
    data() {
        return {
            newStore: {
                name: '',
                address: '',
                phone: '',
            },
            searchValue: '',
        }
    },
    methods: {
        validate() {
            var name, address, phone, checkPhone;
            name = this.newStore.name;
            address = this.newStore.address;
            phone = this.newStore.phone;
            
            var matcher = new RegExp(`[0-9]{10}`);
            checkPhone = matcher.test(phone);
            if (!name || !address || !checkPhone) {
                return false;
            }

            return true;
        },
        insertStore() {
            if (this.validate()) {
                axios({
                    method: 'PUT',
                    url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/admin/stores/${this.searchValue}`,
                    data: this.newStore,
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
                MessageBox.alert('Xin vui lòng điền đầy đủ thông tin!', 'Thông báo', {
                    confirmButtonText: 'Đóng'
                });
            }
        },
        searchStore() {
        const self = this;
        axios({
          method: "GET",
          url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/stores/${this.searchValue}`
          ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
          }
        }).then(
          result => {
            self.newStore.name = result.data.name;
            self.newStore.address = result.data.address;
            self.newStore.phone = result.data.phone;
          },
        ).catch(function (error) {
            if (error.response && error.response.status === 404) {
              MessageBox.alert('Cửa hàng không tồn tại', 'Thông báo', {
                confirmButtonText: 'Đóng'
              });
              self.tableData = [];
            }
        })
      },
    },
}
</script>

<style scoped>
    .grid-content{
        text-align: left;
        margin-left: 30px;
    }
    .el-input, .el-input__inner {
        width: 304px;
    }
    .button-container {
        width: 100%;
        margin: 30px;
    }
    .el-aside {
        height: 542px;
    }
</style>
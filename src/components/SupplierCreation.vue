<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-plus"></i>
                    Thêm mới nhà cung cấp
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Tên nhà cung cấp</p>
                        <el-input type="text" v-model="newSupplier.name"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Email</p>
                        <el-input type="text" v-model="newSupplier.email"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Số điện thoại</p>
                        <el-input type="text" v-model="newSupplier.phone"></el-input>
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
                <el-button type="primary" @click="insertSupplier">Thêm mới</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';

export default {
    name: 'supplierCreation',
    components: {
        Menu,
    },
    data() {
        return {
            newSupplier: {
                name: '',
                email: '',
                phone: '',
            }
        }
    },
    methods: {
        validate() {
            var matcher1 = new RegExp(`^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`);
            var matcher2 = new RegExp(`[0-9]{10}`);
            var name, checkEmail, checkPhone;

            name = this.newSupplier.name;
            checkPhone = matcher2.test(this.newSupplier.phone);
            checkEmail = matcher1.test(String(this.newSupplier.email).toLowerCase());

            if (!name || !checkEmail || !checkPhone) {
                return false;
            }

            return true;
        },
        insertSupplier() {
            if (this.validate()) {
                axios({
                    method: 'POST',
                    url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/admin/suppliers`,
                    data: this.newSupplier,
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
                    }
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
            } else {
                MessageBox.alert('Xin vui lòng điền đầy đủ thông tin!', 'Thông báo', {
                    confirmButtonText: 'Đóng'
                });
            }
        }
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
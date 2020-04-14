<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-plus"></i>
                    Tạo biên bản bàn giao
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Mã tài sản</p>
                        <el-select v-model="selectedAsset" placeholder="Select">
                            <el-option
                            v-for="item in assetList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <!-- <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Người bàn giao</p>
                        <el-select v-model="selectedPreUser" placeholder="Select">
                            <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </el-container> -->
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>Người tiếp quản</p>
                        <el-select v-model="selectedCurrentUser" placeholder="Select">
                            <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
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
                <el-button type="primary" @click="insertMinute">Thêm mới</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';
import axios from 'axios';
import { MessageBox } from 'element-ui';

export default {
    name: 'minuteCreation',
    components: {
        Menu,
    },
    data() {
        return {
            newMinute: {
                assetId: '',
                // previousUserId: '',
                currentUserId: '',
            },
            userList: [],
            assetList: [],
            // selectedPreUser: '',
            selectedCurrentUser: '',
            selectedAsset: '',
        }
    },
    mounted() {
        this.getUsers();
        this.getAssetsData();
    },
    methods: {
        validate() {
            var assetId, currentUserId;
            assetId = this.selectedAsset;
            // previousUserId = this.selectedPreUser;
            currentUserId = this.selectedCurrentUser;
            
            if (!assetId || !currentUserId) {
                return false;
            }

            return true;
        },
        getUsers() {
            axios({
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/users`
            ,headers: {
                "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
            }
            }).then(
            result => {
                this.userList = result.data.content;
                // this.selectedCurrentUser = this.userList[0].id;
                this.selectedPreUser = this.userList[0].id;
            },
            error => {
                console.error(error);
            }
            ) 
        },
        getAssetsData() {
            axios({
                method: "GET",
                url: "https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/assets"
                ,headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
                } 
            }).then(
                result => {
                const self = this;
                self.assetList = result.data.content;

                self.assetList.map((el) => {
                    el.purchaseDate = el.purchaseDate.substring(0,10);
                    el.expiryWarrantyDate = el.expiryWarrantyDate.substring(0,10);
                    el.nextWarrantyDate = el.nextWarrantyDate.substring(0,10);
                    return el;
                });
                self.selectedAsset = self.assetList[0].id;
                },
                error => {
                console.error(error);
                }
            );
        },
        insertMinute() {
            this.newMinute.assetId = this.selectedAsset;
            this.newMinute.currentUserId = this.currentUserId;
            // this.newMinute.currentUserId = this.selectedCurrentUser;
            if (this.validate()) {
                axios({
                    method: 'POST',
                    url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/minuteofhandovers`,
                    data: this.newMinute,
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
                MessageBox.alert('Xin vui lòng điền đầy đủ thông tin hợp lệ!', 'Thông báo', {
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
    .el-input, .el-input__inner , .el-select {
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
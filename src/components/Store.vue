<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-s-shop"></i> Danh mục cửa hàng
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchStore">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id" label="Mã cửa hàng" width="200"></el-table-column>
          <el-table-column prop="name" label="Tên cửa hàng" width="250"></el-table-column>
          <el-table-column prop="address" label="Địa chỉ" width="250"></el-table-column>
          <el-table-column prop="phone" label="Số điện thoại" width="200"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import axios from "axios";
import Menu from './Menu.vue';
import { MessageBox } from 'element-ui';

export default {
    name: 'store',
    components: {
        Menu,
    },
    data () {
      return {
        tableData: [],
        searchValue: '',
      }
    },
    mounted() {
      this.getStores();
    },
    methods: {
      getStores() {
        axios({
          method: "GET",
          url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/stores`
          ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
          }
        }).then(
          result => {
            this.tableData = result.data.content;
          },
          error => {
            console.error(error);
          }
        ) 
      },
      handleDuplicate() {
        this.getStores();
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
            let tableTmp = [];
            tableTmp.push(result.data);
            this.tableData = tableTmp;
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
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }
</style>
<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-truck"></i> Danh mục nhà cung cấp
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchSupplier">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id" label="Mã nhà cung cấp" width="200">
          </el-table-column>
          <el-table-column prop="name" label="Tên nhà cung cấp" width="200"></el-table-column>
          <el-table-column prop="email" label="E-mail" width="200"></el-table-column>
          <el-table-column prop="phone" label="Số điện thoại" width="200"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Menu from './Menu.vue';
import axios from "axios";
import { MessageBox } from 'element-ui';

export default {
    name: 'supplier',
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
      this.getSuppliers();
    },
    methods: {
      getSuppliers() {
        axios({
          method: 'GET',
          url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/suppliers`,
          headers: {
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
        this.getSuppliers();
      },
      searchSupplier() {
        const self = this;
        axios({
          method: 'GET',
          url: `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/suppliers/${self.searchValue}`
          ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
          }
        }).then(
          result => {
            let tableTmp = [];
            tableTmp.push(result.data);
            self.tableData = tableTmp;
          },
        ).catch(function (error) {
          if (error.response && error.response.status === 404) {
              MessageBox.alert('Nhà cung cấp không tồn tại', 'Thông báo', {
                confirmButtonText: 'Đóng'
              });
              self.tableData = [];
            }
        })
      }
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
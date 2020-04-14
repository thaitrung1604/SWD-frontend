<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-s-building"></i> Danh mục phòng ban
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchDepartment">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id" label="Mã phòng ban" width="200"></el-table-column>
          <el-table-column prop="name" label="Tên phòng ban" width="250"></el-table-column>
          <el-table-column prop="email" label="E-mail" width="250"></el-table-column>
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
    name: 'department',
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
      this.getDepartments();
    },
    methods: {
      getDepartments() {
        axios({
          method: 'GET',
          url: `https://assetmanagementapi.herokuapp.com/api/v1/departments`
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
        this.getDepartments();
      },
      searchDepartment() {
        const self = this;
        axios({
          method: 'GET',
          url: `https://assetmanagementapi.herokuapp.com/api/v1/departments/${this.searchValue}`
        }).then(
          result => {
            let tableTmp = [];
            tableTmp.push(result.data);
            this.tableData = tableTmp;
          },
        ).catch(function (error) {
          console.log(error.response.status);
          
          if (error.response && error.response.status === 404) {
              MessageBox.alert('Phòng ban không tồn tại', 'Thông báo', {
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
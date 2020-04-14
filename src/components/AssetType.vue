<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-s-goods"></i> Danh mục loại tài sản
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchAssetType">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id" label="Mã loại tài sản" width="500">
          </el-table-column>
          <el-table-column prop="name" label="Loại tài sản" width="500"></el-table-column>
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
    name: 'assetType',
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
      this.getAssetTypes();
    },
    methods: {
      getAssetTypes() {
        axios({
          method: 'GET',
          url: `http://localhost:8080/api/v1/types`
        }).then(
          result => {
            this.tableData = result.data;
          },
          error => {
            console.error(error);
          }
        )
      },
      handleDuplicate() {
        this.getAssetTypes();
      },
      searchAssetType() {
        const self = this;
        axios({
          method: 'GET',
          url: `http://localhost:8080/api/v1/types/${this.searchValue}`
        }).then(
          result => {
            let tableTmp = [];
            if (Array.isArray(result.data)) {
              result.data.forEach(element => {
                tableTmp.push(element);
              });
            } else if (result.data && !Array.isArray(result.data)){
              tableTmp.push(result.data);
            }
            this.tableData = tableTmp;
          },
        ).catch(function (error) {
          if (error.response && error.response.status === 404) {
              MessageBox.alert('Loại tài sản không tồn tại', 'Thông báo', {
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
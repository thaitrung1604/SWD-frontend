<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-tickets"></i> Phiếu bàn giao
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchMinute">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="Ngày thực hiện" width="250"></el-table-column>
          <el-table-column prop="createBy" label="Người thực hiện" width="250"></el-table-column>
          <el-table-column prop="assetId" label="Mã tài sản" width="200"></el-table-column>
          <el-table-column prop="currentStoreId" label="Cửa hàng hiện tại" width="200"></el-table-column>
          <el-table-column prop="previousStoreId" label="Cửa hàng bàn giao" width="200"></el-table-column>
          <el-table-column prop="currentUserId" label="Người tiếp quản" width="200"></el-table-column>
          <el-table-column prop="previousUserId" label="Người bàn giao" width="200"></el-table-column>
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
    name: 'minuteOfHandover',
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
      this.getMinutes();
    },
    methods: {
      getMinutes() {
          const self = this;
        axios({
          method: "GET",
          url: `http://localhost:8080/api/v1/minuteofhandovers`
        }).then(
          result => {
            self.tableData = result.data.content;

            self.tableData.map((el) => {
                el.date = el.date.substring(0,10);

                return el;
            })
          },
          error => {
            console.error(error);
          }
        ) 
      },
      handleDuplicate() {
        this.getMinutes();
      },
      searchMinute() {
        const self = this;
        axios({
          method: "GET",
          url: `http://localhost:8080/api/v1/minuteofhandovers/${this.searchValue}`
        }).then(
          result => {
            let tableTmp = [];
            tableTmp.push(result.data);
            this.tableData = tableTmp;

            self.tableData.map((el) => {
                el.date = el.date.substring(0,10);

                return el;
            })
          },
        ).catch(function (error) {
            if (error.response && error.response.status === 404) {
              MessageBox.alert('Biên bản không tồn tại', 'Thông báo', {
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
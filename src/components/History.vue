<template>
    <el-container style="height: 500px; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-tickets"></i> Lịch sử tài sản
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="searchDate" style="width: 50%; float: left"></el-date-picker>
        <el-button icon="el-icon-search" primary @click="searchHistory">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData" height="310">
          <el-table-column prop="date" label="Ngày thực hiện" width="200"></el-table-column>
          <el-table-column prop="createBy" label="Mã người thực hiện" width="250">
          </el-table-column>
          <el-table-column prop="assetId" label="Mã tài sản" width="200"></el-table-column>
          <el-table-column prop="statusId" label="Trạng thái" width="200"></el-table-column>
          <el-table-column prop="departmentId" label="Mã phòng ban" width="200"></el-table-column>
          <el-table-column prop="userId" label="Mã người quản lý" width="200"></el-table-column>
          <el-table-column prop="nextWarrantyDate" label="Ngày bảo hành" width="200"></el-table-column>
          <el-table-column prop="expiryWarrantyDate" label="Hạn bảo hành" width="200"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Menu from './Menu.vue';
import axios from "axios";

export default {
    name: 'history',
    components: {
        Menu,
    },
    data () {
      return {
        tableData: [],
        statusList: ['Good', 'Bad', "Repairing"],
        searchDate: '',
      }
    },
    mounted() {
      this.getHistories();
    },
    methods: {
      getHistories() {
        const self = this;
        axios({
          method: "GET",
          url: "http://localhost:8080/api/v1/histories"
        }).then(
          result => {
            self.tableData = result.data.content;

            self.tableData.map((el) => {
              el.date = el.date.substring(0,10);
              el.expiryWarrantyDate = el.expiryWarrantyDate.substring(0,10);
              el.nextWarrantyDate = el.nextWarrantyDate.substring(0,10);
              el.statusId = self.statusList[el.statusId - 1];

              return el;
            })
          },
          error => {
            console.error(error);
          }
        );
      },
      handleDuplicate() {
        this.getHistories();
      },
      searchHistory() {
        const self = this;
        console.log(self.searchDate);
        
        axios({
          method: "GET",
          url: `http://localhost:8080/api/v1/histories?page=0&size=10&sortBy=date&sortOrder=DESC&searchBy=date&searchValue=${this.searchDate}`
        }).then(
          result => {
            self.tableData = result.data.content;

            self.tableData.map((el) => {
              el.date = el.date.substring(0,10);
              el.expiryWarrantyDate = el.expiryWarrantyDate.substring(0,10);
              el.nextWarrantyDate = el.nextWarrantyDate.substring(0,10);
              el.statusId = self.statusList[el.statusId - 1];
              
              return el;
            })
          },
          error => {
            console.error(error);
          }
        );
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
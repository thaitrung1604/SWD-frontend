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
        <el-input
          style="width: 30%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="searchDate" style="width: 30%; float: left; margin-left: 10px;"></el-date-picker>
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
        searchValue: '',
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
          url: "https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/histories"
          ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
          }
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
        var url = '';
        
        if (self.searchDate && !self.searchValue) {
          url = `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/histories?page=0&size=10&sortBy=date&sortOrder=DESC&searchBy=date&searchValue=${this.searchDate}`;
        } else if (self.searchValue && !self.searchDate) {
          url = `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/histories?page=0&size=10&searchBy=asset_id&searchValue=${self.searchValue}`
        } else if (self.searchDate && self.searchValue) {
          url = `https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/histories?page=0&size=10&searchBy=asset_id&searchValue=${self.searchValue}`
        }      
        axios({
          method: "GET",
          url: url
          ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
          }
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
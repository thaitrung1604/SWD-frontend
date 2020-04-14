
<template>
  <el-container style="height: 500px; width: 100%; border: 1px solid #eee;">
    <Menu @handleDuplicateMenu="handleDuplicate"/>
    <el-container>
      <el-row>
        <p style="font-weight: bold; font-size: 28px; text-align: left">
          <i class="el-icon-s-management"></i> Danh mục sản phẩm
        </p>
      </el-row>
      <el-header style="text-align: right; font-size: 12px">
        <el-input
          style="width: 50%; float: left"
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button icon="el-icon-search" primary @click="searchAsset">Tìm kiếm</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData" height="310">
          <el-table-column prop="id" label="Mã tài sản" width="100">
          </el-table-column>
          <el-table-column prop="name" label="Tên tài sản" width="100"></el-table-column>
          <el-table-column prop="description" label="Mô tả" width="200"></el-table-column>
          <el-table-column prop="price" label="Giá tiền" width="100"></el-table-column>
          <el-table-column prop="purchaseDate" label="Ngày nhập" width="150"></el-table-column>
          <el-table-column prop="nextWarrantyDate" label="Ngày bảo hành" width="200"></el-table-column>
          <el-table-column prop="expiryWarrantyDate" label="Hạn bảo hành" width="200"></el-table-column>
          <el-table-column prop="type.name" label="Loại tài sản" width="200"></el-table-column>
          <el-table-column prop="status.name" label="Trạng thái" width="200"></el-table-column>
          <el-table-column prop="department.name" label="Phòng ban" width="200"></el-table-column>
          <el-table-column prop="store.name" label="Cửa hàng" width="200"></el-table-column>
          <el-table-column prop="supplier.name" label="Nhà phân phối" width="200"></el-table-column>
          <el-table-column prop="user.name" label="Người quản lý" width="200"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }


</style>

<script>
import axios from "axios";
import Menu from "./Menu.vue";
import { MessageBox } from 'element-ui';

export default {
  components: {
    Menu,
  },
  data() {
    return {
      tableData: [],
      searchValue: '',
    };
  },
  mounted() {
    this.getAssetsData();
  },
  methods: {
    getAssetsData() {
      const self = this;
      axios({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://assetmanagementapi.herokuapp.com/api/v1/assets",
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
        }
      }).then(
        result => {
          self.tableData = result.data.content;

          self.tableData.map((el) => {
            el.purchaseDate = el.purchaseDate.substring(0,10);
            el.expiryWarrantyDate = el.expiryWarrantyDate.substring(0,10);
            el.nextWarrantyDate = el.nextWarrantyDate.substring(0,10);
            return el;
          })
        },
      ).catch(function(error) {
          console.error(error);
          if (error.response && error.response.status === 403) {
                MessageBox.alert('Hết quyền truy cập!', 'Thông báo', {
                    confirmButtonText: 'Đóng'
              });
              self.goOut(); 
          }
      });
    },
    handleDuplicate() {
      this.getAssetsData();
    },
    searchAsset() {
      const self = this;
       axios({
        method: "GET",
        url: `https://assetmanagementapi.herokuapp.com/api/v1/assets/${self.searchValue}`,
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("LOGIN_TOKEN")}`
        }
      }).then(
        result => {
          let tableTmp = [];
          tableTmp.push(result.data);
          self.tableData = tableTmp;

          self.tableData.map((el) => {
            el.purchaseDate = el.purchaseDate.substring(0,10);
            el.expiryWarrantyDate = el.expiryWarrantyDate.substring(0,10);
            el.nextWarrantyDate = el.nextWarrantyDate.substring(0,10);
            return el;
          })
        }).catch(function (error) {
            if (error.response && error.response.status === 404) {
              MessageBox.alert('Tài sản không tồn tại', 'Thông báo', {
                confirmButtonText: 'Đóng'
              });
              self.tableData = [];
            }
        })
    },
    goOut() {
      this.$router.push({name: 'login'});
    }
  }
};
</script>
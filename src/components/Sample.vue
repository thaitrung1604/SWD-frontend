
<template>
  <el-container style="height: 500px; border: 1px solid #eee;">
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
        <el-button icon="el-icon-search" primary>Tìm kiếm</el-button>
        <el-button icon="el-icon-edit" primary>Cập nhật</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id" label="Id" width="50">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="200"></el-table-column>
          <el-table-column align="center" label="Cover">
            <template slot-scope="scope" class="image-slot">
              <el-image style="width: 180px; height: 180px" :src="scope.row.avatar" lazy></el-image>
            </template>
          </el-table-column>
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
      axios({
        method: "GET",
        url: "http://5e8a0bd9b4252f0016a623ed.mockapi.io/users"
      }).then(
        result => {
          this.tableData = result.data;
        },
        error => {
          console.error(error);
        }
      );
    },
    handleDuplicate() {
      this.getAssetsData();
    }
  }
};
</script>
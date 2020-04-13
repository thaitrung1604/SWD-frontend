<template>
    <el-aside width="250px">
      <el-menu :default-openeds="selectedOption">
        <el-submenu index="1">
          <template slot="title">
            <p style="text-align: left;">
              <i class="el-icon-s-management"></i>Danh mục
            </p>
          </template>
          <el-menu-item-group style="text-align: left;">
            <el-menu-item index="1-1" @click="fetchAssets">
              Danh mục tài sản
            </el-menu-item>
            <el-menu-item index="1-3" @click="goToStore">
              Danh mục cửa hàng
            </el-menu-item>
            <el-menu-item index="1-4" @click="goToDepartment">
              Danh mục phòng ban
            </el-menu-item>
            <el-menu-item index="1-5" @click="goToSupplier">
              Danh mục nhà cung cấp
            </el-menu-item>
            <el-menu-item index="1-6" @click="goToAssetType">
              Danh mục loại tài sản
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" style="text-align: left">
          <template slot="title">
            <i class="el-icon-plus"></i>Thêm mới
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="goToCreateAsset">Thêm mới tài sản</el-menu-item>
            <el-menu-item index="2-2" @click="goToCreateStore">Thêm mới cửa hàng</el-menu-item>
            <el-menu-item index="2-3" @click="goToCreateDepartment">Thêm mới phòng ban</el-menu-item>
            <el-menu-item index="2-4" @click="goToCreateSupplier">Thêm mới nhà cung cấp</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <p style="text-align: left;">
              <i class="el-icon-menu"></i>Lịch sử
            </p>
          </template>
          <el-menu-item-group style="text-align: left;">
            <el-menu-item index="3-1" @click="goToHistory">Lịch sử tài sản</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>Navigator Three
          </template>
          <el-menu-item-group>
            <template slot="title">Group 1</template>
            <el-menu-item index="4-1">Option 1</el-menu-item>
            <el-menu-item index="4-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="4-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="4-4">
            <template slot="title">Option 4</template>
            <el-menu-item index="4-4-1">Option 4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>

<script>
  export default {
      data () {
        return {
          selectedOption: ['1', '2', '3'],
        }
      },
      methods: {
        fetchAssets: function() {
          if (this.$route.name === 'assets') {
            this.$emit('handleDuplicateMenu');
          } else {
            this.$router.push({name: 'assets'});
          }
        },
        goToCreateAsset: function() {
          if (this.$route.name !== 'assetCreation') {
            this.$router.push({name: 'assetCreation'});
          }
        },
        goToHistory: function() {
          if (this.$route.name !== 'history') {
            this.$router.push({name: 'history'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToStore: function() {
          if (this.$route.name !== 'store') {
            this.$router.push({name: 'store'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToDepartment: function() {
          if (this.$route.name !== 'department') {
            this.$router.push({name: 'department'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToSupplier: function() {
          if (this.$route.name !== 'supplier') {
            this.$router.push({name: 'supplier'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToAssetType: function() {
          if (this.$route.name !== 'assetType') {
            this.$router.push({name: 'assetType'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToCreateStore: function() {
          if (this.$route.name !== 'storeCreation') {
            this.$router.push({name: 'storeCreation'});
          }
        },
        goToCreateDepartment: function() {
          if (this.$route.name !== 'departmentCreation') {
            this.$router.push({name: 'departmentCreation'});
          }
        },
        goToCreateSupplier: function() {
          if (this.$route.name !== 'supplierCreation') {
            this.$router.push({name: 'supplierCreation'});
          }
        },
      }
  }
</script>

<style scoped>
    .el-aside {
      float: left;
    }
</style>
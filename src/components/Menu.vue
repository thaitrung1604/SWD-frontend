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
            <el-menu-item index="2-5" @click="goToCreateUser">Thêm mới người dùng</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" style="text-align: left">
          <template slot="title">
            <p style="text-align: left;">
              <i class="el-icon-menu"></i>Lịch sử
            </p>
          </template>
          <el-menu-item-group style="text-align: left;">
            <el-menu-item index="3-1" @click="goToHistory">Lịch sử tài sản</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" style="text-align: left">
          <template slot="title">
            <p style="text-align: left;">
                <i class="el-icon-tickets"></i>Biên bản
            </p>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="goToMinute">Biên bản bàn giao</el-menu-item>
            <el-menu-item index="4-2" @click="goToCreateMinute">Tạo biên bản</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" style="text-align: left">
          <template slot="title">
            <p style="text-align: left;">
                <i class="el-icon-edit"></i>Chỉnh sửa
            </p>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="goToUpdateAsset">Chỉnh sửa tài sản</el-menu-item>
            <el-menu-item index="5-2" @click="goToUpdateStore">Chỉnh sửa cửa hàng</el-menu-item>
            <el-menu-item index="5-3" @click="goToUpdateDepartment">Chỉnh sửa phòng ban</el-menu-item>
            <el-menu-item index="5-4" @click="goToUpdateSupplier">Chỉnh sửa nhà cung cấp</el-menu-item>
            <el-menu-item index="5-5" @click="goToUpdateUser">Thông tin người dùng</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" style="text-align: left">
          <template slot="title">
            <p style="text-align: left;">
                <i class="el-icon-edit"></i>Đăng xuất
            </p>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="logout">Đăng xuất</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>

<script>
  export default {
      data () {
        return {
          selectedOption: ['1', '2', '3', '4', '5'],
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
        goToMinute: function() {
          if (this.$route.name !== 'minuteOfHandover') {
            this.$router.push({name: 'minuteOfHandover'});
          } else {
            this.$emit('handleDuplicateMenu');
          }
        },
        goToCreateMinute: function() {
          if (this.$route.name !== 'minuteCreation') {
            this.$router.push({name: 'minuteCreation'});
          }
        },
        goToUpdateSupplier: function() {
          if (this.$route.name !== 'supplierUpdate') {
            this.$router.push({name: 'supplierUpdate'});
          }
        },
        goToUpdateStore: function() {
          if (this.$route.name !== 'storeUpdate') {
            this.$router.push({name: 'storeUpdate'});
          }
        },
        goToUpdateDepartment: function() {
          if (this.$route.name !== 'departmentUpdate') {
            this.$router.push({name: 'departmentUpdate'});
          }
        },
        goToUpdateAsset: function() {
          if (this.$route.name !== 'assetUpdate') {
            this.$router.push({name: 'assetUpdate'});
          }
        },
        goToCreateUser: function() {
          if (this.$route.name !== 'userCreation') {
            this.$router.push({name: 'userCreation'});
          }
        },
        goToUpdateUser: function() {
          if (this.$route.name !== 'userUpdate') {
            this.$router.push({name: 'userUpdate'});
          }
        },


        logout: function() {
          localStorage.removeItem('LOGIN_TOKEN');
            this.$router.push({name: 'login'});
        }
      }
  }
</script>

<style scoped>
    .el-aside {
      float: left;
    }
</style>
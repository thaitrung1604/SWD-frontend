<template>
    <el-conatiner>
        <Menu/>
        <el-container style="background: #FAFAFA;">
            <el-row>
                <el-col style="font-weight:bold; margin: 20px; font-size: 28px">
                    <i class="el-icon-plus"></i>
                    Thêm mới tài sản
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Giá tài sản</p>
                        <el-input type="text" ></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Tên tài sản</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Phân loại</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Nhà cung cấp</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã người quản lý</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã phòng ban quản lý</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã cửa hàng</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Trạng thái</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20" class="input-row">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày nhập tài sản</p>
                        <el-date-picker type="date" :language="en"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày bắt đầu bảo hành</p>
                        <el-date-picker type="date"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Ngày hết hạn bảo hành</p>
                        <el-date-picker type="date"></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p>Mã bàn giao</p>
                        <el-input type="text"></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA;">
           <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <p>Mô tả tài sản</p>
                        <el-input type="textarea" style="width: 500px"></el-input>
                    </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </el-container>
        <el-container style="background: #FAFAFA; height: 100px">
           
        </el-container>
        <el-container style="background: #FAFAFA;">
            <el-row class="button-container">
                <el-button type="primary">Thêm mới</el-button>
            </el-row>
        </el-container>
    </el-conatiner>
</template>

<script>
import Menu from './Menu.vue';

export default {
    name: 'assetCreation',
    components: {
        Menu,
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
}
</script>

<style scoped>
    .grid-content{
        text-align: left;
        margin-left: 30px;
    }
    .el-aside {
        height: 636px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 202px;
    }
    .button-container {
        width: 100%;
        margin: 30px;
    }
</style>
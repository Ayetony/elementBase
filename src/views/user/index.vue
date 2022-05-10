<template>
  <div class="app-container">
    <el-table :key="tableKey" v-loading="listLoading" :data="userList" border fit highlight-current-row
      style="width: 100%;">

      <el-table-column label="用户id" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.u_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户昵称" align="center" prop="id">
        <template slot-scope="{row}">
          <span>{{ row.u_nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户头像" align="center">
        <template slot-scope="{row}">
          <el-image style="width: 50px; height: 50px" :src="row.u_avatar" fit="fit"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="余额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.u_money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地区" align="center">
        <template slot-scope="{row}">
          <span>{{ row.u_area }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户状态" align="center">
        <template slot-scope="{row}">
          <el-tag type="danger">
            {{ row.u_state | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="是否创作者" align="center">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.u_publish | publishFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="注册时间" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.u_add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.u_state == 1" type="primary" size="mini">
            禁用
          </el-button>
          <el-button v-if="row.u_state != 1" type="primary" size="mini">
            开启
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="resultPage.total > 0" :total="resultPage.total" :page.sync="resultPage.page"
      :limit.sync="resultPage.pageSize" @pagination="getList" />


  </div>
</template>

<script>
import { userlist } from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
  name: "user",
  components: { Pagination },
  filters: {
    stateFilter(state) {
      const stateMap = ["禁用", "正常"];
      return stateMap[state]
    },
    publishFilter(publish) {
      const publishMap = ["是", "否"];
      return publishMap[publish]
    }
  },
  data() {
    return {
      resultPage: {
        total: 100,
        page: 1,
        pageSize: 20
      },
      listLoading: false,
      tableKey: 0,
      userList: []
    };
  },

  mounted() {
    this.getList()
  },

  methods: {

    /**
     * 数据请求
     */
    getList() {
      this.listLoading = true;
      userlist({ page: this.resultPage.page, pageSize: this.resultPage.pageSize }).then(response => {
        const { data } = response
        this.resultPage.page = data.page
        this.resultPage.total = data.page_total
        this.listLoading = false;
        if (this.resultPage.page == 1) {
          this.userList = data.userlist;
        } else {
          this.userList.push(...data.userlist);
        }
      })
    },

    /**
     * 搜索订单
     */
    handleSearchOrder() {
      console.log("点击了搜索订单");
    },

    /**
     * 添加订单
     */
    handleAddOrder() {
      console.log("点击了添加订单");
      this.addFormVisible = true;
    },

  },
};
</script>

<style>
</style>

<template>
  <div class="app-container">
     <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="orderList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="管理员账号" prop="id" align="center" min-width="80px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="管理员角色" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="账号状态" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="上次登陆时间" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">
            编辑
          </el-button>
          <el-button v-if="row.status!=3" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="orderResult.total>0" :total="orderResult.total" :page.sync="orderResult.page" :limit.sync="orderResult.pageSize" @pagination="getList" />

    <el-dialog title="添加订单" :visible.sync="addFormVisible">
      <el-form
        ref="order-add-form"
        :model="addOderForm"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="订单编号" prop="type">
          <el-input v-model="addOderForm.title" />
        </el-form-item>

         <el-form-item label="订单id" prop="type">
          <el-input v-model="addOderForm.id" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: "order",
  components: { Pagination },
  filters: {
    statusTypeFilter(status) {
      const statusMap = ["success","info","danger"];
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ["未支付", "代发货", "已收货", "已退款", "已取消"]
      return statusMap[status]
    }
  },
  data() {
    return {
      searchOrder: {
        orderNum: "",
        selectStatus: "",
        statusList: ["未支付", "代发货", "已收货", "已退款", "已取消"],
      }, //订单搜索条件
      addFormVisible: false, //添加订单弹出层是否显示
      addOderForm: {
        id: undefined,
        title: ""
      },
      orderResult:{
        total:100,
        page:1,
        pageSize:20
      },
      listLoading:false,
      tableKey: 0,
      orderList:[],
      showReviewer: false
    };
  },

  mounted() {
    for (let index = 0; index < 10; index++) {
      const temp = {
        id:"超级管理员",
        title:"测试标题",
        timestamp: new Date(),
        status:0
      }
      this,this.orderList.push(temp)
    }
  },

  methods: {

    /**
     * 数据请求
     */
    getList() {
      this.listLoading = true
      setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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

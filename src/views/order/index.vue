<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchOrder.orderNum"
        placeholder="请输入订单编号"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="searchOrder.selectStatus"
        placeholder="请选择订单状态"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in searchOrder.statusList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearchOrder"
      >
        搜索
      </el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleAddOrder"
      >
        添加订单
      </el-button>
    </div>

     <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="orderList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="订单id" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="评分" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTypeFilter">
            {{ row.status | statusFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">
            编辑
          </el-button>
          <el-button v-if="row.status!=1" size="mini" type="success">
            发布
          </el-button>
          <el-button v-if="row.status==1" size="mini">
            草稿
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
        id:1,
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

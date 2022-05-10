<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-folder-add"
        @click="handleAddOrder">
        添加试卷
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="paperList" border fit highlight-current-row
      style="width: 100%">
      <el-table-column label="试卷id" prop="id" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.p_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="试卷标题" align="center">
        <template slot-scope="{ row }">
          <span class="link-type">{{
              row.p_title
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="试卷描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.p_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="试卷科目" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.p_state | stateFilter">
            {{ row.p_subjects | subjectsFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="试卷年级" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.p_state | stateFilter">
            {{ row.p_class | classFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="试卷类型" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.p_state | stateFilter">
            {{ row.p_type | ptypeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="试卷内容" align="center">
        <template slot-scope="{ row }">
          <el-link @click="handlePaperViewer(row.p_content_img)" type="primary">{{ row.p_content_img.length }}张试卷点击查看
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="试卷状态" class-name="status-col" align="center">
        <template slot-scope="{ row }">
          <el-tag type="danger">
            {{ row.p_state | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handlePaperEdit(row)"> 编辑 </el-button>
          <el-button v-if="row.p_state != 1" size="mini" type="success">
            显示
          </el-button>
          <el-button v-if="row.p_state == 1" size="mini" type="success"> 隐藏 </el-button>
          <el-button size="mini" type="danger"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="resultPage.total > 0" :total="resultPage.total" :page.sync="resultPage.page"
      :limit.sync="resultPage.pageSize" @pagination="getList" />

    <el-dialog title="添加试卷" :visible.sync="addFormVisible">
      <el-form ref="order-add-form" :model="addOderForm" label-position="left" label-width="100px"
        style="margin-left: 50px">
        <el-form-item label="试卷标题" prop="type">
          <el-input placeholder="请添加试卷标题" v-model="addOderForm.title" />
        </el-form-item>
        <el-form-item label="试卷描述" prop="type">
          <el-input placeholder="请添加试卷描述" v-model="addOderForm.id" />
        </el-form-item>
        <el-form-item label="试卷科目" prop="type">
          <el-select v-model="subjects_value" placeholder="请选择试卷科目">
            <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷年级" prop="type">
          <el-select v-model="class_value" placeholder="请选择试卷科目">
            <el-option v-for="item in classlist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷类型" prop="type">
          <el-select v-model="class_value" placeholder="请选择试卷类型">
            <el-option v-for="item in classlist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷电子图" prop="type">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :modal="false" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否公开">
          <el-switch v-model="paper_state"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-image-viewer v-if="showPaperViewer" :on-close="() => { showPaperViewer = false }" :url-list="paperImgList" />

  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { paperList } from '@/api/test-paper'
export default {
  name: "testPaper",
  components: { 
    Pagination,
    'el-image-viewer':()=>import('element-ui/packages/image/src/image-viewer')
   },
  filters: {
    stateFilter(state) {
      const stateMap = ["隐藏", "显示"];
      return stateMap[state];
    },
    subjectsFilter(subjects) {
      const subjectsMap = ["语文", "数学"];
      return subjectsMap[subjects];
    },
    classFilter(classIndex) {
      const classMap = ["一年级", "二年级"];
      return classMap[classIndex];
    },
    ptypeFilter(type) {
      const ptypeMap = ["人教版", "广东卷"];
      return ptypeMap[type];
    }

  },
  data() {
    return {
      showPaperViewer: false,
      paperImgList: [],
      addFormVisible: false, //添加订单弹出层是否显示
      addOderForm: {
        id: undefined,
        title: "",
      },
      resultPage: {
        total: 0,
        page: 1,
        pageSize: 20,
      },
      listLoading: false,
      tableKey: 0,
      paperList: [],
      showReviewer: false,
      subjects: [{
        value: '0',
        label: '语文'
      }, {
        value: '1',
        label: '数学'
      }, {
        value: '2',
        label: '英语'
      }, {
        value: '3',
        label: '地理'
      }, {
        value: '4',
        label: '美术'
      }],
      subjects_value: '',
      classlist: [{
        value: '0',
        label: '一年级'
      }, {
        value: '1',
        label: '二年级'
      }, {
        value: '2',
        label: '三年级'
      }, {
        value: '3',
        label: '四年级'
      }, {
        value: '4',
        label: '五年级'
      }],
      class_value: '',
      dialogImageUrl: '',
      dialogVisible: false,
      paper_state: false
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
      paperList({ page: this.resultPage.page, pageSize: this.resultPage.pageSize }).then(response => {
        const { data } = response
        this.resultPage.page = data.page
        this.resultPage.total = data.page_total
        this.listLoading = false;
        if (this.resultPage.page == 1) {
          this.paperList = data.paper;
        } else {
          this.paperList.push(...data.paper);
        }
      })
    },

    /**
     * 添加试卷预览
     * @param {*} imgs 
     */
    handlePaperViewer(imgs) {
      this.showPaperViewer = true
      this.paperImgList = imgs
      console.log(imgs);
    },

    /**
     * 添加订单
     */
    handleAddOrder() {
      console.log("点击了添加订单");
      this.addFormVisible = true;
    },

    /**
     * 编辑试卷
     * @param {*} row 
     */
    handlePaperEdit(row) {
      console.log("点击了编辑试卷");
      this.addFormVisible = true;
    },

    /**
     * 删除试卷
     * @param {*} row 
     */
    handleDel(row) {
      this.$confirm('此操作将永久删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }

  },
};
</script>

<style>
</style>

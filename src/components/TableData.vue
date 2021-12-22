<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAddClick">添加同级</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">添加子级</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="manager" label="负责人" />
      <el-table-column prop="comment" label="备注" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleEditClick(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            @click="handleDeleteClick(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改条目" :visible.sync="showEditDialog">
      <el-form :model="editForm" :rules="formRules" ref="editFormRef">
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-select v-model="editForm.department" placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :label="item.label"
              :value="item.value"
              :key="item.vaue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人"
          :label-width="formLabelWidth"
          prop="manager"
        >
          <el-input v-model="editForm.manager" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="comment">
          <el-input v-model="editForm.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEditComfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加条目" :visible.sync="showAddDialog">
      <el-form :model="addForm" :rules="formRules" ref="addFormRef">
        <el-form-item
          label="部门"
          :label-width="formLabelWidth"
          prop="department"
        >
          <!-- <el-input v-model="addForm.department" autocomplete="off"></el-input> -->
          <el-select v-model="addForm.department" placeholder="请选择部门">
            <el-option
              v-for="item in departments"
              :label="item.label"
              :value="item.value"
              :key="item.vaue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人"
          :label-width="formLabelWidth"
          prop="manager"
        >
          <el-input v-model="addForm.manager" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="comment">
          <el-input v-model="addForm.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import data from "../db.js";
export default {
  name: "TableData",

  data() {
    return {
      tableData: [],
      showEditDialog: false,
      editForm: {
        department: "department",
        manager: "manager",
        comment: "comment",
      },
      editIndex: "",
      showAddDialog: false,
      addForm: {
        department: "",
        manager: "",
        comment: "",
      },
      addIndex: "",
      departments: [
        {
          value: "研发部",
          lable: "研发部",
        },
        {
          lable: "工程部",
          value: "工程部",
        },
        {
          lable: "市场部",
          value: "市场部",
        },
      ],
      formLabelWidth: "100px",
      formRules: {
        department: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change",
          },
        ],
        manager: [{ required: true, message: "请添加负责人", trigger: "blur" }],
        comment: [
          { required: true, message: "请添加备注", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 4 到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.tableData = data;
  },

  methods: {
    handleEditClick(index, row) {
      this.showEditDialog = true;
      this.editForm = { ...row };
      this.editIndex = index;
    },
    handleEditComfirm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        this.tableData.splice(this.editIndex, 1, this.editForm);
        this.showEditDialog = false;
        this.$message({
          type: "success",
          message: "修改条目成功!",
        });
      });
    },
    handleDeleteClick(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAddClick() {
      this.showAddDialog = true;
    },
    handleAddConfirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        this.tableData.push(this.addForm);
        this.addForm = {};
        this.showAddDialog = false;
        this.$message({
          type: "success",
          message: "添加条目成功!",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin: 0 auto;
  & .el-row {
    width: 420px;
  }
  & .el-table {
    margin-top: 10px;
  }
  & .el-select {
    width: 100%;
  }
  & .el-dialog {
    width: 500px;
  }
}
</style>

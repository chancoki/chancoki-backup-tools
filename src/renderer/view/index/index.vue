<script>
// Api
import { addStore, getStore, updateStore, deleteStore } from "@/api/store";
import { getUser } from "@/api/user";

// Config
import { backUp, packageInfo, token } from "@/config/enum";

// Hooks
import useId from "@/hooks/useId";
import useBackUp from "@/hooks/useBackUp";

// Utils
import nprogress from "nprogress";
import filePath from "@/utils/file-path";
import { setCookie, getCookie, delCookie } from "@/utils/index";

export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        name: "",
        path: "",
        disabled: true,
        remark: "",
        branch: "",
        id: "",
      },
      activeName: 0,
      loading: false,
      settingVisible: false,
      setting: {},
      packageInfo,
      userInfo: {},
    };
  },

  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.form = {
          name: "",
          url: "",
          disabled: true,
          remark: "",
          branch: "",
          id: "",
        };
      }
    },

    loading(value) {
      value ? nprogress.start() : nprogress.done();
    },

    "form.url"(value) {
      if (this.form.name) {
        return;
      }

      const list = value.split("/");

      if (!list[list.length - 2] || !list[list.length - 1]) {
        return;
      }

      const name = `${list[list.length - 2]}/${list[list.length - 1]}`.replace(/\.git/g, "");
      this.form.name = name;
    },
  },

  created() {
    this.getData();
    this.getUserInfo();
    this.setting = getCookie(backUp) || { path: "" };
    if (!this.setting.path) {
      this.settingVisible = true;
    }
  },

  methods: {
    async getData() {
      const { data } = await getStore();

      this.data = data;
    },
    async onSubmit() {
      const func = this.form.id ? updateStore : addStore;
      this.form.id = this.form.id || useId();

      const { msg } = await func(this.form);
      this.$message.success(msg);
      this.getData();
      this.dialogFormVisible = false;
    },

    async getUserInfo() {
      const { data } = await getUser();
      this.userInfo = data;
    },

    async deleteGit(id) {
      const { msg } = await deleteStore({ id });
      this.$message.success(msg);
      this.getData();
    },

    changeGit(index) {
      this.dialogFormVisible = true;
      this.form = this.data[index];
    },

    async onBackUp(index) {
      let data = null;

      data = typeof index === "number" ? this.data[index] : this.data;

      if (this.loading) {
        return;
      }

      this.loading = true;
      try {
        await useBackUp(data);
      } catch (error) {}
      this.loading = false;
    },

    onSaveSetting() {
      if (!this.setting.path) {
        this.$message({
          type: "warning",
          message: "请输入备份路径",
        });
        return;
      }

      setCookie(backUp, this.setting);
      this.settingVisible = false;
    },

    async onOpenSettingFile() {
      const res = await filePath();
      this.setting.path = res;
    },

    backLogin() {
      delCookie(token);
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div>
    <div class="header">
      <div>{{ userInfo.name }}</div>

      <el-button type="primary" size="mini" @click="backLogin">退出</el-button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          chancoki's
          <span class="clearfix-span">Backup toolsl</span>
        </div>
        <div>
          <el-button type="text" @click="dialogFormVisible = true">新增</el-button>
          <el-button type="text" @click="onBackUp">一键备份</el-button>
          <el-button type="text" style="float: right" @click="settingVisible = true">设置</el-button>
        </div>
      </div>

      <el-empty description="乜嘢都冇有" v-if="!data.length" />

      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item, index) in data" :name="index">
          <template slot="title">
            <div class="collapse-title" :title="item.name">
              <span class="collapse-title__index" :style="{ color: item.disabled ? '#f56c6c' : '#409eff' }">{{ index + 1 }}.</span>
              {{ item.name }}
              <span class="collapse-title__branch" :style="{ color: item.disabled ? '#f56c6c' : '#409eff' }">{{ item.branch }}</span>
            </div>
          </template>

          <div class="collapse-title__button">
            <el-popconfirm title="确定删除吗" @confirm="deleteGit(item.id)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-popconfirm>

            <el-button type="warning" icon="el-icon-setting" size="small" @click="changeGit(index)">修改</el-button>

            <el-button slot="reference" type="success" icon="el-icon-help" size="small" @click="onBackUp(index)">备份</el-button>
          </div>

          <el-descriptions direction="vertical" labelClassName="label-style" :colon="false" :label-style="{ fontWeight: 700 }" :column="1">
            <el-descriptions-item label="项目名称">{{ item.name }}</el-descriptions-item>

            <el-descriptions-item label="项目仓库">{{ item.url }}</el-descriptions-item>
            <el-descriptions-item label="仓库分支">{{ item.branch }}</el-descriptions-item>

            <el-descriptions-item label="备份禁用">
              <el-tag size="small" :type="item.disabled ? 'danger' : ''">{{ item.disabled }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="项目备注">{{ item.remark }}</el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-dialog title="项目信息" fullscreen :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目仓库">
          <el-input v-model="form.url" />
        </el-form-item>

        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="仓库分支">
          <el-input v-model="form.branch" />
        </el-form-item>

        <el-form-item label="备份禁用">
          <el-switch v-model="form.disabled" />
        </el-form-item>

        <el-form-item label="项目备注">
          <el-input type="textarea" v-model="form.remark" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置" fullscreen :visible.sync="settingVisible">
      <el-form ref="form" :model="setting" label-width="80px">
        <el-form-item label="备份路径">
          <el-col :span="16">
            <el-input v-model="setting.path" />
          </el-col>

          <el-col :span="5">
            <el-button type="primary" style="margin-left: 5px" @click="onOpenSettingFile">浏览</el-button>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="settingVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSaveSetting">确 定</el-button>
      </span>
    </el-dialog>

    <el-divider>{{ packageInfo.version }} by {{ packageInfo.mine }}</el-divider>
  </div>
</template>

<style scoped>
.collapse-title {
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  width: 100%;
}

.collapse-title__index {
  font-weight: 900;
}
.collapse-title__branch {
  position: absolute;
  right: 0px;
  top: -16px;
  font-size: 12px;
  opacity: 0.8;
  z-index: 9;
}
.collapse-title__button {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.clearfix {
  font-size: 26px;
  font-weight: 900;
  height: 60px;
  color: #409eff;
  font-style: italic;
}

.clearfix-span {
  font-size: 16px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
}

.header {
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: rgba(64, 158, 255, 0.2);
  color: #409eff;
  font-weight: 900;
}
</style>

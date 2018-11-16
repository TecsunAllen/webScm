<template>
<el-container>
  <el-aside width="200px">
    <manage-space></manage-space>
  </el-aside>
  <el-main>
    <edit-space></edit-space>
  </el-main>
</el-container>
</template>

  <script>
import editSpace from "./editSpace";
import manageSpace from "./manageSpace";
export default {
  data() {
    return {};
  },
  components: {
    editSpace,
    manageSpace
  },
  methods: {},
  mounted() {}
};
</script>

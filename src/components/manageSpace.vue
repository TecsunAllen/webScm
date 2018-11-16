<template>
<el-card class="box-card">
    <el-card class="box-card" v-if="manageTree.conflictedChanges.length">
        <ul>
            <li v-bind:key="item._id" v-for="item in manageTree.conflictedChanges">

                <div>
                    <i v-if="item.isModified" class="el-icon-edit"></i>
                    <i  v-if="item.isNew"  class="el-icon-plus"></i>
                    <i  v-if="item.isDeleted"  class="el-icon-delete"></i>
                </div>
                                <div>{{item.name}}</div>
            </li>
        </ul>
    </el-card>

    <el-card class="box-card" v-if="manageTree.indexedChanges.length">
        <ul>
            <li v-bind:key="item._id" v-for="item in manageTree.indexedChanges">
                
                <div>
                    <i v-if="item.isModified" class="el-icon-edit"></i>
                    <i  v-if="item.isNew"  class="el-icon-plus"></i>
                    <i  v-if="item.isDeleted"  class="el-icon-delete"></i>
                </div>
                <div>{{item.name}}</div>
            </li>
        </ul>
    </el-card>

    <el-card class="box-card" v-if="manageTree.workTreeChanges.length">
        <ul>
            <li v-bind:key="item._id" v-for="item in manageTree.workTreeChanges">
                
                <div>
                    <i v-if="item.isModified" class="el-icon-edit"></i>
                    <i  v-if="item.isNew"  class="el-icon-plus"></i>
                    <i  v-if="item.isDeleted"  class="el-icon-delete"></i>
                </div>
                <div>{{item.name}}</div>
            </li>
        </ul>
    </el-card>
</el-card>
</template>

  

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    manageTree() {
      return this.$store.state.manageTree;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<template>
<el-card class="box-card">
    <el-row>
        <el-col :span="24">
            <el-input v-model="command" @keyup.enter.native="executeCommand()" placeholder=""></el-input>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="24">
            <pre v-bind:key="message" v-for="message in messageList">{{message}}</pre>
        </el-col>
    </el-row>

</el-card>
</template>

  

<script>
export default {
  data() {
    return {
      command: ""
    };
  },
  computed: {
    messageList() {
      return this.$store.state.messageList;
    }
  },
  methods: {
    executeCommand() {
      this.$store.commit("executeCommand", this.command);
    }
  },
  mounted() {}
};
</script>

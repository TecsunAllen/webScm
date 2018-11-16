<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("..\\node_modules\\element-ui\\lib\\theme-chalk\\index.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  font-size: small;
}

ul {
  padding: 0;
}
ul li {
  list-style: none;
  margin-bottom: 3px;
  display: flex;
}

.el-card__body {
  padding: 3px;
}
</style>

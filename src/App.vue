<template>
  <div :class="$style.appContent">
    <!-- 底部导航菜单 -->
    <!-- <div :class="$style.nav">
      <router-link :class="$style.item" to="/">Home1</router-link>
      <router-link :class="$style.item" to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.appContent{
  width: 100vw;
  height: 100vh;
}
.nav {
  display: flex;
  align-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.item {
  display: inline-block;
  font-size: 30px;
  color: #ff0000;
  padding: 5px;
  border: 1px solid #e6e6e6;
  width: 120px;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
/* iOS禁止微信调整字体大小 */
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
</style>

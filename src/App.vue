<template>
  <div id="app">
    <el-container>
      <el-header>
        <NavMenuVue></NavMenuVue>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <FooterInfoVue></FooterInfoVue>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import NavMenuVue from './components/NavMenu.vue'
import FooterInfoVue from './components/FooterInfo.vue'

export default {
  name: 'app',
  components: {
    NavMenuVue,
    FooterInfoVue
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

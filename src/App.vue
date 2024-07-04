<!--<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template> -->

<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!--<style>
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
-->

<style>
    /* 主组件：所有组件都使用的样式。 */
    /* CSS重置 */
    body,div,ul,ol,li,p,h1,h2,h3,h4,h5,h6,span,a,img,form{
    margin: 0;
    padding: 0;
    }
    html,body{ 
        width: 100%;
        font-family: Arial,'Microsoft Yahei';
        height:100%;
    }
    ul{
        list-style: none;
    }
    a{ text-decoration: none; } 
    /* 去掉链接下划线 */
</style>
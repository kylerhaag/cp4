<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <!-- <router-link to="/about">About</router-link>| -->
      <router-link to="/Teddy">Your Teddy</router-link>
    </div>
    <router-view />
    <div class="footer">
      <div>Total hours spent on Final Project: 5.5 - Website designed by Kyler Haag</div>Check out Kyler's code on
      <a href="https://github.com/kylerhaag/cp4">GitHub</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #343a40;
}

#nav a {
  font-weight: bold;
  color: #677786;
}

#nav a.router-link-exact-active {
  color: #fff5a5;
}

.footer {
  left: 0;
  bottom: 0;
  width: 100%;
  color: #fff5a5;
  background-color: #343a40;
  padding: 0.5%;
  border-top: 3px solid #5d6063;
  height: 60px;
}
.footer a {
  text-decoration: underline !important;
  color: #fff5a5;
}
</style>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container">
      <span class="text-muted">COS30045: Data Visualisation</span>
    </div>
    <div class="container">
      <span class="text-muted">Nikita Golev 102098683</span><span class="text-muted">Jack Baracco 103370243</span>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
  footer{
    .container{
      display: flex;
      justify-content: center;
    }
    span{
      font-size: 14px;
      display: block;
      margin-left: 0.3em;
      margin-right: 0.3em;
    }
  }
</style>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Roboto", sans-serif;
}

.btn-primary {
  --bs-btn-bg: #42b983;
  --bs-btn-active-bg: #42b983;
  --bs-btn-border-color: #42b983;
  --bs-btn-hover-bg: #4dd498;
  --bs-btn-hover-border-color: #4dd498;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    transition: 0.3s;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      color: #42b983;
    }
  }
}
</style>

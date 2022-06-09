<template>
  <div class="home px-4 py-5 my-5 text-center">
    <div class="header">
      <img
        src="@/assets/logo.png"
        alt="Swinburne University"
        class="d-block mx-auto mb-4"
      />
      <h1 class="display-5 fw-bold">
        Energy Sustainability in Australia over time.
      </h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          The global fight for a sustainable future in order to protect our
          planet from the effects of climate change is an important one.
          Question is; How well have we been fighting it?
        </p>
      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <a href="#production">
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
            Production
          </button>
        </a>
        <a href="#consumption">
          <button type="button" class="btn btn-primary btn-lg px-4">
            Consumption
          </button>
        </a>
      </div>
    </div>
    <div class="block">
      <Chart1 />
    </div>
    <div class="block">
      <Chart2 />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Chart1 from "@/components/Chart1.vue";
import Chart2 from "@/components/Chart2.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Chart1,
    Chart2,
  },
};
</script>

<style scoped lang="scss">
.btn {
  font-size: 1em;
}
img {
  height: 250px;
}

.block{
  padding-bottom: 5em;
}

a {
  button {
    width: 100%;
  }
}

.header {
  padding-bottom: 5em;
  margin-bottom: 3em;
}
</style>

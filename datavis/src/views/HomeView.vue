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
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Chart 1</button>
        <button type="button" class="btn btn-primary btn-lg px-4">Chart 2</button>
      </div>
    </div>
    <Chart1/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Chart1 from "@/components/Chart1.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Chart1
},
};
</script>

<style scoped>
img {
  height: 250px;
}

.header {
  padding-bottom: 5em;
  margin-bottom: 3em;
}
</style>

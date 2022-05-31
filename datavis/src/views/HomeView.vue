<template>
  <div class="home px-4 py-5 my-5 text-center">
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
        The global fight for a sustainable future in order to protect our planet
        from the effects of climate change is an important one. Question is; How
        well have we been fighting it?
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
img {
  height: 250px;
}
</style>

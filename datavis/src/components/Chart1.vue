<!-- Components to serpate our two charts, this one is for renewable vs total energy production -->
<template>
  <h2 class="display-7 fw-bold">
    How much of our total energy generation is renewable?
  </h2>
  <div class="col-lg-5 mx-auto">
    <p class="fs-6 mb-4">
      Renewable generation in this country has remained largely static since the
      80's. Since the 2010's, production has risen dramatically but still has a
      long way to go if we wish to rely on it as our main source of electricity.
    </p>
  </div>
</template>

<script>
export default {
  name: "Chart1",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  font-weight: 300;
}
</style>

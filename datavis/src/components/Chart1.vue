<!-- Components to serpate our two charts, this one is for renewable vs total energy production -->
<template>
  <h2 class="display-7 fw-bold">
    How much of our total energy generation is renewable?
  </h2>
  <div class="col-lg-5 mx-auto">
    <p class="fs-6 mb-4">
      Renewable generation in this country has remained largely static since the
      80's. Since the 2010's, production in terawatt hours has risen
      dramatically but still has a long way to go if we wish to rely on it as
      our main source of electricity.
    </p>
  </div>
  <div class="col-lg-8 mx-auto" id="chart1-wrap">
    <div id="chart1"></div>
    <div class="buttons d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button
        id="playButton"
        class="btn btn-outline-secondary btn-lg px-3 gap-3"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import chart from "@/assets/chart1.js";

export default {
  name: "Chart1",
  mounted() {
    chart(d3, "./chart1.csv");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  font-weight: 300;
}
.buttons {
  margin-top: 1em;
  button {
    font-size: 14px;
  }
}
</style>

<style lang="scss">
#chart1,
#chart1-wrap {
  overflow: visible;
}

.ticks {
  font-size: 10px;
}

.track,
.track-inset,
.track-overlay {
  stroke-linecap: round;
}

.track {
  stroke: #000;
  stroke-opacity: 0.3;
  stroke-width: 10px;
}

.track-inset {
  stroke: #dcdcdc;
  stroke-width: 8px;
}

.track-overlay {
  pointer-events: stroke;
  stroke-width: 50px;
  stroke: transparent;
  cursor: crosshair;
}

.handle {
  fill: #fff;
  stroke: #000;
  stroke-opacity: 0.5;
  stroke-width: 1.25px;
}
</style>

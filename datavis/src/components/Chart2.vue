<!-- Components to serpate our two charts, this one is for consumption -->
<template>
  <h2 class="display-7 fw-bold">
    What kinds of energy do we consume?
  </h2>
  <div class="col-lg-5 mx-auto">
    <p class="fs-6 mb-4">
      Renewable generation in this country has remained largely static since the
      80's. Since the 2010's, production has risen dramatically but still has a
      long way to go if we wish to rely on it as our main source of electricity.
    </p>
  </div>
  <div class="col-lg-8 mx-auto">
    <div id="chart2"></div>
    <div class="buttons d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button id="default" class="btn btn-outline-secondary btn-lg px-3 gap-3">
        Default
      </button>
      <button id="button" class="btn btn-outline-secondary btn-lg px-3 gap-3">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import chart from "@/assets/chart2.js";

export default {
  name: "Chart2",
  mounted() {
    chart(d3, "chart2.csv");
  },
};
</script>

<style lang="scss">
#chart2svg {
  circle {
    padding: 30px;
  }
}
.tooltip2{
  padding-left: 5px;
  padding-right: 5px;
}
</style>

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

<style>
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

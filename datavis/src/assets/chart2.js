//init method below contains the code to read the data from the csv file

const chart = (d3, chartLink) => {
  // variables
  const w2 = 1000;
  const h2 = 600;
  const padding2 = 50;
  const svgHeight2 = h2 + padding2;
  const svgWidth2 = w2 + padding2;

  const defaultColour = "#42b983";
  const renewablesColour = "#42b983";
  const oilColour = "blue";
  const gasColour = "RGB(67, 147, 181)";
  const coalColour = "red";
  const circleColour = "black";
  const circleBeginRadius = 4;
  const circleEndRadius = 6;
  const areaLineColour = "black";
  const rectLineColour = "black";

  const tooltipTextColour = "white";
  const tooltipBGColour = "black";

  let xScale = "";
  let yScale = "";
  let renewables = "";
  let svg = "";
  let line = "";
  let xAxis = "";
  let yAxis = "";
  let maxRen = "";
  let maxCoal = "";
  let maxOil = "";
  let maxGas = "";
  let coal = "";
  let oil = "";
  let gas = "";
  let renewablesLine = "";
  let coalLine = "";
  let oilLine = "";
  let gasLine = "";

  let selected = "";

  function drawSVG2() {
    console.log("drawSVG");

    d3.select("#chart2")
      .append("svg")
      .attr("id", "chart2svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500");

    d3.select("body")
      .append("div")
      .attr("class", "tooltip2")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", tooltipBGColour)
      .style("color", tooltipTextColour)
      .text("");
  }

  function initialiseDefault2() {
    console.log("initialiseDefault");

    resetDefault2();
    // Reading in the data
    d3.csv("chart2.csv", function (d) {
      return {
        Date: new Date(d.date),
        Renewables: +d.Renewables,
      };
    }).then(function (data) {
      createDefault2(data);
    });
  }

  function initialiseAll2() {
    console.log("initialiseAll");

    d3.select("#button").on("click", function (event) {
      d3.select("#chart2svg").selectAll("*").remove();

      d3.csv(chartLink, function (d) {
        return {
          Date: new Date(d.date),
          Renewables: +d.Renewables,
          Coal: +d.Coal,
          Oil: +d.Oil,
          Gas: +d.Gas,
        };
      }).then(function (data) {
        createAll2(data);
      });
    });
  }

  function resetDefault2() {
    d3.select("#default").on("click", function (event) {
      d3.select("#chart2svg").selectAll("*").remove();

      d3.csv("chart2.csv", function (d) {
        return {
          Date: new Date(d.date),
          Renewables: +d.Renewables,
        };
      }).then(function (data) {
        createDefault2(data);
      });
    });
  }

  // Adding the collected data to the svg
  function createDefault2(data) {
    //console.log("createDefault");
    const svgW = 950;
    const svgH = 460;

    //Scaling X and Y Axes
    xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.Date), d3.max(data, (d) => d.Date)])
      .range([padding2, svgW]);

    yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Renewables)])
      .range([svgH, padding2]);
    //END SCALING ==============================================

    //Renewables area chart
    renewables = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Renewables));

    svg = d3.select("#chart2svg");

    //Appending Renewables to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", renewables)
      .style("fill", defaultColour)
      .style("stroke", defaultColour)
      .style("stroke-width", "0.5");

    //OPTIONALLY adding a line to better show the top of the area chart plotting
    line = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Renewables));

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", areaLineColour)
      .style("stroke-width", "0.5");
    //END LINE ======================================================

    //Initilising and drawing X and Y axes
    xAxis = d3.axisBottom().scale(xScale);

    yAxis = d3.axisLeft().ticks(10).scale(yScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + svgH + ")")
      .call(xAxis);

    d3.select("#chart2svg")
      .append("g")
      .attr("transform", "translate(" + padding2 + ", " + 0 + ")")
      .call(yAxis);
    //END X AND Y AXES =================================================

    //Appending hidden circles to each data point associated with renewables
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", circleColour)
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return xScale(d.Date);
      })
      .attr("cy", function (d) {
        return yScale(d.Renewables);
      })
      .attr("r", 4)
      .style("opacity", "0");

    //Adding interactivity
    d3.select("#chart2svg")
      .selectAll("circle")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", 6);

        d3.select(".tooltip2")
          .text(
            `Year: ${d.Date.getFullYear()}, Renewables consumed: ${
              d.Renewables
            }`
          )
          .style("visibility", "visible")
          .style("top", event.pageY - 30 + "px")
          .style("left", event.pageX + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0")
          .attr("r", 4);

        d3.select(".tooltip2").style("visibility", "hidden");
      });
    //END CIRCLES ===================================================
  }
  //END createDefault function ==============================================

  function createAll2(data) {
    //console.log("createAll");
    //Adding COAL, OIL, GAS via button
    //Scaling X and Y Axes

    maxRen = d3.max(data, (d) => d.Renewables);
    maxCoal = d3.max(data, (d) => d.Coal);
    maxOil = d3.max(data, (d) => d.Oil);
    maxGas = d3.max(data, (d) => d.Gas);

    const svgW = 950;
    const svgH = 460;

    xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.Date), d3.max(data, (d) => d.Date)])
      .range([padding2, svgW]);

    yScale = d3
      .scaleLinear()
      .domain([0, d3.max([maxRen, maxCoal, maxOil, maxGas])])
      .range([svgH, padding2]);

    //Renewables area chart
    renewables = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Renewables));

    //Coal area chart
    coal = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Coal));

    //Oil area chart
    oil = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Oil));

    //Gas area chart
    gas = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Gas));

    //OPTIONALLY adding a line to better show the top of the area chart plotting
    renewablesLine = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Renewables));

    coalLine = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Coal));

    oilLine = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Oil));

    gasLine = d3
      .line()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.Gas));

    svg = d3.select("#chart2svg");

    //Appending Oil to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("class", "Oil")
      .attr("d", oil)
      .style("fill", oilColour)
      .style("stroke", oilColour)
      .style("stroke-width", "0.5")
      .style("opacity", "0.5");

    //Appending Coal to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("class", "Coal")
      .attr("d", coal)
      .style("fill", coalColour)
      .style("stroke", coalColour)
      .style("stroke-width", "0.5")
      .style("opacity", "0.5");

    //Appending Gas to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("class", "Gas")
      .attr("d", gas)
      .style("fill", gasColour)
      .style("stroke", gasColour)
      .style("stroke-width", "0.5")
      .style("opacity", "0.5");

    //Appending Renewables to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("class", "Renewables")
      .attr("d", renewables)
      .style("fill", renewablesColour)
      .style("stroke", renewablesColour)
      .style("stroke-width", "0.5")
      .style("opacity", "0.5");

    const enter = svg.selectAll("circle").data(data).enter();

    //Appending hidden circles to each data point associated with renewables
    enter
      .append("circle")
      .attr("class", "Renewables")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return xScale(d.Date);
      })
      .attr("cy", function (d) {
        return yScale(d.Renewables);
      })
      .attr("r", circleBeginRadius)
      .style("opacity", "0");

    //Appending hidden circles to each data point associated with Gas
    enter
      .append("circle")
      .attr("class", "Gas")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return xScale(d.Date);
      })
      .attr("cy", function (d) {
        return yScale(d.Gas);
      })
      .attr("r", circleBeginRadius)
      .style("opacity", "0");

    //Appending hidden circles to each data point associated with Oil
    enter
      .append("circle")
      .attr("class", "Oil")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return xScale(d.Date);
      })
      .attr("cy", function (d) {
        return yScale(d.Oil);
      })
      .attr("r", circleBeginRadius)
      .style("opacity", "0");

    //Appending hidden circles to each data point associated with Oil
    enter
      .append("circle")
      .attr("class", "Coal")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return xScale(d.Date);
      })
      .attr("cy", function (d) {
        return yScale(d.Coal);
      })
      .attr("r", circleBeginRadius)
      .style("opacity", "0");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", renewablesLine)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "0.5");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", coalLine)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "0.5");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", gasLine)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "0.5");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", oilLine)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "0.5");
    //END appending all plots ==================================

    //Adding interactivity
    d3.select("#chart2svg")
      .selectAll("circle")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", circleEndRadius);

        svg
          .append("rect")
          .attr("height", h2 - padding2)
          .attr("width", "0.5")
          .attr("x", xScale(d.Date))
          .attr("y", padding2)
          .style("opacity", 0.8)
          .style("stroke-width", "0.5");

        d3.select(".tooltip2")
          .text(
            `Year: ${d.Date.getFullYear()} ${
              this.className.baseVal
            } consumed: ${(() => {
              if (this.className.baseVal == "Renewables") return d.Renewables;
              else if (this.className.baseVal == "Coal") return d.Coal;
              else if (this.className.baseVal == "Oil") return d.Oil;
              else if (this.className.baseVal == "Gas") return d.Gas;
            })(data.d)}`
          )
          .style("visibility", "visible")
          .style("top", event.pageY - 30 + "px")
          .style("left", event.pageX + "px");

        d3.selectAll(`.${this.className.baseVal}`).style("opacity", "0.6");

        d3.select("#chart2svg").selectAll("circle").style("opacity", "0");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0")
          .attr("r", circleBeginRadius);

        d3.select(".tooltip2").style("visibility", "hidden");

        let graph2 = d3.select("#chart2svg");
        graph2.selectAll("path").style("opacity", "0.5");
        graph2.selectAll(".line").style("opacity", "1");
        graph2.selectAll("rect").remove();
      });
    //Initilising and drawing X and Y axes
    xAxis = d3.axisBottom().scale(xScale);

    yAxis = d3.axisLeft().ticks(10).scale(yScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + svgH + ")")
      .call(xAxis);

    d3.select("#chart2svg")
      .append("g")
      .attr("transform", "translate(" + padding2 + ", " + 0 + ")")
      .call(yAxis);
    //END X AND Y AXES =================================================
  }

  function init() {
    if (document.querySelector("#chart2svg"))
      document.querySelector("#chart2svg").remove();
    drawSVG2();
    initialiseDefault2();
    initialiseAll2();
  }
  init();
};

export { chart as default };

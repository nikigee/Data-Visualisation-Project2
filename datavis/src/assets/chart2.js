//init method below contains the code to read the data from the csv file

const chart = () => {
  //'Global' variables
  w2 = 1000;
  h2 = 600;
  padding2 = 50;
  svgHeight2 = h2 + padding2;
  svgWidth2 = w2 + padding2;

  defaultColour = "RGB(101, 143, 111)";
  renewablesColour = "RGB(73, 181, 67)";
  oilColour = "blue";
  gasColour = "RGB(67, 147, 181)";
  coalColour = "red";
  circleColour = "black";
  circleBeginRadius = 4;
  circleEndRadius = 6;
  areaLineColour = "black";
  rectLineColour = "black";

  tooltipTextColour = "white";
  tooltipBGColour = "black";

  //END GLOBALS ==============================================

  function drawSVG2() {
    console.log("drawSVG");

    d3.select("#chart")
      .append("svg")
      .attr("width", svgWidth2)
      .attr("height", svgHeight2);

    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
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
      d3.select("svg").selectAll("*").remove();

      d3.csv("chart2.csv", function (d) {
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
      d3.select("svg").selectAll("*").remove();

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
    console.log("createDefault");

    //Scaling X and Y Axes
    xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.Date), d3.max(data, (d) => d.Date)])
      .range([padding2, w2]);

    yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Renewables)])
      .range([h2, padding2]);
    //END SCALING ==============================================

    //Renewables area chart
    renewables = d3
      .area()
      .x((d) => xScale(d.Date))
      .y0(function () {
        return yScale.range()[0];
      })
      .y1((d) => yScale(d.Renewables));

    svg = d3.select("svg");

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
      .attr("transform", "translate(" + 0 + ", " + h2 + ")")
      .call(xAxis);

    d3.select("svg")
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
    d3.selectAll("circle")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", 6);

        d3.select(".tooltip")
          .text(
            `Year: ${d.Date.getFullYear()}, Renewables consumed: ${
              d.Renewables
            }`
          )
          .style("visibility", "visible")
          .style("top", this.cy.baseVal.value + 100 + "px")
          .style("left", this.cx.baseVal.value + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0")
          .attr("r", 4);

        d3.select(".tooltip").style("visibility", "hidden");
      });
    //END CIRCLES ===================================================
  }
  //END createDefault function ==============================================

  function createAll2(data) {
    console.log("createAll");
    //Adding COAL, OIL, GAS via button
    //Scaling X and Y Axes

    maxRen = d3.max(data, (d) => d.Renewables);
    maxCoal = d3.max(data, (d) => d.Coal);
    maxOil = d3.max(data, (d) => d.Oil);
    maxGas = d3.max(data, (d) => d.Gas);

    xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.Date), d3.max(data, (d) => d.Date)])
      .range([padding2, w2]);

    yScale = d3
      .scaleLinear()
      .domain([0, d3.max([maxRen, maxCoal, maxOil, maxGas])])
      .range([h2, padding2]);

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

    svg = d3.select("svg");

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
    d3.selectAll("circle")
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

        d3.select(".tooltip")
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
          .style("top", this.cy.baseVal.value + 100 + "px")
          .style("left", this.cx.baseVal.value + "px");

        d3.selectAll(`.${this.className.baseVal}`).style("opacity", "0.6");

        d3.selectAll("circle").style("opacity", "0");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0")
          .attr("r", circleBeginRadius);

        d3.select(".tooltip").style("visibility", "hidden");

        d3.selectAll("path").style("opacity", "0.5");
        d3.selectAll(".line").style("opacity", "1");
        d3.selectAll("rect").remove();
      });
    //Initilising and drawing X and Y axes
    xAxis = d3.axisBottom().scale(xScale);

    yAxis = d3.axisLeft().ticks(10).scale(yScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + h2 + ")")
      .call(xAxis);

    d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + padding2 + ", " + 0 + ")")
      .call(yAxis);
    //END X AND Y AXES =================================================
  }

  function init() {
    drawSVG2();
    initialiseDefault2();
    initialiseAll2();
  }
  init();
};

export { chart as default };

const chart = (d3, chartLink) => {
  //init method below contains the code to read the data from the array

  //GLOBALS
  let startDate = 1979;
  let endDate = 2021;

  let margin = { top: 50, right: 50, bottom: 0, left: 50 };
  const width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  let tooltipTextColour1 = "white";
  let tooltipBGColour1 = "black";

  let moving = false;
  let currentValue = 0;
  let targetValue = width;

  var dataset = [];

  // fixing scoping issues
  let d3Dom = {
    svg: "",
    plot: "",
    tooltip1: "",
    stack: "",
    series: "",
    locations: "",
    xScale: "",
    yScale: "",
    rects: "",
    xPosition: "",
    yPosition: "",
    handle: "",
    label: "",
  };
  let timer = 0;
  let x = 0;
  let playButton = "";

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  };

  ////////// slider //////////
  function start() {
    if(document.querySelector("#chart1").querySelector("svg"))
    {
      document.querySelector("#chart1").querySelector("svg").remove();
    }
    d3Dom.svg = d3
      .select("#chart1")
      .append("svg")
      //.attr("width", width + margin.left + margin.right)
      //.attr("height", height + margin.top + margin.bottom);
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500");

    playButton = d3.select("#playButton");

    x = d3
      .scaleLinear()
      .domain([startDate, endDate])
      .range([0, targetValue])
      .clamp(true);

    d3Dom.xScale = d3
      .scaleBand()
      .domain(d3.range(42))
      .rangeRound([0, width])
      .paddingInner(0.05);

    d3Dom.yScale = d3
      .scaleLinear()
      .domain([0, 180])
      .range([height, height / 2]);

    var slider = d3Dom.svg
      .append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + margin.left + "," + height / 5 + ")");

    slider
      .append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
      .select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      })
      .attr("class", "track-inset")
      .select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      })
      .attr("class", "track-overlay")
      .call(
        d3
          .drag()
          .on("start.interrupt", function () {
            slider.interrupt();
          })
          .on("start drag", function (event, d) {
            currentValue = event.x;
            update(x.invert(currentValue));
          })
      );

    slider
      .insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(10))
      .enter()
      .append("text")
      .attr("x", x)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d;
      });

    d3Dom.handle = slider
      .insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

    d3Dom.label = slider
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .text(startDate)
      .attr("transform", "translate(0," + -25 + ")");

    ////////// plot //////////
    d3Dom.plot = d3Dom.svg
      .append("g")
      .attr("class", "plot")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(chartLink, prepare, function (data) {
      dataset.push(data);
      drawPlot(dataset);

      playButton.on("click", function () {
        var button = d3.select(this);
        if (button.text() == "Pause") {
          moving = false;
          clearInterval(timer);
          // timer = 0;
          button.text("Play");
        } else {
          moving = true;
          timer = setInterval(step, 300);
          button.text("Pause");
        }
        console.log("Slider moving: " + moving);
      });
    });
  }

  function prepare(d) {
    d.Year = d.Year;
    d.Non = d.Non;
    d.Renewables = d.Renewables;
    d.Total = d.Total;
    return d;
  }

  function step() {
    update(x.invert(currentValue));
    currentValue = currentValue + targetValue / 41;
    if (currentValue > targetValue) {
      moving = false;
      currentValue = 0;
      clearInterval(timer);
      // timer = 0;
      playButton.text("Play");
      console.log("Slider moving: " + moving);
    }
  }

  function drawPlot(data) {
    d3Dom.tooltip1 = d3Dom.svg
      .append("g")
      .attr("class", "tooltip1")
      .style("display", "none");

    d3Dom.tooltip1
      .append("rect")
      .attr("width", 300)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    d3Dom.tooltip1
      .append("text")
      .attr("x", 150)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    d3Dom.svg.select(".plot").selectAll("g").remove("*");

    d3Dom.stack = d3.stack().keys(["Renewables", "Non"]);

    d3Dom.series = d3Dom.stack(data);

    d3Dom.locations = d3Dom.plot
      .selectAll(".group")
      .data(d3Dom.series)
      .enter()
      .append("g")
      .attr("class", function (d, i) {
        if (i == 0) {
          return "Renewables";
        } else if (i == 1) {
          return "Non-Renewables";
        }
      })
      .style("fill", function (d, i) {
        if (i == 0) {
          return "#42b983";
        } else if (i == 1) {
          return "#bfbfbf";
        }
      });

    //adding rectangle
    d3Dom.rects = d3Dom.locations
      .selectAll(".rect")
      .data((d) => d)
      .join("rect")
      .attr("x", function (d, i) {
        return d3Dom.xScale(i);
      })
      .attr("y", function (d, i) {
        return d3Dom.yScale(d[1]);
      })
      .attr("height", function (d) {
        return d3Dom.yScale(d[0]) - d3Dom.yScale(d[1]);
      })
      .attr("width", d3Dom.xScale.bandwidth())
      .style("opacity", "0.5")
      .transition()
      .duration(800)
      .style("opacity", "1");

    d3.selectAll("rect")
      .on("mouseover", function (event, d) {
        //rasies opacity of current rectangle
        d3.select(this).attr("stroke", "black").attr("stroke-width", "2");

        d3Dom.tooltip1.style("display", null);

        d3Dom.tooltip1.moveToFront();
      })
      .on("mousemove", function (event, d) {
        d3Dom.xPosition = d3.pointer(event)[0] - 15;
        d3Dom.yPosition = d3.pointer(event)[1] - 25;

        d3Dom.tooltip1.attr(
          "transform",
          "translate(" + (d3Dom.xPosition - 100) + ", " + d3Dom.yPosition + ")"
        );
        d3Dom.tooltip1
          .select("text")
          .text(
            `${this.parentNode.className.baseVal} produced: ${
              Math.round(d[1] * 10 - d[0] * 10) / 10
            }, Total produced: ${d.data.Total}`
          );
      })
      .on("mouseout", function () {
        d3.selectAll(".tooltip1").style("display", "none");
        d3.selectAll("rect").attr("stroke", "none");
      });
  }

  function update(hh) {
    // update position and text of label according to slider scale
    d3Dom.handle.attr("cx", x(hh));
    d3Dom.label.attr("x", x(hh)).text(Math.round(hh));

    // filter data set and redraw plot
    var newData = dataset.filter(function (d) {
      return d.Year < hh;
    });
    drawPlot(newData);
  }

  start();
};

export { chart as default };

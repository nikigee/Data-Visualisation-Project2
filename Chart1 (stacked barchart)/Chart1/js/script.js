//init method below contains the code to read the data from the array


//GLOBALS
startDate = 1979;
endDate = 2021;

margin = {top:50, right:50, bottom:0, left:50};
width = 960 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

tooltipTextColour1 = "white";
tooltipBGColour1 = "black";

moving = false;
currentValue = 0;
targetValue = width;


var dataset = [];

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

////////// slider //////////
function start() {
  svg = d3.select("#chart1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  playButton = d3.select("#playButton");

  x = d3.scaleLinear()
      .domain([startDate, endDate])
      .range([0, targetValue])
      .clamp(true);

  xScale = d3
            .scaleBand()
            .domain(d3.range(42))
            .rangeRound([0, width])
            .paddingInner(0.05);

  yScale = d3
            .scaleLinear()
            .domain([0, 329.9])
            .range([height, height/2]);

  slider = svg.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

  slider.append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function(event, d) {
            currentValue = event.x;
            update(x.invert(currentValue));
          })
      );

  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
      .data(x.ticks(10))
      .enter()
      .append("text")
      .attr("x", x)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text(function(d) { return d; });

  handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

  label = slider.append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .text(startDate)
      .attr("transform", "translate(0," + (-25) + ")")


  ////////// plot //////////
  plot = svg.append("g")
      .attr("class", "plot")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("chart1.csv", prepare, function(data) {
    dataset.push(data);
    drawPlot(dataset);

    playButton
      .on("click", function() {
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
    })
  })
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
  currentValue = currentValue + (targetValue/41);
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
  tooltip1 = svg
    .append("g")
    .attr("class", "tooltip1")
    .style("display", "none");

  tooltip1.append("rect")
    .attr("width", 300)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip1.append("text")
    .attr("x", 150)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  svg.select(".plot").selectAll("g").remove("*");

  stack = d3.stack().keys(["Renewables", "Non"]);

  series = stack(data);

  locations = plot
            .selectAll(".group")
            .data(series)
            .enter()
            .append("g")
            .attr("class", function(d, i) {
              if(i == 0) { return "Renewables"; }
              else if(i == 1) { return "Non-Renewables"; }})
            .style("fill", function(d, i) {
                          if(i == 0) { return "green"; }
                          else if(i == 1) { return "grey"; }})

  //adding rectangle
  rects = locations
            .selectAll(".rect")
            .data(d => d)
            .join("rect")
            .attr("x", function(d, i) { return xScale(i); })
            .attr("y", function(d, i) { return yScale(d[1]); })
            .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
            .attr("width", xScale.bandwidth())
            .style("opacity", "0.5")
            .transition()
            .duration(800)
            .style("opacity", "1");

    d3
      .selectAll("rect")
      .on("mouseover", function(event, d) {

          //rasies opacity of current rectangle
          d3
            .select(this)
            .attr("stroke", "black")
            .attr("stroke-width", "2");

          tooltip1
              .style("display", null)

          tooltip1.moveToFront();
          })
      .on("mousemove", function(event, d) {
        xPosition = d3.pointer(event)[0]-15;
        yPosition = d3.pointer(event)[1]-25;

        tooltip1.attr("transform", "translate(" + (xPosition - 100) + ", " + yPosition + ")");
        tooltip1.select("text").text(`${this.parentNode.className.baseVal} produced: ${Math.round(d[1]*10 - d[0]*10) / 10}, Total produced: ${d.data.Total}`)
      })
      .on("mouseout", function() {
          d3.selectAll(".tooltip1").style("display", "none");
          d3.selectAll("rect").attr("stroke", "none")
        })
}

function update(hh) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(hh));
  label
    .attr("x", x(hh))
    .text(Math.round(hh));

  // filter data set and redraw plot
  var newData = dataset.filter(function(d) {
    return d.Year < hh;
  })
  drawPlot(newData);
}

function init() {
  start();
}

window.onload = init;

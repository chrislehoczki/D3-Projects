
$.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data) {

  var dataGDP = data.data;

  
  //SORT DATES FUNCTION
  
  var minDate = getDate(dataGDP[0][0]),
      maxDate = getDate(dataGDP[dataGDP.length - 1][0]);
  
  //DEFINE SIZING
var margin = {top: 50, right: 50, bottom: 70, left: 70};
var width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  
  
  //DEFINE SCALES
var y = d3.scale.linear().domain([0, 18000])
    .range([height, 0])

  var x = d3.time.scale().domain([minDate, maxDate]).range([0, width]);
  
  
  // DEFINE AXES
  var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("s"));
  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20);
  
  
  //GENERATE SVG AND APPEND
  var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  //DEFINE DIV FOR TOOLTIP
  
  var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
  
  
  //DEFINE BARS
  var bars = svg.selectAll("rect")
    .data(dataGDP)
    .enter()
    .append("rect")
  
  //SET BARS ATTR
  bars.attr("width", width / dataGDP.length)
      .attr("x", function (d, i) { 
    return i* (width /dataGDP.length);
                              })
      bars.attr("y", function(d, i) {
      return y(d[1]); 
  }) 
      .attr("height", function(d,i) {
      return height - y(d[1]);
  })
      .attr("class", "bar").attr("fill", "lightgray")

       bars.transition()
      .duration(3000) // this is 1s
      .delay(10)
       .attr("fill", "blue")
      
      bars.on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9)
        div .html("Date: " + convertMonth(getDate(d[0])) + " " + getDate(d[0]).getFullYear() + "<br> GDP: " +  d[1])  
            .style("left", (d3.event.pageX + 10) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
  })


  //ADD AXES
 svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (0) + ",0)")
        .call(yAxis)
        .classed("axis", true)

  svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (0) + "," + height + ")")
        .call(xAxis)
        .classed("axis", true)
  
  addLabels(height, margin, width, svg);
 
  makeFooter()

  
   
}); //END OF AJAX CALL




function getDate(date) {
  return new Date(date)
}




function addLabels(height, margin, width, svg, data) {
  //ADD Y LABEL
   var yLabel = svg.append("text")
     .attr("x", 0 - height/2)
     .attr("y", 0 - margin.left/1.5)
      .style("text-anchor", "middle")
      .text("GDP in Billions of Dollars")
      .attr('transform', 'rotate(-90)')
      .classed("label", true)
   //ADD X LABEL
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", height + margin.bottom/1.3)
      .style("text-anchor", "middle")
      .text("Date")
      .classed("label", true)
    //ADD TITLE
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", margin.top)
      .style("text-anchor", "middle")
      .text("USA GDP Over Time")
      .classed("title", true)
    //ADD SUB TITLE
        svg.append("text")
     .attr("x", width / 2)
     .attr("y", margin.top + 50)
      .style("text-anchor", "middle")
      .text("Built with D3.js")
      .classed("sub-title", true) 
}

function convertMonth(date) {
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
return month[date.getMonth()];

}

function makeFooter() {
  var html = "<footer><ul>";
  html += "<ul>"
  html += "<li><a target='_blank' href='http://blog.cphillips.co.uk'> Blog </a> </li>"
  html += "<li><a target='_blank' href='http://cphillips.co.uk'> Portfolio </a> </li>"
  $("body").append(html)
}
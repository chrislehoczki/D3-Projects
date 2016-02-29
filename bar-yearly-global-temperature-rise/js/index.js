//BUILD GRAPH WITH DATA ATTACHED BUT NO COLOURING
$.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(data) { 

  createChart(data);

});

function createChart(data) {
  
  var base = data.baseTemperature;

  data = data.monthlyVariance;
    //DEFINE SIZING
var margin = {top: 200, right: 50, bottom: 100, left: 70};
var width = 1000 - margin.left - margin.right,
    height = 800- margin.top - margin.bottom;


  var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  //APPEND TOOLTIP 
   var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)
   
  //GET MIN AND MAX VALUES AND CONFIGS
   var maxYear = d3.max(data, function(d) { return d.year});
  console.log(maxYear)
  var minYear = d3.min(data, function (d) { return d.year})
  
  var maxTemp = d3.max(data, function(d) { return d.variance + base})
  var minTemp = d3.min(data, function(d) { return d.variance + base})
  var minDate = new Date(2016, 0, 1)
  var maxDate = new Date(2016, 11, 31)
  var xLength = maxYear - minYear;
  var yLength = 12;
  
  //SCALES
     var x = d3.scale.linear().domain([minYear, maxYear]).range([0, width])

     var y = d3.time.scale().domain([maxDate, minDate]).range([0, height])
     //TEMP SCALE FOR GRADIENT - not used now
    //var tempScale = d3.scale.linear().domain([9.5, minTemp]).range([0, 255])

    //COLOR SCALE TEST
  
  var colors = [];
  var colorNumber = 11;
  
  for (var i = colorNumber; i > 0; i--) {
    var redIndex = (255/colorNumber) * i;
    var color = "rgb(255," +  Math.round(redIndex) + "," + 30 + ")"
    colors.push(color)
  }


  //CREATE COLOR SCALE
      var colorScale = d3.scale.quantile()
    .domain([minTemp, 10]) //CHANGED TO 10 to avoid anomalous data
    .range(colors);
   
   
   
   //DEFINE BARS
  var bars = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
  
  bars.attr("width", 0)
      .attr("height", height/yLength)
      .attr("x", 0)
      .attr("y", function(d, i) {
    var date = new Date(2016, d.month ,1)
    return y(date) ;
  })
      .attr("fill", "rgb(255,0, 0)")
      
  
  bars.transition().duration(5000)
      .attr("width", width/ xLength)
      .attr("height", height/yLength)
      .attr("x", function(d, i) {
    return x(d.year);
  })
      .attr("y", function(d, i) {
    var date = new Date(2016, d.month ,1)
    return y(date) ;
  })
      .attr("fill", function(d, i) {
    
    var temp = base + d.variance;
    return colorScale(temp)
  })
  
   bars.on("mouseover", function (d) {
     console.log(d)
     tooltip.transition()
        .duration(200)
        .style("opacity", 0.8)
     tooltip.html("Year: " + d.year + "<br>Month: " + d.month + "<br>Temp: " + (base + d.variance).toFixed(2))
        .style("left", (d3.event.pageX + 10) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
   }) 
   
   bars.on("mouseout", function(d) {
     tooltip.transition()
        .duration(200)
        .style("opacity", 0)
   })
  
  //AXES
    var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.time.format("%b"));
  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(15).tickFormat(d3.format("d"));
  
  //ADD AXES
 svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (0) + "," + (0) + ")")
        .call(yAxis)
        .classed("axis", true)
        .call(adjustTextLabels);
  
  //MOVE LABELS UP
  function adjustTextLabels() {
    svg.selectAll('.axis text')
        .attr('transform', 'translate(' + 0 + ',' + -height/12/2 + ')');
  }

  svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (0) + "," + height + ")")
        .call(xAxis)
        .classed("axis", true);

  var legendElementWidth = 35;
  
  var legend = svg.selectAll(".legend")
    .data([0].concat(colorScale.quantiles()), function(d) {
      return d;
    });

  legend.enter().append("g")
    .attr("class", "legend");

  legend.append("rect")
    .attr("x", function(d, i) {
      return legendElementWidth * i + (width - legendElementWidth * colorNumber);
    })
    .attr("y", height + 50)
    .attr("width", legendElementWidth)
    .attr("height", margin.bottom / 3)
    .style("fill", function(d, i) {
      return colors[i];
    });

  legend.append("text")
    .attr("class", "scales")
    .text(function(d) {
      return d.toFixed(1);
    })
    .attr("x", function(d, i) {
      return ((legendElementWidth * i) + Math.floor(legendElementWidth / 2) - (i*1) + (width - legendElementWidth * colorNumber));
    })
    .attr("y", height + margin.bottom/2 + legendElementWidth/2 +5 );
  
  svg.append("text")
    .attr("class", "key")
    .text("")
    .attr("x", function(d, i) {
      return legendElementWidth * i + (width - (legendElementWidth * colorNumber/2))
    })
    .attr("y", height + margin.bottom/2-5 )
    .attr("text-anchor", "middle");

$(".key").empty().append("Legend ( &deg; C )")
  
 addLabels(height, margin, width, svg, data)
  makeFooter()
  }//END OF FUN

function getDate(date) {
  return new Date(date)
}

function convertMonth(month) {
var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
return months[month - 1]
}


function addLabels(height, margin, width, svg, data) {
  //ADD Y LABEL
   var yLabel = svg.append("text")
     .attr("x", 0 - height/2)
     .attr("y", 0 - margin.left/1.5)
      .style("text-anchor", "middle")
      .text("Month")
      .attr('transform', 'rotate(-90)')
      .classed("label", true)
   //ADD X LABEL
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", height + margin.bottom/1.3)
      .style("text-anchor", "middle")
      .text("Year")
      .classed("label", true)
    //ADD TITLE
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", 0 - margin.top/2)
      .style("text-anchor", "middle")
      .text("Yearly Global Temperature Rise")
      .classed("title", true)
    //ADD SUB TITLE
        svg.append("text")
     .attr("x", width / 2)
     .attr("y", 0 - margin.top/2 + 50)
      .style("text-anchor", "middle")
      .text("Built with D3.js")
      .classed("sub-title", true) 
        
        
        
        
        //ADD KEY
        /* SAVE THIS FOR LATER --EXAMPLE OF GRADIENT FILL
   			var legend = svg.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "0%").attr("y1", "100%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

			legend.append("stop").attr("offset", "0%").attr("stop-color", "rgb(255,255,0)").attr("stop-opacity", 1);

			legend.append("stop").attr("offset", "100%").attr("stop-color", "rgb(255, 0, 0)").attr("stop-opacity", 1);

			svg.append("rect").attr("width", 150).attr("height", 20).style("fill", "url(#gradient)").attr("transform", "translate(" + width*0.75 +  "," + (height + margin.bottom/2 + 5) + ")");

        
      
        
        
        svg.append("text")
     .attr("x", width * 0.75 + 155)
     .attr("y", height + margin.bottom/2 + 22)
      .style("text-anchor", "left")
      .text("Bloody Hot")
        
        svg.append("text")
     .attr("x", width * 0.75 - 75)
     .attr("y", height + margin.bottom/2 + 22)
      .style("text-anchor", "left")
      .text("Not So Hot")
              */

}

function makeFooter() {
  var html = "<footer><ul>";
  html += "<ul>"
  html += "<li><a target='_blank' href='http://blog.cphillips.co.uk'> Blog </a> </li>"
  html += "<li><a target='_blank' href='http://cphillips.co.uk'> Portfolio </a> </li>"
  $("body").append(html)
}
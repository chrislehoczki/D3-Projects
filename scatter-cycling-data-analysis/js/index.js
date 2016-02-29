
$.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(data) {

  console.log(data)
  
  //DEFINE SIZING
 var margin = {top: 150, right: 80, bottom: 50, left: 70};
var width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
  
  var max = d3.max(data, function(d) { return d.Seconds});
  var min = d3.min(data, function (d) { return d.Seconds})

  //DEFINE SCALE 
   var x = d3.scale.linear().domain([max-min + 10, 0]).range([0, width]);
  
 var y = d3.scale.linear().domain([1, 36]).range([0, height])
 
 //DEFINE AXES
 
 var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20)
 var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10)
  
 //APPEND DIV FOR PLACEHOLDER
 
 var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)
 

 //CREATE SVG
  var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
   var circle =  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
   
   var name = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")

      name.attr("x", 0).attr("y", 0)
   name.transition()
    .duration(2000).attr("x", function(d) {
			   		return x(d.Seconds - max + 180) + 10;
			   })
          .attr("y", function(d, i) {
			   		return (i) * (height / data.length) + 5
			   })
          .text(function (d) { return d.Name})
          .attr("font-size", 11)
   
   
   circle.attr("cx", 0).attr("cy", 0).attr("r", 1)
   
   circle.transition()
    .duration(2000)
   
   .attr("cx", function(d, i) {
			   		return x(d.Seconds - max + 180) ;
			   })
			   .attr("cy", function(d, i) {
			   		return (i) * (height / data.length)
			   })
			   .attr("r", 6)
         .attr("class", function(d) { return d.Name})
         .attr("fill", function(d) { 
        if (d.Doping === "") {
          return "#413A74";
        }
        else { return "#EA4335"; }
   });
   
   //TOOLTIP 
   
   circle.on("mouseover", function (d) {
     if (d.Doping === "") {
       d.Doping = "No doping allegations"
     }
     
     tooltip.transition()
        .duration(200)
        .style("opacity", 0.8)
     tooltip.html("Name: " + d.Name + "<br>Nationality: " + d.Nationality + "<br>Place: " + d.Place + "<br> Time: " + d.Time + "<br>" + d.Doping)
        .style("left", (d3.event.pageX + 10) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
   }) 
   
   circle.on("mouseout", function(d) {
     tooltip.transition()
        .duration(200)
        .style("opacity", 0)
   })
   
  svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (0) + "," + height + ")")
        .call(xAxis)
        .classed("axis", true)
  
  svg.append("g")
        .attr("class", "axis")
        .call(yAxis)
        .classed("axis", true)
  
  addLabels(height, margin, width, svg);
 
  makeFooter()

  
   
}); //END OF AJAX CALL









function addLabels(height, margin, width, svg, data) {
  //ADD Y LABEL
   var yLabel = svg.append("text")
     .attr("x", 0 - height/2)
     .attr("y", 0 - margin.left/1.5)
      .style("text-anchor", "middle")
      .text("Ranking")
      .attr('transform', 'rotate(-90)')
      .classed("label", true)
   //ADD X LABEL
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", height + margin.bottom/1.3)
      .style("text-anchor", "middle")
      .text("Seconds Behind Leader")
      .classed("label", true)
    //ADD TITLE
    svg.append("text")
     .attr("x", width / 2)
     .attr("y", 0 - margin.top/2)
      .style("text-anchor", "middle")
      .text("Doping Analysis on Alpe d'Huez Times")
      .classed("title", true)
    //ADD SUB TITLE
        svg.append("text")
     .attr("x", width / 2)
     .attr("y", 0 - margin.top/2 + 50)
      .style("text-anchor", "middle")
      .text("Built with D3.js")
      .classed("sub-title", true) 
        
       svg.append("text")
     .attr("x", width / 2 + 200)
     .attr("y", height/2 )
      .style("text-anchor", "left")
      .text("Allegations Made")
       
        svg.append("circle")
     .attr("cx", width / 2 + 190)
     .attr("cy", height/2 - 6)
      .attr("r", 6)
      .style("text-anchor", "middle")
      .attr("fill", "#EA4335")
        
        svg.append("text")
     .attr("x", width / 2 + 200)
     .attr("y", height/2 + 20 )
      .style("text-anchor", "left")
      .text("Considered Clean?")
       
        svg.append("circle")
     .attr("cx", width / 2 + 190)
     .attr("cy", height/2 - 6 + 20)
      .attr("r", 6)
      .style("text-anchor", "middle")
      .attr("fill", "#413A74") 
}



function makeFooter() {
  var html = "<footer><ul>";
  html += "<ul>"
  html += "<li><a target='_blank' href='http://blog.cphillips.co.uk'> Blog </a> </li>"
  html += "<li><a target='_blank' href='http://cphillips.co.uk'> Portfolio </a> </li>"
  $("body").append(html)
}
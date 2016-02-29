var width = 960,
    height = 500;


//ADD SVG
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


//ADD TOOLTIP
 var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)

//ADD PROJECTION - center and scale
var projection = d3.geo.mercator()
    .center([0, 0]) //LON (left t0 right) + LAT (up and down)
    .scale(150) //DEFAULT Is 150
    .rotate([0,0, 0]); //longitude, latitude and roll - if roll not specified - uses 0 - rotates the globe

//PATH GENERATOR USING PROJECTION
var path = d3.geo.path()
    .projection(projection);

//G AS APPENDED SVG
var g = svg.append("g");

// load and display the World
d3.json('https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-110m.json', function(json) {
  g.selectAll('path') //act on all path elements
    .data(topojson.feature(json, json.objects.countries).features) //get data
    .enter() //add to dom
    .append('path')
    .attr('fill', '#95E1D3')
    .attr('stroke', '#266D98')
    .attr('d', path)



    drawData()




});


//ZOOM 
if (window.matchMedia("(min-width: 600px)").matches) { 

// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
  });

svg.call(zoom)

}



function drawData () {
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(error, data) {
	console.log(data)
	var data = data.features;


	 var max = d3.max(data, function(d) { return d.properties.mass});
  	 var min = d3.min(data, function (d) { return d.properties.mass})


  	console.log(max)
  	console.log(min)
 	var radiusScale = d3.scale.linear().domain([min, 10000]).range([1, 5])
 	console.log(radiusScale(1000000000000))

		
       var circle =  g.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
      		.attr('cx', function(d) { return projection([d.properties.reclong,d.properties.reclat])[0] })
      		.attr('cy', function(d) { return projection([d.properties.reclong,d.properties.reclat])[1] })
           .attr("r", function(d) {
           	var returnValue;
           	d.properties.mass < 10000 ? returnValue = 1  :
           	d.properties.mass < 100000 ? returnValue = 3  :
           	d.properties.mass > 100000 ? returnValue = 5  : returnValue = 7
           	return returnValue
           })
           .style("fill", function(d) {

           	var returnValue;
           	d.properties.mass < 10000 ? returnValue = "yellow"  :
           	d.properties.mass < 100000 ? returnValue = "orange"  :
           	d.properties.mass > 100000 ? returnValue = "#c12c2c"  : returnValue = "red"

           	return returnValue

           })
           .style("opacity", "0.5");

circle.on("mouseover", function (d) {

	//GET YEAR

   	var year = d.properties.year;
   	var data = new Date (d.properties.year)
   	year = data.getFullYear()


   	d3.select(this).attr("r", function(d) {

   		var returnValue;
           	d.properties.mass < 10000 ? returnValue = 2  :
           	d.properties.mass < 100000 ? returnValue = 4  :
           	d.properties.mass > 100000 ? returnValue = 6  : returnValue = 8
           	return returnValue

   	})

    tooltip.transition()
        .duration(200)
        .style("opacity", 0.8)
    tooltip.html("Name: " + d.properties.name + "<br>ID: " + d.properties.id + "<br>Mass: " + d.properties.mass + "<br> Year: " + year)
        .style("left", (d3.event.pageX + 10) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
   }) 
   
circle.on("mouseout", function(d) {

	d3.select(this).attr("r", function(d) {
           	var returnValue;
           	d.properties.mass < 10000 ? returnValue = 1  :
           	d.properties.mass < 100000 ? returnValue = 3  :
           	d.properties.mass > 100000 ? returnValue = 5  : returnValue = 7
           	return returnValue
           })
           .style("fill", function(d) {

           	var returnValue;
           	d.properties.mass < 10000 ? returnValue = "yellow"  :
           	d.properties.mass < 100000 ? returnValue = "orange"  :
           	d.properties.mass > 100000 ? returnValue = "#c12c2c"  : returnValue = "red"

           	return returnValue

           })
           .style("opacity", "0.5");

     tooltip.transition()
        .duration(200)
        .style("opacity", 0)
   })

   

});


}
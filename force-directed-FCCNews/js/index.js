var links = [
  {source: "Author Example", target: "quora", type: "licensing"},
  {source: "Second Author", target: "quora", type: "licensing"},
  {source: "Second Author", target: "apple", type: "suit"},
  {source: "Second Author", target: "blah", type: "suit"},
  {source: "Author Example", target: "blah", type: "resolved"},
];

//GET OUT LINKS FIRST - OUR NODES ARE DEFINED IN THE LINKS

var url = "http://www.freecodecamp.com/news/hot"
$.getJSON(url, function(data) {
    console.log(data)
    var newLinks = [];

    data.forEach(function(link) {
        var linkObj = {};
        linkObj.source = link.author.username;
        linkObj.target = extractDomain(link.link);
        linkObj.upVotes = link.upVotes.length;
        linkObj.authorImg = link.author.picture
        newLinks.push(linkObj)
    })

    links = newLinks
    console.log(links)
    createGraph(data)

})

function createGraph(data) {
var nodes = {};


    // Compute the distinct nodes from the links.#

//if an object doesnt exist in nodes - create one with the name of the link source or target;
//MEANS ONLY EVER HAVE ONE NODE FROM LINKS
links.forEach(function(link) {
  //CREATE AUTHOR NODES
  link.source = nodes[link.source] || (nodes[link.source] /* Names the object */  = {name: link.source, authorImg: link.authorImg, class: "author"} /* adds a property called name */);
  //CREATE ARTICLE NODES
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, upVotes: link.upVotes, class: "link" });
});

console.log(nodes)

//SET PROPERTIES OF SVG

var width = 800,
    height = 650;

//MIN AND MAX VOTES
var maxVotes = d3.max(links, function(d) { return d.upVotes})
var minVotes = d3.min(links, function(d) {return d.upVotes})

//SIZE SCALE
var nodeScale = d3.scale.linear().domain([minVotes, maxVotes]).range([10, 40])


//COLOR SCALE

var colors = [];
  var colorNumber = 11;
  
  for (var i = colorNumber; i > 0; i--) {
    var redIndex = (255/colorNumber) * i;
    var color = "rgb(255," +  Math.round(redIndex) + "," + 100 + ")"
    colors.push(color)
  }


  //CREATE COLOR SCALE
var colorScale = d3.scale.quantile()
    .domain([minVotes, 20]) //CHANGED TO 10 to avoid anomalous data
    .range(colors);


    var force = d3.layout.force()
    .nodes(d3.values(nodes)) //CREATES AN ARRAY FROM OUR OBJECT
    .links(links) 
    .size([width, height])
    .gravity(0.22)
    .linkDistance(70)
    .charge(function(d) {
      return -((d.weight * 3) + 200);
    })
    .on("tick", tick) //RUNS LAYOUT ONE STEP
    .start(); //STARTS SIMULATION - NEEDS TO BE RUN WHEN LAYOUT FIRST CREATED

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)

var link = svg.selectAll(".link")
    .data(force.links()) 
    .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .on("mouseover",  mouseover)
    .on("mouseout", mouseout)
    .call(force.drag); //MAKES IT DRAGGABLE





//FOR USERS
node.append("image")
	.attr('xlink:href', function(d) {
		var value = d.class === "author" ? d.authorImg : null
		return value
			})
		.attr('class', 'profile-pic')
  		.attr('height', function(d) {
  			return (d.weight * 1.6) + 15
  		})
  		.attr('width', function(d) {
  			return (d.weight * 1.6) + 15
  		})
  		.style("border-radius", "100%")
  		
  		.attr('x', function(d) {
  			return -((d.weight * 1.6) + 15) / 2
  		})
  		.attr('y', function(d) {
  			return -((d.weight * 1.6) + 15) / 2
  		})


node.append("circle")
    .attr("r", function(d) {
    	var value = d.class === "author" ? (d.weight * 1.6) + 12 : (d.weight * 1.6) + 8
		return value
    })
    .style("fill", function(d) {
    	var value = d.class === "link" ? colorScale(d.upVotes) : "black"
		return value
    })
    .style("opacity", function(d) {
    	var value = d.class === "author" ? 0.1 : 1
		return value
    })



//REMOVE THIS LATER
node.append("text")
    .attr("x", 0)
    .attr("dy", 0)
    .text(function(d) { 
    	//var value = d.class === "link" ? d.name : null
		//return value
    	
    });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });



  

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("fill", "black")
}


function mouseover(d) {
	

      //APPEND TOOLTIP
    	
    	//if (d.class === "author") {

    	tooltip.transition()
	        .duration(200)
	        .style("opacity", 0.7)
     	tooltip.html(d.name)
	        .style("left", (d3.event.pageX + 10) + "px")     
	        .style("top", (d3.event.pageY - 28) + "px");   

    	//}




}

function mouseout(d) {
	//RETURN TO ORIGINAL SIZE

      	//REMOVE TOOLTIP
	tooltip.transition()
        .duration(200)
        .style("opacity", 0)

}


}


   








function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
  
    return domain;
}